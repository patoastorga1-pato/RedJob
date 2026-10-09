export function getEnv(name, fallback = "") {
  return globalThis.Netlify?.env?.get(name) ?? fallback;
}

export function getSupabaseServerConfig({ requireService = false } = {}) {
  const url = getEnv("NEXT_PUBLIC_SUPABASE_URL") || getEnv("SUPABASE_URL");
  const anonKey = getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") || getEnv("SUPABASE_ANON_KEY");
  const serviceRoleKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !anonKey || (requireService && !serviceRoleKey)) {
    throw new Error(requireService
      ? "Falta SUPABASE_SERVICE_ROLE_KEY o la configuración de Supabase."
      : "Falta la configuración de Supabase.");
  }

  return { url: url.replace(/\/$/, ""), anonKey, serviceRoleKey };
}

export async function getAuthenticatedUser(accessToken) {
  if (!accessToken) throw new Error("Inicia sesión para continuar.");
  const { url, anonKey } = getSupabaseServerConfig();
  const response = await fetch(`${url}/auth/v1/user`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken}`
    }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload?.id) {
    const error = new Error("La sesión no es válida o ya expiró.");
    error.status = 401;
    throw error;
  }
  return payload;
}

export async function supabaseServiceRequest(path, options = {}) {
  const { url, serviceRoleKey } = getSupabaseServerConfig({ requireService: true });
  const response = await fetch(`${url}/rest/v1${path}`, {
    method: options.method ?? "GET",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      ...(options.prefer ? { Prefer: options.prefer } : {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const error = new Error(payload?.message || payload?.hint || "Supabase no pudo completar la solicitud.");
    error.status = response.status;
    throw error;
  }
  return payload;
}

export async function isAdminUser(userId) {
  if (!userId) return false;
  const [roles, profiles] = await Promise.all([
    supabaseServiceRequest(
      `/user_roles?select=user_id&user_id=eq.${encodeURIComponent(userId)}&role=eq.admin&limit=1`
    ),
    supabaseServiceRequest(
      `/profiles?select=id&id=eq.${encodeURIComponent(userId)}&suspended_at=is.null&limit=1`
    )
  ]);
  return Boolean(roles?.[0]?.user_id && profiles?.[0]?.id);
}

export async function getOwnedCompanyRecord(companyId, accessToken, select = "*") {
  if (!companyId) throw new Error("Selecciona una empresa.");
  const user = await getAuthenticatedUser(accessToken);
  const rows = await supabaseServiceRequest(
    `/company_profiles?select=${encodeURIComponent(select)}&id=eq.${encodeURIComponent(companyId)}&user_id=eq.${encodeURIComponent(user.id)}&limit=1`
  );
  const company = rows?.[0];
  if (!company) {
    const error = new Error("Empresa no encontrada o sin permisos.");
    error.status = 403;
    throw error;
  }
  return { company, user };
}
