import { getCanonicalJobUrl, publishGoogleIndexingNotification } from "./_shared/google-indexing.mts";

const JOB_SELECT = "id,title,status,company_id";

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

function getSupabaseConfig() {
  const url = getEnv("NEXT_PUBLIC_SUPABASE_URL") || getEnv("SUPABASE_URL");
  const key = getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") || getEnv("SUPABASE_ANON_KEY");
  if (!url || !key) throw new Error("Falta configuracion de Supabase.");
  return { url: url.replace(/\/$/, ""), key };
}

async function supabaseRequest(path, accessToken) {
  const { url, key } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1${path}`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;
  if (!response.ok) throw new Error(payload?.message || payload?.hint || "Supabase no pudo completar la solicitud.");
  return payload;
}

function resolveNotificationType(job, action) {
  if (action === "deleted") return job.status === "published" ? "URL_DELETED" : "";
  if (job.status === "published") return "URL_UPDATED";
  if (["paused", "closed", "draft"].includes(job.status)) return "URL_DELETED";
  return "";
}

function safeGoogleError(result, fallback = "Error desconocido") {
  const payload = result?.payload;
  const message =
    payload?.error?.message ||
    payload?.error_description ||
    payload?.error ||
    fallback;
  return String(message).slice(0, 240);
}

function logIndexingResult({ type, url, googleStatus = null, ok = false, error = "" }) {
  console.log("[google-indexing]", {
    type,
    url,
    googleStatus,
    ok,
    error: error ? String(error).slice(0, 240) : null
  });
}

async function getVisibleJobForUser(jobId, accessToken) {
  const rows = await supabaseRequest(
    `/jobs?select=${encodeURIComponent(JOB_SELECT)}&id=eq.${encodeURIComponent(jobId)}&limit=1`,
    accessToken
  );
  return rows?.[0] ?? null;
}

async function notifyGoogle({ url, type }) {
  try {
    const result = await publishGoogleIndexingNotification({ url, type });
    logIndexingResult({
      type,
      url,
      googleStatus: result.status,
      ok: result.ok,
      error: result.ok ? "" : safeGoogleError(result, `Google Indexing API respondio ${result.status}.`)
    });
    if (!result.ok) {
      const error = new Error(`Google Indexing API respondio ${result.status}.`);
      error.alreadyLogged = true;
      throw error;
    }
    return result;
  } catch (error) {
    if (!error?.alreadyLogged) {
      logIndexingResult({ type, url, ok: false, error: error.message || "No se pudo notificar a Google." });
    }
    throw error;
  }
}

export default async (req, context) => {
  if (req.method !== "POST") return jsonResponse({ error: "Metodo no permitido." }, 405);

  try {
    const accessToken = getBearerToken(req);
    if (!accessToken) return jsonResponse({ error: "Inicia sesion para continuar." }, 401);

    const body = await req.json().catch(() => ({}));
    const jobId = String(body.jobId ?? "").trim();
    const action = String(body.action ?? "updated").trim();
    const waitForGoogle = Boolean(body.waitForGoogle);

    if (!jobId) return jsonResponse({ error: "Falta la vacante." }, 400);
    if (!["updated", "status_changed", "deleted"].includes(action)) {
      return jsonResponse({ error: "Accion no permitida." }, 400);
    }

    const job = await getVisibleJobForUser(jobId, accessToken);
    if (!job?.id || !job?.title) return jsonResponse({ error: "Vacante no encontrada o sin permisos." }, 404);

    const type = resolveNotificationType(job, action);
    if (!type) return jsonResponse({ skipped: true, reason: "Estado de vacante no indexable." }, 200);

    const url = getCanonicalJobUrl(req, job);
    const notification = { url, type };

    if (waitForGoogle) {
      const result = await notifyGoogle(notification);
      return jsonResponse({
        ok: result.ok,
        googleStatus: result.status,
        type,
        url,
        metadata: result.payload?.urlNotificationMetadata ?? null
      });
    }

    const task = notifyGoogle(notification).catch((error) => {
      if (!error?.alreadyLogged) {
        logIndexingResult({ type, url, ok: false, error: error.message || "No se pudo notificar a Google." });
      }
    });
    if (context?.waitUntil) context.waitUntil(task);
    else await task.catch(() => null);

    return jsonResponse({ queued: true, type, url }, 202);
  } catch (error) {
    return jsonResponse({ error: error.message || "No se pudo notificar a Google." }, 400);
  }
};
