import { getBearerToken, jsonResponse } from "./_shared/billing.mts";
import { getAuthenticatedUser, getSupabaseServerConfig } from "./_shared/supabase-auth.mts";

async function storageRequest(path, options = {}) {
  const { url, serviceRoleKey } = getSupabaseServerConfig({ requireService: true });
  const response = await fetch(`${url}/storage/v1${path}`, {
    method: options.method ?? "GET",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json"
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;
  if (!response.ok) throw new Error(payload?.message || payload?.error || "No se pudieron eliminar los archivos de la cuenta.");
  return payload;
}

async function listStorageFiles(bucket, prefix) {
  const files = [];
  const pendingPrefixes = [prefix];

  while (pendingPrefixes.length) {
    const currentPrefix = pendingPrefixes.shift();
    let offset = 0;
    while (true) {
      const rows = await storageRequest(`/object/list/${encodeURIComponent(bucket)}`, {
        method: "POST",
        body: { prefix: currentPrefix, limit: 1000, offset, sortBy: { column: "name", order: "asc" } }
      });
      for (const entry of rows ?? []) {
        const path = `${currentPrefix}/${entry.name}`.replace(/^\/+/, "");
        if (entry.id || entry.metadata) files.push(path);
        else pendingPrefixes.push(path);
      }
      if (!Array.isArray(rows) || rows.length < 1000) break;
      offset += rows.length;
      if (offset >= 50000) throw new Error("La cuenta tiene demasiados archivos para eliminarlos automáticamente.");
    }
  }
  return files;
}

async function removeStorageFiles(bucket, userId) {
  const files = await listStorageFiles(bucket, userId);
  for (let index = 0; index < files.length; index += 100) {
    await storageRequest(`/object/${encodeURIComponent(bucket)}`, {
      method: "DELETE",
      body: { prefixes: files.slice(index, index + 100) }
    });
  }
}

export default async (request) => {
  if (request.method !== "POST") return jsonResponse({ error: "Método no permitido." }, 405);

  try {
    const user = await getAuthenticatedUser(getBearerToken(request));
    const body = await request.json().catch(() => ({}));
    if (body?.confirmation !== "ELIMINAR") {
      return jsonResponse({ error: "Escribe ELIMINAR para confirmar." }, 400);
    }

    await Promise.all([
      removeStorageFiles("resumes", user.id),
      removeStorageFiles("company-logos", user.id)
    ]);

    const { url, serviceRoleKey } = getSupabaseServerConfig({ requireService: true });
    const response = await fetch(`${url}/auth/v1/admin/users/${encodeURIComponent(user.id)}`, {
      method: "DELETE",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`
      }
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload?.message || "No se pudo eliminar la cuenta.");

    return jsonResponse({ deleted: true });
  } catch (error) {
    return jsonResponse({ error: error.message || "No se pudo eliminar la cuenta." }, error.status || 400);
  }
};

export const config = {
  path: "/api/account/delete",
  method: ["POST"]
};
