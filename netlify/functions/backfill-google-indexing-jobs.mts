import { getCanonicalJobUrl, publishGoogleIndexingNotification } from "./_shared/google-indexing.mts";

const JOB_SELECT = "id,title,status,updated_at";
const MAX_BATCH_SIZE = 10;

function getEnv(name, fallback = "") {
  return globalThis.Netlify?.env?.get(name) ?? fallback;
}

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function getBearerToken(req) {
  const authorization = req.headers.get("authorization") ?? "";
  return authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
}

function getSupabaseConfig({ service = false } = {}) {
  const url = getEnv("NEXT_PUBLIC_SUPABASE_URL") || getEnv("SUPABASE_URL");
  const anonKey = getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") || getEnv("SUPABASE_ANON_KEY");
  const serviceRoleKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");
  const key = service ? serviceRoleKey : anonKey;
  if (!url || !key) throw new Error(service ? "Falta SUPABASE_SERVICE_ROLE_KEY o URL de Supabase." : "Falta configuracion de Supabase.");
  return { url: url.replace(/\/$/, ""), key };
}

async function supabaseRequest(path, options = {}) {
  const { url, key } = getSupabaseConfig({ service: Boolean(options.service) });
  const authorization = options.authorization ?? `Bearer ${key}`;
  const response = await fetch(`${url}/rest/v1${path}`, {
    method: options.method ?? "GET",
    headers: {
      apikey: key,
      Authorization: authorization,
      "Content-Type": "application/json"
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;
  if (!response.ok) throw new Error(payload?.message || payload?.hint || "Supabase no pudo completar la solicitud.");
  return payload;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requireAdmin(accessToken) {
  const result = await supabaseRequest("/rpc/is_admin", {
    method: "POST",
    authorization: `Bearer ${accessToken}`,
    body: {}
  });
  if (result !== true) throw new Error("No tienes permisos de administracion.");
}

export default async (req) => {
  if (req.method !== "POST") return jsonResponse({ error: "Metodo no permitido." }, 405);

  try {
    const accessToken = getBearerToken(req);
    if (!accessToken) return jsonResponse({ error: "Inicia sesion para continuar." }, 401);
    await requireAdmin(accessToken);

    const body = await req.json().catch(() => ({}));
    const limit = Math.min(Math.max(Number(body.limit) || 5, 1), MAX_BATCH_SIZE);
    const offset = Math.max(Number(body.offset) || 0, 0);
    const dryRun = body.dryRun !== false;

    const jobs = await supabaseRequest(
      `/jobs?select=${encodeURIComponent(JOB_SELECT)}&status=eq.published&order=updated_at.desc.nullslast&limit=${limit}&offset=${offset}`,
      { service: true }
    );

    const results = [];
    for (const job of jobs ?? []) {
      const url = getCanonicalJobUrl(req, job);
      if (dryRun) {
        results.push({ jobId: job.id, url, type: "URL_UPDATED", dryRun: true });
        continue;
      }

      const result = await publishGoogleIndexingNotification({ url, type: "URL_UPDATED" }).catch((error) => ({
        ok: false,
        status: 0,
        payload: { error: error.message || "No se pudo notificar a Google." }
      }));
      results.push({
        jobId: job.id,
        url,
        type: "URL_UPDATED",
        googleStatus: result.status,
        ok: result.ok,
        metadata: result.payload?.urlNotificationMetadata ?? null,
        error: result.ok ? null : result.payload?.error ?? null
      });
      await sleep(500);
    }

    return jsonResponse({
      dryRun,
      limit,
      offset,
      count: results.length,
      results
    });
  } catch (error) {
    return jsonResponse({ error: error.message || "No se pudo preparar el envio a Google." }, 400);
  }
};
