import { getBearerToken, jsonResponse } from "./_shared/billing.mts";
import { getAuthenticatedUser, supabaseServiceRequest } from "./_shared/supabase-auth.mts";
import { sendPushToUsers } from "./_shared/web-push.mts";

function isRecent(value, minutes = 10) {
  const timestamp = Date.parse(value ?? "");
  return Number.isFinite(timestamp) && Date.now() - timestamp <= minutes * 60 * 1000;
}

export default async (request) => {
  if (request.method !== "POST") return jsonResponse({ error: "Método no permitido." }, 405);

  try {
    const user = await getAuthenticatedUser(getBearerToken(request));
    const { messageId } = await request.json().catch(() => ({}));
    if (!messageId) return jsonResponse({ error: "Falta el mensaje." }, 400);

    const messageRows = await supabaseServiceRequest(
      `/messages?select=id,conversation_id,sender_user_id,created_at&id=eq.${encodeURIComponent(messageId)}&limit=1`
    );
    const message = messageRows?.[0];
    if (!message || message.sender_user_id !== user.id || !isRecent(message.created_at)) {
      return jsonResponse({ error: "Mensaje no encontrado o sin permisos." }, 403);
    }

    const conversationRows = await supabaseServiceRequest(
      `/conversations?select=id,candidate_id,company_id&id=eq.${encodeURIComponent(message.conversation_id)}&limit=1`
    );
    const conversation = conversationRows?.[0];
    if (!conversation) return jsonResponse({ error: "Conversación no encontrada." }, 404);

    const [candidateRows, companyRows] = await Promise.all([
      supabaseServiceRequest(`/candidate_profiles?select=user_id&id=eq.${encodeURIComponent(conversation.candidate_id)}&limit=1`),
      supabaseServiceRequest(`/company_profiles?select=user_id&id=eq.${encodeURIComponent(conversation.company_id)}&limit=1`)
    ]);
    const participants = [candidateRows?.[0]?.user_id, companyRows?.[0]?.user_id].filter(Boolean);
    if (!participants.includes(user.id)) return jsonResponse({ error: "Sin permisos para esta conversación." }, 403);

    const recipients = participants.filter((userId) => userId !== user.id);
    const result = await sendPushToUsers(recipients, {
      title: "Nuevo mensaje en RedJob",
      body: "Abre RedJob para ver y responder tu conversación.",
      tag: `redjob-message-${conversation.id}`,
      url: "/#mensajes"
    });
    return jsonResponse({ notified: result.sent, available: result.configured });
  } catch (error) {
    return jsonResponse({ error: error.message || "No se pudo enviar la notificación." }, error.status || 400);
  }
};

export const config = {
  path: "/api/notifications/message",
  method: ["POST"]
};
