import { getBearerToken, getOwnedCompany, getSiteUrl, getStripe, jsonResponse } from "./_shared/billing.mts";

export default async (req) => {
  if (req.method !== "POST") return jsonResponse({ error: "Metodo no permitido." }, 405);

  try {
    const { companyId } = await req.json();
    const accessToken = getBearerToken(req);
    const company = await getOwnedCompany(companyId, accessToken);

    if (!company.billing_customer_id) {
      return jsonResponse({ error: "Esta empresa aun no tiene una suscripcion de Stripe." }, 400);
    }

    const stripe = getStripe();
    const siteUrl = getSiteUrl(req);
    const session = await stripe.billingPortal.sessions.create({
      customer: company.billing_customer_id,
      return_url: `${siteUrl}/?billing=portal#empresas`
    });

    return jsonResponse({ url: session.url });
  } catch (error) {
    return jsonResponse({ error: error.message || "No se pudo abrir el portal de pagos." }, 400);
  }
};

export const config = {
  path: "/api/billing/portal",
  method: ["POST"]
};
