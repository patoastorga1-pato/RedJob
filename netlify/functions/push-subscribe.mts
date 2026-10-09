import { getBearerToken, jsonResponse } from "./_shared/billing.mts";
import { getAuthenticatedUser, supabaseServiceRequest } from "./_shared/supabase-auth.mts";

function normalizeSubscription(value) {
  const endpoint = String(value?.endpoint ?? "").trim();
  const p256dh = String(value?.keys?.p256dh ?? "").trim();
  const auth = String(value?.keys?.auth ?? "").trim();
  if (!endpoint.startsWith("https://") || endpoint.length > 2000 || !p256dh || !auth) {
    throw new Error("La suscripción de notificaciones no es válida.");
  }
  return { endpoint, p256dh, auth };
}

export default async (request) => {
  if (!["POST", "DELETE"].includes(request.method)) {
    return jsonResponse({ error: "Método no permitido." }, 405);
  }

  try {
    const accessToken = getBearerToken(request);
    const user = await getAuthenticatedUser(accessToken);
    const body = await request.json().catch(() => ({}));

    if (request.method === "DELETE") {
      const endpoint = String(body?.endpoint ?? "").trim();
      if (!endpoint) return jsonResponse({ removed: true });
      await supabaseServiceRequest(
        `/push_subscriptions?user_id=eq.${encodeURIComponent(user.id)}&endpoint=eq.${encodeURIComponent(endpoint)}`,
        { method: "DELETE" }
      );
      return jsonResponse({ removed: true });
    }

    const subscription = normalizeSubscription(body?.subscription);
    await supabaseServiceRequest("/push_subscriptions?on_conflict=endpoint", {
      method: "POST",
      prefer: "resolution=merge-duplicates,return=minimal",
      body: {
        user_id: user.id,
        endpoint: subscription.endpoint,
        p256dh: subscription.p256dh,
        auth_key: subscription.auth,
        user_agent: String(request.headers.get("user-agent") ?? "").slice(0, 500),
        updated_at: new Date().toISOString()
      }
    });
    return jsonResponse({ subscribed: true });
  } catch (error) {
    return jsonResponse({ error: error.message || "No se pudo guardar la suscripción." }, error.status || 400);
  }
};

export const config = {
  path: "/api/notifications/subscription",
  method: ["POST", "DELETE"]
};
