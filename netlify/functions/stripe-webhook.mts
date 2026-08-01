import {
  getEnv,
  getStripe,
  jsonResponse,
  mapSubscriptionStatus,
  planConfig,
  supabaseRequest,
  timestampToIso,
  updateCompanyBilling
} from "./_shared/billing.mts";

async function recordEvent(event, status, companyId = null, extraPayload = {}) {
  const object = event.data?.object ?? {};
  await supabaseRequest("/billing_events?on_conflict=provider,provider_event_id", {
    method: "POST",
    service: true,
    prefer: "resolution=merge-duplicates",
    body: {
      company_id: companyId,
      provider: "stripe",
      provider_event_id: event.id,
      event_type: event.type,
      status,
      payload: {
        stripe_object_id: object.id,
        stripe_object_type: object.object,
        customer_id: typeof object.customer === "string" ? object.customer : object.customer?.id,
        subscription_id: typeof object.subscription === "string" ? object.subscription : object.subscription?.id,
        client_reference_id: object.client_reference_id,
        redjob_company_id: object.metadata?.redjob_company_id,
        redjob_plan: object.metadata?.redjob_plan,
        ...extraPayload
      },
      processed_at: new Date().toISOString()
    }
  });
}

async function findCompanyBySubscriptionOrCustomer(subscription, fallbackCompanyId = null) {
  const metadataCompanyId = subscription.metadata?.redjob_company_id;
  if (metadataCompanyId) return metadataCompanyId;
  if (fallbackCompanyId) return fallbackCompanyId;

  if (subscription.id) {
    const rows = await supabaseRequest(
      `/company_profiles?select=id&billing_subscription_id=eq.${encodeURIComponent(subscription.id)}&limit=1`,
      { service: true }
    );
    if (rows?.[0]?.id) return rows[0].id;
  }

  const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id;
  if (customerId) {
    const rows = await supabaseRequest(
      `/company_profiles?select=id&billing_customer_id=eq.${encodeURIComponent(customerId)}&limit=1`,
      { service: true }
    );
    if (rows?.[0]?.id) return rows[0].id;
  }

  return null;
}

function getPlanFromSubscription(subscription, fallbackPlan = null) {
  const activePriceId = subscription.items?.data?.[0]?.price?.id;
  if (activePriceId) {
    const matchedPlan = Object.entries(planConfig).find(([, config]) => {
      const configuredPriceId = getEnv(config.priceEnv, config.fallbackPriceId);
      return configuredPriceId === activePriceId;
    })?.[0];
    if (matchedPlan) return matchedPlan;
  }

  const metadataPlan = subscription.metadata?.redjob_plan;
  if (metadataPlan === "pro" || metadataPlan === "premium") return metadataPlan;
  if (fallbackPlan === "pro" || fallbackPlan === "premium") return fallbackPlan;
  return "free";
}

async function syncSubscription(subscription, fallback = {}) {
  const companyId = await findCompanyBySubscriptionOrCustomer(subscription, fallback.companyId);
  if (!companyId) {
    throw new Error(`No se encontró empresa para la suscripción ${subscription.id || "sin id"}.`);
  }

  const status = mapSubscriptionStatus(subscription.status);
  const plan = status === "canceled" ? "free" : getPlanFromSubscription(subscription, fallback.plan);
  const body = {
    plan,
    plan_status: status,
    billing_provider: "stripe",
    billing_customer_id: typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id,
    billing_subscription_id: subscription.id,
    plan_started_at: timestampToIso(subscription.start_date),
    plan_expires_at: timestampToIso(subscription.current_period_end)
  };

  if (status === "canceled") {
    body.billing_subscription_id = null;
    body.plan_expires_at = new Date().toISOString();
  }

  await updateCompanyBilling(companyId, body);
  return companyId;
}

async function handleCheckoutCompleted(session, stripe) {
  if (!session.subscription) return session.metadata?.redjob_company_id ?? null;
  const subscription = await stripe.subscriptions.retrieve(session.subscription, {
    expand: ["items.data.price"]
  });
  return syncSubscription(subscription, {
    companyId: session.metadata?.redjob_company_id || session.client_reference_id,
    plan: session.metadata?.redjob_plan
  });
}

export default async (req) => {
  if (req.method !== "POST") return jsonResponse({ error: "Metodo no permitido." }, 405);

  const webhookSecret = getEnv("STRIPE_WEBHOOK_SECRET");
  if (!webhookSecret) return jsonResponse({ error: "Falta STRIPE_WEBHOOK_SECRET." }, 500);

  const stripe = getStripe();
  const signature = req.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, webhookSecret);
  } catch (error) {
    return jsonResponse({ error: `Webhook invalido: ${error.message}` }, 400);
  }

  try {
    let companyId = null;
    if (event.type === "checkout.session.completed") {
      companyId = await handleCheckoutCompleted(event.data.object, stripe);
    } else if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      companyId = await syncSubscription(event.data.object);
    } else {
      await recordEvent(event, "ignored");
      return jsonResponse({ received: true, ignored: true });
    }

    await recordEvent(event, "processed", companyId);
    return jsonResponse({ received: true });
  } catch (error) {
    await recordEvent(event, "failed", null, { error: error.message }).catch(() => {});
    return jsonResponse({ error: error.message || "No se pudo procesar el webhook." }, 500);
  }
};

export const config = {
  path: "/api/billing/stripe-webhook",
  method: ["POST"]
};
