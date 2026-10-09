import webPush from "web-push";
import { getEnv, supabaseServiceRequest } from "./supabase-auth.mts";

export function getWebPushPublicKey() {
  return getEnv("WEB_PUSH_VAPID_PUBLIC_KEY").trim();
}

function getWebPushConfig() {
  const publicKey = getWebPushPublicKey();
  const privateKey = getEnv("WEB_PUSH_VAPID_PRIVATE_KEY").trim();
  const contact = getEnv("WEB_PUSH_CONTACT", "mailto:redjobmx@gmail.com").trim();
  if (!publicKey || !privateKey) return null;
  return { publicKey, privateKey, contact };
}

async function removeExpiredSubscription(endpoint) {
  await supabaseServiceRequest(`/push_subscriptions?endpoint=eq.${encodeURIComponent(endpoint)}`, {
    method: "DELETE"
  }).catch(() => null);
}

export async function sendPushToUsers(userIds, payload) {
  const config = getWebPushConfig();
  const recipients = [...new Set((userIds ?? []).filter(Boolean).map(String))];
  if (!config || !recipients.length) {
    return { configured: Boolean(config), recipients: recipients.length, sent: 0, failed: 0 };
  }

  webPush.setVapidDetails(config.contact, config.publicKey, config.privateKey);
  const subscriptions = [];
  for (let index = 0; index < recipients.length; index += 50) {
    const batch = recipients.slice(index, index + 50);
    const rows = await supabaseServiceRequest(
      `/push_subscriptions?select=id,user_id,endpoint,p256dh,auth_key&user_id=in.(${batch.map(encodeURIComponent).join(",")})`
    );
    subscriptions.push(...(rows ?? []));
  }

  let sent = 0;
  let failed = 0;
  await Promise.all(subscriptions.map(async (subscription) => {
    try {
      await webPush.sendNotification(
        {
          endpoint: subscription.endpoint,
          keys: { p256dh: subscription.p256dh, auth: subscription.auth_key }
        },
        JSON.stringify(payload),
        { TTL: 120, urgency: "high" }
      );
      sent += 1;
    } catch (error) {
      failed += 1;
      if ([404, 410].includes(Number(error?.statusCode))) {
        await removeExpiredSubscription(subscription.endpoint);
      }
    }
  }));

  return { configured: true, recipients: recipients.length, subscriptions: subscriptions.length, sent, failed };
}

export async function getActiveAdminUserIds() {
  const roles = await supabaseServiceRequest("/user_roles?select=user_id&role=eq.admin");
  const roleIds = [...new Set((roles ?? []).map((row) => row.user_id).filter(Boolean))];
  if (!roleIds.length) return [];

  const profiles = await supabaseServiceRequest(
    `/profiles?select=id&id=in.(${roleIds.map(encodeURIComponent).join(",")})&suspended_at=is.null`
  );
  return (profiles ?? []).map((profile) => profile.id);
}
