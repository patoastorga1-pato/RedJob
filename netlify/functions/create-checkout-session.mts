import {
  getBearerToken,
  getEnv,
  getOwnedCompany,
  getSiteUrl,
  getStripe,
  jsonResponse,
  planConfig,
  supabaseRequest,
  updateCompanyBilling
} from "./_shared/billing.mts";

export default async (req) => {
  if (req.method !== "POST") return jsonResponse({ error: "Metodo no permitido." }, 405);

  try {
    const { plan, companyId, email } = await req.json();
    const selectedPlan = planConfig[plan];
    if (!selectedPlan) return jsonResponse({ error: "Plan no disponible." }, 400);

    const accessToken = getBearerToken(req);
    const company = await getOwnedCompany(companyId, accessToken);
    const stripe = getStripe();
    const siteUrl = getSiteUrl(req);
    const priceId = getEnv(selectedPlan.priceEnv, selectedPlan.fallbackPriceId);

    let customerId = company.billing_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: email || undefined,
        name: company.company_name,
        metadata: {
          redjob_company_id: company.id,
          redjob_user_id: company.user_id
        }
      });
      customerId = customer.id;
      await updateCompanyBilling(company.id, {
        billing_provider: "stripe",
        billing_customer_id: customerId
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${siteUrl}/?checkout=success#empresas`,
      cancel_url: `${siteUrl}/?checkout=cancel#empresas`,
      client_reference_id: company.id,
      metadata: {
        redjob_company_id: company.id,
        redjob_user_id: company.user_id,
        redjob_plan: plan
      },
      subscription_data: {
        metadata: {
          redjob_company_id: company.id,
          redjob_user_id: company.user_id,
          redjob_plan: plan
        }
      }
    });

    await supabaseRequest("/billing_events?on_conflict=provider,provider_event_id", {
      method: "POST",
      service: true,
      prefer: "resolution=merge-duplicates",
      body: {
        company_id: company.id,
        provider: "stripe",
        provider_event_id: session.id,
        event_type: "checkout.session.created",
        status: "processed",
        payload: { plan, session_id: session.id, customer_id: customerId },
        processed_at: new Date().toISOString()
      }
    });

    return jsonResponse({ url: session.url });
  } catch (error) {
    return jsonResponse({ error: error.message || "No se pudo iniciar el pago." }, 400);
  }
};

export const config = {
  path: "/api/billing/checkout",
  method: ["POST"]
};
