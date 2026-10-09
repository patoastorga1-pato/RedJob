import { jsonResponse } from "./_shared/billing.mts";
import { getWebPushPublicKey } from "./_shared/web-push.mts";

export default async (request) => {
  if (request.method !== "GET") return jsonResponse({ error: "Método no permitido." }, 405);
  const publicKey = getWebPushPublicKey();
  if (!publicKey) return jsonResponse({ available: false }, 503);
  return jsonResponse({ available: true, publicKey });
};

export const config = {
  path: "/api/notifications/public-key",
  method: ["GET"]
};
