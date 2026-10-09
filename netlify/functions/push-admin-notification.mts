import { getBearerToken, jsonResponse } from "./_shared/billing.mts";
import { getAuthenticatedUser, supabaseServiceRequest } from "./_shared/supabase-auth.mts";
import { getActiveAdminUserIds, sendPushToUsers } from "./_shared/web-push.mts";

function isRecent(value, minutes = 10) {
  const timestamp = Date.parse(value ?? "");
  return Number.isFinite(timestamp) && Date.now() - timestamp <= minutes * 60 * 1000;
}

export default async (request) => {
  if (request.method !== "POST") return jsonResponse({ error: "Método no permitido." }, 405);

  try {
    const user = await getAuthenticatedUser(getBearerToken(request));
    const { eventType, targetId } = await request.json().catch(() => ({}));
    let payload = null;

    if (eventType === "job_pending") {
      const rows = await supabaseServiceRequest(
        `/jobs?select=id,status,updated_at,company_profiles(user_id)&id=eq.${encodeURIComponent(targetId)}&limit=1`
      );
      const job = rows?.[0];
      const company = Array.isArray(job?.company_profiles) ? job.company_profiles[0] : job?.company_profiles;
      if (!job || job.status !== "draft" || company?.user_id !== user.id || !isRecent(job.updated_at)) {
        return jsonResponse({ error: "Vacante no encontrada o sin permisos." }, 403);
      }
      payload = {
        title: "Vacante pendiente de aprobación",
        body: "Hay una vacante nueva por revisar en el panel.",
        tag: `redjob-admin-job-${job.id}`,
        url: "/#administracion"
      };
    } else if (eventType === "report_pending") {
      const rows = await supabaseServiceRequest(
        `/reports?select=id,status,reporter_user_id,created_at&id=eq.${encodeURIComponent(targetId)}&limit=1`
      );
      const report = rows?.[0];
      if (!report || report.status !== "pending" || report.reporter_user_id !== user.id || !isRecent(report.created_at)) {
        return jsonResponse({ error: "Reporte no encontrado o sin permisos." }, 403);
      }
      payload = {
        title: "Nuevo reporte en RedJob",
        body: "Hay un reporte nuevo por revisar en el panel.",
        tag: `redjob-admin-report-${report.id}`,
        url: "/#administracion"
      };
    } else {
      return jsonResponse({ error: "Tipo de aviso no permitido." }, 400);
    }

    const admins = await getActiveAdminUserIds();
    const result = await sendPushToUsers(admins, payload);
    return jsonResponse({ notified: result.sent, available: result.configured });
  } catch (error) {
    return jsonResponse({ error: error.message || "No se pudo enviar el aviso." }, error.status || 400);
  }
};

export const config = {
  path: "/api/notifications/admin-event",
  method: ["POST"]
};
