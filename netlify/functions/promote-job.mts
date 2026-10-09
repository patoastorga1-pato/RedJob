import { getBearerToken, jsonResponse, planConfig } from "./_shared/billing.mts";
import { getAuthenticatedUser, supabaseServiceRequest } from "./_shared/supabase-auth.mts";

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next.toISOString();
}

export default async (req) => {
  if (req.method !== "POST") return jsonResponse({ error: "Metodo no permitido." }, 405);

  try {
    const { jobId } = await req.json();
    const accessToken = getBearerToken(req);
    if (!jobId) return jsonResponse({ error: "Selecciona una vacante." }, 400);
    if (!accessToken) return jsonResponse({ error: "Inicia sesión para continuar." }, 401);

    const user = await getAuthenticatedUser(accessToken);
    const rows = await supabaseServiceRequest(
      `/jobs?select=id,status,company_id,company_profiles(id,user_id,plan,plan_status)&id=eq.${encodeURIComponent(jobId)}&limit=1`
    );
    const job = rows?.[0];
    const company = Array.isArray(job?.company_profiles) ? job.company_profiles[0] : job?.company_profiles;
    if (!job || !company || company.user_id !== user.id) {
      return jsonResponse({ error: "Vacante no encontrada o sin permisos." }, 403);
    }
    if (job.status !== "published") {
      return jsonResponse({ error: "Solo se pueden destacar vacantes publicadas." }, 409);
    }

    const plan = company.plan;
    const selectedPlan = planConfig[plan];
    if (!selectedPlan || !["active", "trialing", "beta"].includes(company.plan_status)) {
      return jsonResponse({ error: "Contrata Pro o Premium para destacar vacantes." }, 403);
    }

    const activeFeaturedRows = await supabaseServiceRequest(
      `/jobs?select=id&company_id=eq.${encodeURIComponent(company.id)}&is_featured=eq.true&or=(featured_until.is.null,featured_until.gt.${encodeURIComponent(new Date().toISOString())})`
    );

    if ((activeFeaturedRows?.length ?? 0) >= selectedPlan.featuredSlots) {
      return jsonResponse({ error: `Tu plan ${selectedPlan.label} permite ${selectedPlan.featuredSlots} vacante${selectedPlan.featuredSlots === 1 ? "" : "s"} destacada${selectedPlan.featuredSlots === 1 ? "" : "s"}.` }, 409);
    }

    const updatedRows = await supabaseServiceRequest(`/jobs?id=eq.${encodeURIComponent(job.id)}`, {
      method: "PATCH",
      prefer: "return=representation",
      body: {
        is_featured: true,
        featured_priority: selectedPlan.featuredPriority,
        featured_until: addDays(new Date(), 30),
        promotion_source: "plan"
      }
    });

    return jsonResponse({ job: updatedRows?.[0] ?? null });
  } catch (error) {
    return jsonResponse({ error: error.message || "No se pudo destacar la vacante." }, 400);
  }
};

export const config = {
  path: "/api/jobs/promote",
  method: ["POST"]
};
