import Stripe from "stripe";

export const planConfig = {
  pro: {
    label: "Pro",
    priceEnv: "STRIPE_PRICE_PRO",
    fallbackPriceId: "price_1TyKJNRonDWaSBmIvqhVrKrS",
    featuredSlots: 1,
    featuredPriority: 50
  },
  premium: {
    label: "Premium",
    priceEnv: "STRIPE_PRICE_PREMIUM",
    fallbackPriceId: "price_1TyKJbRonDWaSBmIROFQtUx0",
    featuredSlots: 3,
    featuredPriority: 100
  }
};

export function getEnv(name, fallback = "") {
  return globalThis.Netlify?.env?.get(name) ?? fallback;
}

export function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

export function getBearerToken(req) {
  const authorization = req.headers.get("authorization") ?? "";
  return authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
}

export function getStripe() {
  const secretKey = getEnv("STRIPE_SECRET_KEY");
  if (!secretKey) throw new Error("Falta STRIPE_SECRET_KEY.");
  return new Stripe(secretKey);
}

export function getSiteUrl(req) {
  const configuredUrl = getEnv("SITE_URL") || getEnv("URL");
  if (configuredUrl) return configuredUrl.replace(/\/$/, "");
  const url = new URL(req.url);
  return `${url.protocol}//${url.host}`;
}

export function getSupabaseConfig({ service = false } = {}) {
  const url = getEnv("NEXT_PUBLIC_SUPABASE_URL") || getEnv("SUPABASE_URL");
  const anonKey = getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") || getEnv("SUPABASE_ANON_KEY");
  const serviceRoleKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");
  const key = service ? serviceRoleKey : anonKey;

  if (!url || !key) {
    throw new Error(service ? "Falta SUPABASE_SERVICE_ROLE_KEY o URL de Supabase." : "Falta configuracion de Supabase.");
  }

  return { url: url.replace(/\/$/, ""), key };
}

export async function supabaseRequest(path, options = {}) {
  const { url, key } = getSupabaseConfig({ service: Boolean(options.service) });
  const authorization = options.authorization ?? `Bearer ${key}`;
  const response = await fetch(`${url}/rest/v1${path}`, {
    method: options.method ?? "GET",
    headers: {
      apikey: key,
      Authorization: authorization,
      "Content-Type": "application/json",
      ...(options.prefer ? { Prefer: options.prefer } : {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(payload?.message || payload?.hint || "Supabase no pudo completar la solicitud.");
  }

  return payload;
}

export async function getOwnedCompany(companyId, accessToken) {
  if (!companyId) throw new Error("Selecciona una empresa.");
  if (!accessToken) throw new Error("Inicia sesion para continuar.");

  const rows = await supabaseRequest(`/company_profiles?select=*&id=eq.${encodeURIComponent(companyId)}&limit=1`, {
    authorization: `Bearer ${accessToken}`
  });

  const company = rows?.[0];
  if (!company) throw new Error("Empresa no encontrada o sin permisos.");
  return company;
}

export async function updateCompanyBilling(companyId, body) {
  const rows = await supabaseRequest(`/company_profiles?id=eq.${encodeURIComponent(companyId)}`, {
    method: "PATCH",
    service: true,
    prefer: "return=representation",
    body
  });
  return rows?.[0] ?? null;
}

export function mapSubscriptionStatus(status) {
  if (status === "trialing") return "trialing";
  if (status === "active") return "active";
  if (status === "past_due" || status === "unpaid" || status === "incomplete") return "past_due";
  return "canceled";
}

export function timestampToIso(value) {
  return value ? new Date(value * 1000).toISOString() : null;
}
