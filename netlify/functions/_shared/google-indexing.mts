import { createSign } from "node:crypto";

const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";
const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const INDEXING_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish";

function getEnv(name, fallback = "") {
  return globalThis.Netlify?.env?.get(name) ?? fallback;
}

function base64Url(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function getServiceAccount() {
  const raw = getEnv("GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON");
  if (!raw) throw new Error("Falta GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON.");
  const account = JSON.parse(raw);
  if (!account.client_email || !account.private_key) throw new Error("La cuenta de servicio de Google esta incompleta.");
  return {
    clientEmail: account.client_email,
    privateKey: String(account.private_key).replace(/\\n/g, "\n")
  };
}

function createJwtAssertion() {
  const account = getServiceAccount();
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: account.clientEmail,
    scope: INDEXING_SCOPE,
    aud: TOKEN_ENDPOINT,
    iat: now,
    exp: now + 3600
  };
  const unsigned = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(claim))}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(account.privateKey);
  return `${unsigned}.${base64Url(signature)}`;
}

async function fetchWithTimeout(url, options, timeoutMs = 12000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

export function slugify(value) {
  return String(value ?? "vacante")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72) || "vacante";
}

export function getSiteUrl(req) {
  const configuredUrl = getEnv("SITE_URL") || getEnv("URL") || "https://redjob.com.mx";
  return configuredUrl.replace(/\/$/, "") || new URL(req.url).origin;
}

export function getCanonicalJobUrl(req, job) {
  return `${getSiteUrl(req)}/vacantes/${slugify(job.title)}-${job.id}`;
}

export async function getGoogleIndexingAccessToken() {
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: createJwtAssertion()
  });
  const response = await fetchWithTimeout(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.access_token) {
    const message = payload?.error_description || payload?.error || `Google OAuth respondio ${response.status}.`;
    throw new Error(message);
  }
  return payload.access_token;
}

export async function publishGoogleIndexingNotification({ url, type }) {
  if (!["URL_UPDATED", "URL_DELETED"].includes(type)) {
    throw new Error("Tipo de notificacion no permitido.");
  }

  const token = await getGoogleIndexingAccessToken();
  const response = await fetchWithTimeout(INDEXING_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url, type })
  });
  const payload = await response.json().catch(() => ({}));

  return {
    ok: response.ok,
    status: response.status,
    type,
    url,
    payload
  };
}
