function getEnv(name, fallback = "") {
  return globalThis.Netlify?.env?.get(name) ?? fallback;
}

const SUPABASE_URL = (getEnv("SUPABASE_URL") || getEnv("NEXT_PUBLIC_SUPABASE_URL") || "").replace(/\/$/, "");
const SUPABASE_ANON_KEY = getEnv("SUPABASE_ANON_KEY") || getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") || "";
const SUPABASE_SERVICE_ROLE_KEY = getEnv("SUPABASE_SERVICE_ROLE_KEY") || "";

function normalizePath(value) {
  const path = String(value ?? "/").split("?")[0].trim() || "/";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized.startsWith("/vacantes/")) return normalized.slice(0, 240);
  if (normalized.startsWith("/blog")) return "/blog/";
  return "/";
}

async function readBody(request) {
  try {
    return await request.json();
  } catch (error) {
    return {};
  }
}

export default async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: { Allow: "POST, OPTIONS" } });
  }

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "POST, OPTIONS" } });
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  }

  const body = await readBody(request);
  const key = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/record_page_visit`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ visit_path: normalizePath(body.path) })
  });

  if (!response.ok) {
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  }

  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
};
