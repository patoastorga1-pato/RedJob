import { getBearerToken, jsonResponse, planConfig, supabaseRequest } from "./_shared/billing.mjs";

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
    if (!accessToken) return jsonResponse({ error: "Inicia sesion para continuar." }, 401);

    const rows = await supabaseRequest(
      `/jobs?select=id,company_id,company_profiles(id,plan,plan_status)&id=eq.${encodeURIComponent(jobId)}&limit=1`,
      { authorization: `Bearer ${accessToken}` }
    );
    const job = rows?.[0];
    const company = Array.isArray(job?.company_profiles) ? job.company_profiles[0] : job?.company_profiles;
    if (!job || !company) return jsonResponse({ error: "Vacante no encontrada o sin permisos." }, 404);

    const plan = company.plan;
    const selectedPlan = planConfig[plan];
    if (!selectedPlan || !["active", "trialing", "beta"].includes(company.plan_status)) {
      return jsonResponse({ error: "Contrata Pro o Premium para destacar vacantes." }, 403);
    }

    const activeFeaturedRows = await supabaseRequest(
      `/jobs?select=id&company_id=eq.${encodeURIComponent(company.id)}&is_featured=eq.true&or=(featured_until.is.null,featured_until.gt.${encodeURIComponent(new Date().toISOString())})`,
      { service: true }
    );

    if ((activeFeaturedRows?.length ?? 0) >= selectedPlan.featuredSlots) {
      return jsonResponse({ error: `Tu plan ${selectedPlan.label} permite ${selectedPlan.featuredSlots} vacante${selectedPlan.featuredSlots === 1 ? "" : "s"} destacada${selectedPlan.featuredSlots === 1 ? "" : "s"}.` }, 409);
    }

    const updatedRows = await supabaseRequest(`/jobs?id=eq.${encodeURIComponent(job.id)}`, {
      method: "PATCH",
      service: true,
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
