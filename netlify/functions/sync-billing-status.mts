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

export default async (req) => {
  if (req.method !== "POST") return jsonResponse({ error: "Metodo no permitido." }, 405);

  try {
    const accessToken = getBearerToken(req);
    const { companyId } = await req.json();
    const company = await getOwnedCompany(companyId, accessToken);

    if (!company.billing_customer_id) {
      return jsonResponse({ company, synced: false, message: "La empresa aun no tiene cliente de Stripe." });
    }

    const stripe = getStripe();
    const subscriptions = await stripe.subscriptions.list({
      customer: company.billing_customer_id,
      status: "all",
      limit: 10,
      expand: ["data.items.data.price"]
    });

    const subscription = chooseRelevantSubscription(subscriptions.data);
    if (!subscription) {
      return jsonResponse({ company, synced: false, message: "No se encontro suscripcion en Stripe." });
    }

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
    return jsonResponse({ company: updatedCompany, synced: true, plan, status });
  } catch (error) {
    return jsonResponse({ error: error.message || "No se pudo sincronizar la suscripcion." }, 400);
  }
};

export const config = {
  path: "/api/billing/sync",
  method: ["POST"]
};
