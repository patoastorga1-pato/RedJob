import {
  getBearerToken,
  getEnv,
  getOwnedCompany,
  getStripe,
  jsonResponse,
  mapSubscriptionStatus,
  planConfig,
  timestampToIso,
  updateCompanyBilling
} from "./_shared/billing.mts";

function getPlanFromSubscription(subscription) {
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
  return "free";
}

function chooseRelevantSubscription(subscriptions) {
  return (
    subscriptions.find((subscription) => ["active", "trialing", "past_due", "unpaid", "incomplete"].includes(subscription.status)) ??
    subscriptions.find((subscription) => subscription.status !== "canceled") ??
    subscriptions[0] ??
    null
  );
}

async function getSubscriptionFromCheckoutSession(stripe, checkoutSessionId) {
  if (!checkoutSessionId) return null;
  const session = await stripe.checkout.sessions.retrieve(checkoutSessionId, {
    expand: ["subscription", "subscription.items.data.price"]
  });

  const subscription = session.subscription;
  const hydratedSubscription =
    typeof subscription === "string"
      ? await stripe.subscriptions.retrieve(subscription, { expand: ["items.data.price"] })
      : subscription;

  return { session, subscription: hydratedSubscription };
}

async function syncCompanySubscription(company, subscription) {
  if (!subscription) return { company, synced: false, message: "No se encontró suscripción en Stripe." };

  const status = mapSubscriptionStatus(subscription.status);
  const plan = status === "canceled" ? "free" : getPlanFromSubscription(subscription);
  const body = {
    plan,
    plan_status: status,
    billing_provider: "stripe",
    billing_customer_id: typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id,
    billing_subscription_id: status === "canceled" ? null : subscription.id,
    plan_started_at: timestampToIso(subscription.start_date),
    plan_expires_at: status === "canceled" ? new Date().toISOString() : timestampToIso(subscription.current_period_end)
  };

  const updatedCompany = await updateCompanyBilling(company.id, body);
  return { company: updatedCompany, synced: true, plan, status };
}

export default async (req) => {
  if (req.method !== "POST") return jsonResponse({ error: "Metodo no permitido." }, 405);

  try {
    const accessToken = getBearerToken(req);
    const { companyId, checkoutSessionId, sessionId } = await req.json();
    const stripe = getStripe();
    const checkoutId = checkoutSessionId || sessionId;

    let company = companyId ? await getOwnedCompany(companyId, accessToken) : null;

    if (checkoutId) {
      const result = await getSubscriptionFromCheckoutSession(stripe, checkoutId);
      const sessionCompanyId = result?.session?.metadata?.redjob_company_id || result?.session?.client_reference_id;
      if (!company && sessionCompanyId) company = await getOwnedCompany(sessionCompanyId, accessToken);
      if (!company) throw new Error("No se encontró la empresa asociada al pago.");
      if (sessionCompanyId && company.id !== sessionCompanyId) throw new Error("El pago no corresponde a esta empresa.");
      return jsonResponse(await syncCompanySubscription(company, result?.subscription));
    }

    if (!company) throw new Error("Selecciona una empresa.");

    if (!company.billing_customer_id) {
      return jsonResponse({ company, synced: false, message: "La empresa aún no tiene cliente de Stripe." });
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: company.billing_customer_id,
      status: "all",
      limit: 10,
      expand: ["data.items.data.price"]
    });

    const subscription = chooseRelevantSubscription(subscriptions.data);
    if (!subscription) {
      return jsonResponse({ company, synced: false, message: "No se encontró suscripción en Stripe." });
    }

    return jsonResponse(await syncCompanySubscription(company, subscription));
  } catch (error) {
    return jsonResponse({ error: error.message || "No se pudo sincronizar la suscripción." }, 400);
  }
};

export const config = {
  path: "/api/billing/sync",
  method: ["POST"]
};
