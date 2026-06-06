let jobs = [];

const jobsList = document.querySelector("#jobsList");
const hiringCompaniesList = document.querySelector("#hiringCompaniesList");
const resultCount = document.querySelector("#resultCount");
const searchInput = document.querySelector("#searchInput");
const locationInput = document.querySelector("#locationInput");
const modeFilter = document.querySelector("#modeFilter");
const categoryFilter = document.querySelector("#categoryFilter");
const signupMessage = document.querySelector("#signupMessage");
const accountNameLabel = document.querySelector("#accountNameLabel");
const authEmail = document.querySelector("#authEmail");
const authPassword = document.querySelector("#authPassword");
const authName = document.querySelector("#authName");
const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");
const forgotPasswordButton = document.querySelector("#forgotPasswordButton");
const sessionStatus = document.querySelector("#sessionStatus");
const selectedRoleStatus = document.querySelector("#selectedRoleStatus");
const headerSignInButton = document.querySelector("#headerSignInButton");
const headerCreateAccountButton = document.querySelector("#headerCreateAccountButton");
const headerProfileButton = document.querySelector("#headerProfileButton");
const unreadMessagesBadge = document.querySelector("#unreadMessagesBadge");
const profileSignOutButton = document.querySelector("#profileSignOutButton");
const profileAvatar = document.querySelector("#profileAvatar");
const profileDisplayName = document.querySelector("#profileDisplayName");
const profileDisplayMeta = document.querySelector("#profileDisplayMeta");
const resumeButton = document.querySelector("#resumeButton");
const resumeInput = document.querySelector("#resumeInput");
const resumeStatus = document.querySelector("#resumeStatus");
const savedCount = document.querySelector("#savedCount");
const applicationCount = document.querySelector("#applicationCount");
const savedJobsList = document.querySelector("#savedJobsList");
const applicationsList = document.querySelector("#applicationsList");
const applicationDialog = document.querySelector("#applicationDialog");
const applicationJobTitle = document.querySelector("#applicationJobTitle");
const applicationJobMeta = document.querySelector("#applicationJobMeta");
const coverNote = document.querySelector("#coverNote");
const toast = document.querySelector("#toast");
const chatBody = document.querySelector(".chat-body");
const conversationList = document.querySelector("#conversationList");
const conversationCount = document.querySelector("#conversationCount");
const chatJobDetailButton = document.querySelector("#chatJobDetailButton");
const candidatePreview = document.querySelector("#candidatePreview");
const candidatePreviewAvatar = document.querySelector("#candidatePreviewAvatar");
const candidatePreviewName = document.querySelector("#candidatePreviewName");
const candidatePreviewMeta = document.querySelector("#candidatePreviewMeta");
const candidatePreviewSummary = document.querySelector("#candidatePreviewSummary");
const candidatePreviewResume = document.querySelector("#candidatePreviewResume");
const candidateProfileDialog = document.querySelector("#candidateProfileDialog");
const receivedCandidateAvatar = document.querySelector("#receivedCandidateAvatar");
const receivedCandidateName = document.querySelector("#receivedCandidateName");
const receivedCandidateMeta = document.querySelector("#receivedCandidateMeta");
const receivedCandidateJob = document.querySelector("#receivedCandidateJob");
const receivedCandidateApplicationStatus = document.querySelector("#receivedCandidateApplicationStatus");
const receivedCandidateSummary = document.querySelector("#receivedCandidateSummary");
const receivedCandidateResume = document.querySelector("#receivedCandidateResume");
const candidateProfileForm = document.querySelector("#candidateProfileForm");
const candidateFullName = document.querySelector("#candidateFullName");
const candidateAge = document.querySelector("#candidateAge");
const candidateTargetRole = document.querySelector("#candidateTargetRole");
const candidateLocation = document.querySelector("#candidateLocation");
const candidateWorkMode = document.querySelector("#candidateWorkMode");
const candidateSkills = document.querySelector("#candidateSkills");
const candidateSummary = document.querySelector("#candidateSummary");
const companyJobEditor = document.querySelector("#companyJobEditor");
const companyJobForm = document.querySelector("#companyJobForm");
const companyNameInput = document.querySelector("#companyNameInput");
const companyDescriptionInput = document.querySelector("#companyDescriptionInput");
const jobTitleInput = document.querySelector("#jobTitleInput");
const jobDescriptionInput = document.querySelector("#jobDescriptionInput");
const jobLocationInput = document.querySelector("#jobLocationInput");
const jobWorkModeInput = document.querySelector("#jobWorkModeInput");
const jobCategoryInput = document.querySelector("#jobCategoryInput");
const jobCustomCategoryLabel = document.querySelector("#jobCustomCategoryLabel");
const jobCustomCategoryInput = document.querySelector("#jobCustomCategoryInput");
const jobSalaryMinInput = document.querySelector("#jobSalaryMinInput");
const jobSalaryMaxInput = document.querySelector("#jobSalaryMaxInput");
const jobSkillsInput = document.querySelector("#jobSkillsInput");
const companyJobSubmitButton = document.querySelector("#companyJobSubmitButton");
const cancelJobEditButton = document.querySelector("#cancelJobEditButton");
const companyJobsList = document.querySelector("#companyJobsList");
const receivedCandidatesList = document.querySelector("#receivedCandidatesList");
const companyActiveJobsCount = document.querySelector("#companyActiveJobsCount");
const companyCandidatesCount = document.querySelector("#companyCandidatesCount");
const companyInterviewCount = document.querySelector("#companyInterviewCount");
const companyHeroLogo = document.querySelector("#companyHeroLogo");
const companyHeroName = document.querySelector("#companyHeroName");
const companyHeroDescription = document.querySelector("#companyHeroDescription");
const companyVerifiedBadge = document.querySelector("#companyVerifiedBadge");
const companyProfileSelect = document.querySelector("#companyProfileSelect");
const newCompanyButton = document.querySelector("#newCompanyButton");
const deleteCompanyButton = document.querySelector("#deleteCompanyButton");
const detailCompanyLogo = document.querySelector("#detailCompanyLogo");
const detailCompany = document.querySelector("#detailCompany");
const detailTitle = document.querySelector("#detailTitle");
const detailMeta = document.querySelector("#detailMeta");
const detailCommercialBadges = document.querySelector("#detailCommercialBadges");
const detailMatch = document.querySelector("#detailMatch");
const detailMatchBar = document.querySelector("#detailMatchBar");
const detailDescription = document.querySelector("#detailDescription");
const detailCompanyDescription = document.querySelector("#detailCompanyDescription");
const detailRequirements = document.querySelector("#detailRequirements");
const detailSaveButton = document.querySelector("#detailSaveButton");
const detailApplyButton = document.querySelector("#detailApplyButton");

const savedJobs = new Set();
const applications = [];
let activeApplicationJob = null;
let toastTimer = null;

const runtimeConfig = window.REDJOB_CONFIG ?? {};
const SUPABASE_URL =
  runtimeConfig.NEXT_PUBLIC_SUPABASE_URL ??
  runtimeConfig.SUPABASE_URL ??
  "https://tkfexxkbdkvpwhcqkvwp.supabase.co";
const SUPABASE_ANON_KEY =
  runtimeConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  runtimeConfig.SUPABASE_ANON_KEY ??
  "sb_publishable_H0QIgf8EpEnl6A086dp-9Q_NddTLvWy";
window.REDJOB_CONFIG = {
  ...runtimeConfig,
  NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: SUPABASE_ANON_KEY
};
const SESSION_STORAGE_KEY = "redjob_supabase_session";
const SUPABASE_SCHEMA_MESSAGE =
  "Falta instalar la base de datos de RedJob en Supabase. Abre Supabase > SQL Editor y ejecuta outputs/RedJob/supabase-schema.sql.";
let currentProfile = null;
let currentCandidateProfile = null;
let currentCompanyProfile = null;
let currentCompanyProfiles = [];
let activeConversationId = null;
let activeDetailJobId = null;
let activePreviewCandidate = null;
let activeReceivedCandidate = null;
const receivedCandidateProfiles = new Map();
let activeEditingJobId = null;
let activeConversationJobId = null;

const jobCategories = [
  "Tecnologia",
  "Ventas",
  "Atencion al Cliente",
  "Marketing",
  "Administracion",
  "Recursos Humanos",
  "Logistica",
  "Manufactura",
  "Salud",
  "Educacion",
  "Finanzas",
  "Operaciones",
  "Otra"
];

const mexicoStates = [
  "Todo Mexico",
  "Remoto",
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de Mexico",
  "Coahuila",
  "Colima",
  "Durango",
  "Estado de Mexico",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacan",
  "Morelos",
  "Nayarit",
  "Nuevo Leon",
  "Oaxaca",
  "Puebla",
  "Queretaro",
  "Quintana Roo",
  "San Luis Potosi",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatan",
  "Zacatecas"
];

function formatCategoryLabel(category) {
  return {
    Tecnologia: "Tecnología",
    "Atencion al Cliente": "Atención al Cliente",
    Administracion: "Administración",
    Logistica: "Logística",
    Educacion: "Educación"
  }[category] ?? category;
}

function formatLocationLabel(location) {
  return {
    "Todo Mexico": "Todo México",
    "Ciudad de Mexico": "Ciudad de México",
    "Estado de Mexico": "Estado de México",
    Michoacan: "Michoacán",
    "Nuevo Leon": "Nuevo León",
    Queretaro: "Querétaro",
    "San Luis Potosi": "San Luis Potosí",
    Yucatan: "Yucatán",
    Mexico: "México"
  }[location] ?? location;
}

function formatWorkModeLabel(mode) {
  return mode === "Hibrido" ? "Híbrido" : mode;
}

function populateMexicoStateSelects() {
  const stateSelects = [locationInput, candidateLocation, jobLocationInput];

  stateSelects.forEach((select) => {
    select.innerHTML = mexicoStates
      .map((state) => `<option value="${escapeHtml(state === "Todo Mexico" ? "" : state)}">${escapeHtml(formatLocationLabel(state))}</option>`)
      .join("");
  });

  candidateLocation.value = "Ciudad de Mexico";
  jobLocationInput.value = "Ciudad de Mexico";
}

function populateCategorySelects() {
  categoryFilter.innerHTML = [
    `<option value="all">Todas</option>`,
    ...jobCategories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(formatCategoryLabel(category))}</option>`)
  ].join("");

  jobCategoryInput.innerHTML = jobCategories
    .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(formatCategoryLabel(category))}</option>`)
    .join("");
  jobCategoryInput.value = "Tecnologia";
  renderCustomCategoryField();
}

function getSelectedJobCategory() {
  if (jobCategoryInput.value === "Otra") {
    return jobCustomCategoryInput.value.trim() || "Otra";
  }

  return jobCategoryInput.value || "Otra";
}

function renderCustomCategoryField() {
  const showCustom = jobCategoryInput.value === "Otra";
  jobCustomCategoryLabel.classList.toggle("is-hidden", !showCustom);
  if (!showCustom) jobCustomCategoryInput.value = "";
}

function getStoredSession() {
  try {
    localStorage.removeItem("redjob_resume_file");
    const session = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    if (session?.expires_at && Date.now() / 1000 > session.expires_at) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

function setStoredSession(session) {
  if (session) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }

  renderSessionStatus();
}

function clearExpiredSession(message = "Tu sesión expiró. Inicia sesión de nuevo.") {
  currentProfile = null;
  currentCandidateProfile = null;
  currentCompanyProfile = null;
  activeConversationId = null;
  activeConversationJobId = null;
  localStorage.removeItem(SESSION_STORAGE_KEY);
  renderSessionStatus();
  renderUnreadMessagesBadge(0);
  applyRoleExperience();
  signupMessage.textContent = message;
  showToast(message);
}

function isMissingSupabaseSchema(message) {
  return /schema cache|public\.profiles|could not find the table|does not exist/i.test(message);
}

function getSessionDisplayName(session) {
  return (
    session?.user?.user_metadata?.full_name ||
    session?.user?.user_metadata?.name ||
    session?.user?.email?.split("@")[0] ||
    "Tu perfil RedJob"
  );
}

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "RJ";
}

function renderResumeStatus() {
  const resumeName = currentCandidateProfile?.resume_name;
  resumeStatus.textContent = resumeName ? `Currículum listo: ${resumeName}` : "Sin currículum cargado";
}

function renderProfileHeader() {
  const session = getStoredSession();
  const fallbackName = getSessionDisplayName(session);
  const displayName = currentCandidateProfile?.full_name || currentCompanyProfile?.company_name || fallbackName;
  const targetRole = currentCandidateProfile?.target_role || "Completa tu perfil";
  const location = currentCandidateProfile?.location || currentCompanyProfile?.location || session?.user?.email || "RedJob";

  profileAvatar.textContent = getInitials(displayName);
  profileDisplayName.textContent = displayName;
  profileDisplayMeta.textContent = currentProfile?.role === "company"
    ? `${currentCompanyProfile?.industry ?? "Empresa"} - ${location}`
    : `${targetRole} - ${location}`;
  renderResumeStatus();
}

function renderSessionStatus() {
  const session = getStoredSession();
  sessionStatus.textContent = session?.user?.email ?? "Sin sesión";
  signOutButton.classList.toggle("is-hidden", !session?.access_token);
  renderHeaderAuthState();
  renderProfileHeader();
}

function renderHeaderAuthState() {
  const session = getStoredSession();
  const isSignedIn = Boolean(session?.access_token);

  headerSignInButton.classList.toggle("is-hidden", isSignedIn);
  headerCreateAccountButton.classList.toggle("is-hidden", isSignedIn);
  headerProfileButton.classList.toggle("is-hidden", !isSignedIn);
  headerSignInButton.hidden = isSignedIn;
  headerCreateAccountButton.hidden = isSignedIn;
  headerProfileButton.hidden = !isSignedIn;
  document.body.classList.toggle("is-signed-in", isSignedIn);
  document.querySelectorAll("[data-auth-create]").forEach((button) => {
    button.classList.toggle("is-hidden", isSignedIn);
    button.hidden = isSignedIn;
  });
}

function getCurrentRole() {
  return currentProfile?.role ?? document.querySelector(".role-option.active")?.dataset.role ?? "candidate";
}

function applyRoleExperience() {
  const role = getCurrentRole();
  document.body.dataset.role = role;
}

function renderCompanyHeader() {
  const name = currentCompanyProfile?.company_name || "Tu empresa";
  const description = currentCompanyProfile?.description || "Completa el perfil de empresa para publicar vacantes reales.";

  companyHeroLogo.textContent = getInitials(name);
  companyHeroName.textContent = name;
  companyHeroDescription.textContent = description;
  companyVerifiedBadge.classList.toggle("is-hidden", !currentCompanyProfile?.is_verified);
}

function isJobFeatured(job) {
  if (!job?.isFeatured) return false;
  if (!job.featuredUntil) return true;
  return new Date(job.featuredUntil).getTime() > Date.now();
}

function renderCommercialBadges(job) {
  const badges = [];
  if (isJobFeatured(job)) badges.push(`<span class="featured-badge">Destacada</span>`);
  if (job.companyVerified) badges.push(`<span class="verified-badge">Empresa verificada</span>`);
  return badges.join("");
}

function renderCompanyProfileSelect() {
  companyProfileSelect.innerHTML = currentCompanyProfiles.length
    ? currentCompanyProfiles
        .map((company) => `<option value="${escapeHtml(company.id)}">${escapeHtml(company.company_name)}</option>`)
        .join("")
    : `<option value="">Nueva empresa</option>`;

  companyProfileSelect.value = currentCompanyProfile?.id ?? "";
  renderCompanyHeader();
}

function renderCompanyJobs() {
  const companyIds = new Set(currentCompanyProfiles.map((company) => String(company.id)));
  const companyJobs = companyIds.size
    ? jobs.filter((job) => companyIds.has(String(job.companyId)))
    : [];
  companyActiveJobsCount.textContent = companyJobs.length;

  companyJobsList.innerHTML = companyJobs.length
    ? companyJobs
        .map(
          (job) => `
            <article class="company-job-row">
              <div>
                <div class="job-commercial-badges">${renderCommercialBadges(job)}</div>
                <strong>${escapeHtml(job.title)}</strong>
                <span>${escapeHtml(job.company)} - ${escapeHtml(formatLocationLabel(job.location))} - ${escapeHtml(formatWorkModeLabel(job.mode))}</span>
              </div>
              <button class="secondary-button subtle" type="button" data-edit-job="${escapeHtml(job.id)}">
                Editar
              </button>
              <button class="delete-job-button" type="button" data-delete-job="${escapeHtml(job.id)}">
                Borrar
              </button>
            </article>
          `
        )
        .join("")
    : `<p class="empty-list">Aún no hay vacantes publicadas en tus empresas.</p>`;
}

function renderHiringCompanies() {
  const companies = new Map();

  jobs.forEach((job) => {
    const key = String(job.companyId ?? job.company);
    const existing = companies.get(key);

    if (existing) {
      existing.activeJobs += 1;
      existing.isVerified ||= Boolean(job.companyVerified);
      return;
    }

    companies.set(key, {
      name: job.company,
      activeJobs: 1,
      isVerified: Boolean(job.companyVerified)
    });
  });

  const visibleCompanies = Array.from(companies.values())
    .sort((a, b) => Number(b.isVerified) - Number(a.isVerified) || b.activeJobs - a.activeJobs || a.name.localeCompare(b.name))
    .slice(0, 8);

  hiringCompaniesList.innerHTML = visibleCompanies.length
    ? visibleCompanies
        .map(
          (company) => `
            <button class="company-card" type="button" data-company-search="${escapeHtml(company.name)}">
              <span class="company-logo">${escapeHtml(getInitials(company.name))}</span>
              <span class="company-card-title">
                <strong>${escapeHtml(company.name)}</strong>
                ${company.isVerified ? '<span class="verified-badge">Verificada</span>' : ""}
              </span>
              <p>${company.activeJobs} vacante${company.activeJobs === 1 ? "" : "s"} activa${company.activeJobs === 1 ? "" : "s"}</p>
            </button>
          `
        )
        .join("")
    : `
        <article class="company-card company-card-empty">
          <span class="company-logo">RJ</span>
          <strong>Aún no hay empresas contratando</strong>
          <p>Las empresas aparecerán aquí cuando publiquen una vacante activa.</p>
        </article>
      `;
}

function sameId(left, right) {
  return String(left) === String(right);
}

function isSavedJob(jobId) {
  return Array.from(savedJobs).some((savedId) => sameId(savedId, jobId));
}

function toggleSavedJobLocal(jobId) {
  const existing = Array.from(savedJobs).find((savedId) => sameId(savedId, jobId));

  if (existing !== undefined) {
    savedJobs.delete(existing);
    return false;
  }

  savedJobs.add(jobId);
  return true;
}

async function loadSavedJobs() {
  const session = getStoredSession();
  savedJobs.clear();

  if (!session?.user?.id) {
    renderJobs();
    renderProfileActivity();
    return;
  }

  try {
    const rows = await supabaseRestRequest(`/saved_jobs?select=job_id&user_id=eq.${session.user.id}`);
    (rows ?? []).forEach((row) => savedJobs.add(row.job_id));
  } catch (error) {
    if (!isMissingSupabaseSchema(error.message) && !/Falta instalar|saved_jobs/i.test(error.message)) throw error;
  }
  renderJobs();
  renderProfileActivity();
}

async function toggleSavedJob(jobId) {
  const session = getStoredSession();
  const isSaved = isSavedJob(jobId);

  if (!session?.user?.id) {
    return toggleSavedJobLocal(jobId);
  }

  if (isSaved) {
    await supabaseRestRequest(`/saved_jobs?user_id=eq.${session.user.id}&job_id=eq.${jobId}`, { method: "DELETE" });
    savedJobs.delete(Array.from(savedJobs).find((savedId) => sameId(savedId, jobId)));
    return false;
  }

  await supabaseRestRequest("/saved_jobs?on_conflict=user_id,job_id", {
    method: "POST",
    prefer: "resolution=merge-duplicates",
    body: {
      user_id: session.user.id,
      job_id: jobId
    }
  });
  savedJobs.add(jobId);
  return true;
}

function hasApplication(jobId) {
  return applications.some((application) => sameId(application.jobId, jobId));
}

function getJobById(jobId) {
  return jobs.find((job) => sameId(job.id, jobId));
}

async function fetchJobById(jobId) {
  let rows = null;
  try {
    rows = await supabaseRestRequest(
      `/jobs?select=id,title,description,location,work_mode,category,salary_min,salary_max,is_featured,featured_priority,featured_until,promotion_source,status,company_profiles(id,user_id,company_name,description,plan,plan_status,is_verified),job_skills(skill_name)&id=eq.${jobId}&status=eq.published&limit=1`
    );
  } catch (error) {
    if (!/category|schema cache|column|Falta instalar/i.test(error.message)) throw error;
    rows = await supabaseRestRequest(
      `/jobs?select=id,title,description,location,work_mode,salary_min,salary_max,status,company_profiles(id,user_id,company_name,description),job_skills(skill_name)&id=eq.${jobId}&status=eq.published&limit=1`
    );
  }
  const mapped = mapSupabaseJob(rows?.[0]);
  if (!mapped) return null;

  const existingIndex = jobs.findIndex((job) => sameId(job.id, mapped.id));
  if (existingIndex >= 0) {
    jobs[existingIndex] = mapped;
  } else {
    jobs.unshift(mapped);
  }

  return mapped;
}

async function openJobDetail(jobId) {
  let job = getJobById(jobId);
  if (!job && /^[0-9a-f-]{36}$/i.test(String(jobId))) {
    job = await fetchJobById(jobId);
  }

  if (!job) {
    showToast("No encontramos esa vacante.");
    return;
  }

  activeDetailJobId = job.id;
  detailCompanyLogo.textContent = job.company.charAt(0);
  detailCompany.textContent = job.company;
  detailTitle.textContent = job.title;
  detailCommercialBadges.innerHTML = renderCommercialBadges(job);
  detailMeta.textContent = `${formatLocationLabel(job.location)} - ${formatWorkModeLabel(job.mode)} - ${job.salary} - ${formatCategoryLabel(job.category ?? "Otra")}`;
  detailMatch.textContent = `${safePercent(job.match)}% Compatible`;
  detailMatchBar.style.width = `${safePercent(job.match)}%`;
  detailDescription.textContent =
    job.description || "La empresa aún no agregó una descripción extensa para esta vacante.";
  detailCompanyDescription.textContent =
    job.companyDescription || "Esta empresa aún no agregó una descripción a su perfil.";
  detailRequirements.innerHTML = job.tags.length
    ? job.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")
    : `<li>Sin requisitos publicados</li>`;
  detailSaveButton.textContent = isSavedJob(job.id) ? "Guardada" : "Guardar";
  detailSaveButton.classList.toggle("active", isSavedJob(job.id));
  detailApplyButton.textContent = hasApplication(job.id) ? "Postulada" : "Postularme";
  switchView("vacante");
}

async function supabaseAuthRequest(path, body, accessToken) {
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${accessToken ?? SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = payload.msg || payload.message || payload.error_description || "No se pudo completar la solicitud.";
    if (response.status === 401 || errorMessage.toLowerCase().includes("jwt")) {
      clearExpiredSession("Tu sesión expiró. Inicia sesión de nuevo.");
    }
    throw new Error(errorMessage);
  }

  return payload;
}

async function supabaseRestRequest(path, options = {}) {
  const session = getStoredSession();
  const response = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    method: options.method ?? "GET",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${session?.access_token ?? SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      ...(options.prefer ? { Prefer: options.prefer } : {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const errorMessage = payload?.message || payload?.hint || "Supabase no pudo completar la operacion.";
    if (response.status === 401 || errorMessage.toLowerCase().includes("jwt")) {
      clearExpiredSession("Tu sesión expiró. Inicia sesión de nuevo.");
    }
    if (isMissingSupabaseSchema(errorMessage)) {
      throw new Error(SUPABASE_SCHEMA_MESSAGE);
    }
    throw new Error(errorMessage);
  }

  return payload;
}

async function supabaseStorageUpload(path, file) {
  const session = requireSession();
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/resumes/${path}`, {
    method: "PUT",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "true"
    },
    body: file
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || payload.error || "No se pudo subir el currículum.");
  }
}

async function createResumeSignedUrl(path) {
  const session = requireSession();
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/sign/resumes/${path}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ expiresIn: 300 })
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || payload.error || "No se pudo abrir el currículum.");
  }

  return `${SUPABASE_URL}/storage/v1${payload.signedURL}`;
}

function requireSession() {
  const session = getStoredSession();

  if (!session?.access_token || !session?.user?.id) {
    throw new Error("Inicia sesión para guardar datos reales.");
  }

  return session;
}

function mapWorkModeToUi(workMode) {
  return {
    remote: "Remoto",
    hybrid: "Hibrido",
    onsite: "Presencial"
  }[workMode] ?? "Remoto";
}

function mapUiModeToDb(mode) {
  return {
    Remoto: "remote",
    Hibrido: "hybrid",
    Presencial: "onsite"
  }[mode] ?? mode;
}

function formatSalary(min, max) {
  if (min && max) return `$${Number(min).toLocaleString("es-MX")} - $${Number(max).toLocaleString("es-MX")} MXN`;
  if (min) return `Desde $${Number(min).toLocaleString("es-MX")} MXN`;
  if (max) return `Hasta $${Number(max).toLocaleString("es-MX")} MXN`;
  return "Salario no publicado";
}

function formatMessageTime(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safePercent(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.max(0, Math.min(100, Math.round(number)));
}

function splitSkills(value) {
  return Array.from(new Set(value
    .split(/\r?\n|,/)
    .map((skill) => skill.trim())
    .filter(Boolean)));
}

function calculateMatch(job) {
  const candidateSkillSet = new Set(splitSkills(candidateSkills.value).map((skill) => skill.toLowerCase()));
  const jobSkills = job.tags ?? [];
  const skillHits = jobSkills.filter((skill) => candidateSkillSet.has(skill.toLowerCase())).length;
  const skillScore = jobSkills.length ? Math.round((skillHits / jobSkills.length) * 60) : 20;
  const modeScore = mapUiModeToDb(job.mode) === candidateWorkMode.value ? 20 : 8;
  const locationScore =
    job.location.toLowerCase().includes(candidateLocation.value.trim().toLowerCase()) || job.mode === "Remoto"
      ? 20
      : 8;

  return Math.min(99, skillScore + modeScore + locationScore);
}

async function loadCurrentProfile() {
  const session = getStoredSession();
  if (!session?.user?.id) return;

  const rows = await supabaseRestRequest(`/profiles?select=id,email,role&id=eq.${session.user.id}&limit=1`);
  currentProfile = rows?.[0] ?? null;

  if (!currentProfile) {
    const role = document.querySelector(".role-option.active")?.dataset.role ?? "candidate";
    const createdRows = await supabaseRestRequest("/profiles?on_conflict=id", {
      method: "POST",
      prefer: "resolution=merge-duplicates,return=representation",
      body: {
        id: session.user.id,
        email: session.user.email ?? "",
        role
      }
    });
    currentProfile = createdRows?.[0] ?? { id: session.user.id, email: session.user.email ?? "", role };
  }

  selectedRoleStatus.textContent = currentProfile?.role ?? "candidate";
  applyRoleExperience();

  if (currentProfile?.role === "candidate") {
    const candidateRows = await supabaseRestRequest(`/candidate_profiles?select=*&user_id=eq.${session.user.id}&limit=1`);
    currentCandidateProfile = candidateRows?.[0] ?? null;
    if (currentCandidateProfile) {
      hydrateCandidateForm(currentCandidateProfile);
      const skillRows = await supabaseRestRequest(
        `/candidate_skills?select=skill_name&candidate_id=eq.${currentCandidateProfile.id}&order=skill_name.asc`
      );
      candidateSkills.value = (skillRows ?? []).map((skill) => skill.skill_name).join("\n");
    } else {
      candidateFullName.value = candidateFullName.value.trim() || getSessionDisplayName(session);
      candidateTargetRole.value = candidateTargetRole.value.trim();
      candidateSummary.value = candidateSummary.value.trim();
    }
    await loadCandidateApplications();
  }

  const companyRows = await supabaseRestRequest(`/company_profiles?select=*&user_id=eq.${session.user.id}&order=created_at.asc`);
  currentCompanyProfiles = companyRows ?? [];
  currentCompanyProfile = currentCompanyProfile?.id
    ? currentCompanyProfiles.find((company) => sameId(company.id, currentCompanyProfile.id)) ?? currentCompanyProfiles[0] ?? null
    : currentCompanyProfiles[0] ?? null;

  if (currentCompanyProfile) {
    hydrateCompanyForm(currentCompanyProfile);
  } else {
    hydrateCompanyForm(null);
  }
  renderCompanyProfileSelect();
  await loadReceivedCandidates();

  renderProfileHeader();
}

async function loadReceivedCandidates() {
  const companyIds = currentCompanyProfiles.map((company) => company.id);
  if (!companyIds.length) {
    receivedCandidateProfiles.clear();
    receivedCandidatesList.innerHTML = `<p class="empty-list">Guarda tu perfil de empresa para ver candidatos.</p>`;
    companyCandidatesCount.textContent = "0";
    companyInterviewCount.textContent = "0";
    return;
  }

  try {
    const applicationsQuery =
      `/applications?select=id,status,match_score,created_at,candidate_profiles(full_name,age,target_role,location,work_mode,summary,resume_name,resume_path),jobs!inner(title,company_id,company_profiles(company_name))&jobs.company_id=in.(${companyIds.join(",")})`;
    let rows;
    try {
      rows = await supabaseRestRequest(`${applicationsQuery}&company_archived_at=is.null&order=created_at.desc`);
    } catch (error) {
      if (!/company_archived_at|schema cache|column/i.test(error.message)) throw error;
      rows = await supabaseRestRequest(`${applicationsQuery}&order=created_at.desc`);
    }

    receivedCandidateProfiles.clear();
    companyCandidatesCount.textContent = String(rows?.length ?? 0);
    companyInterviewCount.textContent = String((rows ?? []).filter((row) => row.status === "interview").length);

    receivedCandidatesList.innerHTML = rows?.length
      ? rows
          .map((application) => {
            const candidate = Array.isArray(application.candidate_profiles)
              ? application.candidate_profiles[0]
              : application.candidate_profiles;
            const job = Array.isArray(application.jobs) ? application.jobs[0] : application.jobs;
            const company = Array.isArray(job?.company_profiles) ? job.company_profiles[0] : job?.company_profiles;
            receivedCandidateProfiles.set(String(application.id), {
              candidate,
              jobTitle: job?.title ?? "Vacante",
              companyName: company?.company_name ?? "Empresa",
              status: application.status,
              matchScore: application.match_score
            });
            return `
              <article class="candidate-row-card" data-application-id="${escapeHtml(application.id)}">
                <div>
                  <strong>${escapeHtml(candidate?.full_name ?? "Candidato")}</strong>
                  <small>${escapeHtml(candidate?.target_role ?? "Perfil candidato")} - ${escapeHtml(formatLocationLabel(candidate?.location ?? "Mexico"))}${candidate?.age ? ` - ${escapeHtml(candidate.age)} años` : ""}</small>
                  <small>${escapeHtml(company?.company_name ?? "Empresa")} - ${escapeHtml(job?.title ?? "Vacante")} - ${escapeHtml(mapApplicationStatus(application.status))}${candidate?.resume_name ? ` - CV: ${escapeHtml(candidate.resume_name)}` : ""}</small>
                </div>
                <strong>${safePercent(application.match_score)}%</strong>
                <button class="secondary-button subtle candidate-profile-button" type="button" data-view-candidate="${escapeHtml(application.id)}">
                  Ver perfil
                </button>
                <button class="remove-candidate-button" type="button" data-remove-candidate="${escapeHtml(application.id)}" title="Quitar candidato de esta vacante">
                  Quitar
                </button>
                <div class="application-status-actions">
                  ${renderApplicationStatusButtons(application.id, application.status)}
                </div>
              </article>
            `;
          })
          .join("")
      : `<p class="empty-list">Aún no hay candidatos recibidos.</p>`;
  } catch (error) {
    receivedCandidatesList.innerHTML = `<p class="empty-list">No se pudieron cargar candidatos: ${escapeHtml(error.message)}</p>`;
  }
}

function openReceivedCandidateProfile(applicationId) {
  const profile = receivedCandidateProfiles.get(String(applicationId));
  if (!profile?.candidate) {
    showToast("No se pudo abrir el perfil del candidato.");
    return;
  }

  const candidate = profile.candidate;
  activeReceivedCandidate = candidate;
  receivedCandidateAvatar.textContent = getInitials(candidate.full_name ?? "Candidato");
  receivedCandidateName.textContent = candidate.full_name ?? "Candidato";
  receivedCandidateMeta.textContent = [
    candidate.target_role || "Perfil candidato",
    formatLocationLabel(candidate.location || "Mexico"),
    candidate.age ? `${candidate.age} años` : "",
    candidate.work_mode ? formatWorkModeLabel(mapWorkModeToUi(candidate.work_mode)) : ""
  ].filter(Boolean).join(" - ");
  receivedCandidateJob.textContent = `${profile.jobTitle} en ${profile.companyName}`;
  receivedCandidateApplicationStatus.textContent = `${mapApplicationStatus(profile.status)} - ${safePercent(profile.matchScore)}% de compatibilidad`;
  receivedCandidateSummary.textContent = candidate.summary || "Este candidato aún no agregó un resumen profesional.";
  receivedCandidateResume.textContent = candidate.resume_name ? `Ver currículum: ${candidate.resume_name}` : "Sin currículum disponible";
  receivedCandidateResume.disabled = !candidate.resume_path;
  candidateProfileDialog.showModal();
}

function renderApplicationStatusButtons(applicationId, status) {
  const statuses = [
    ["reviewing", "Revisar"],
    ["interview", "Entrevista"],
    ["hired", "Contratar"],
    ["rejected", "Rechazar"]
  ];

  return statuses
    .map(
      ([value, label]) => `
        <button class="status-action ${status === value ? "active" : ""}" type="button" data-application-status="${escapeHtml(value)}" data-application-id="${escapeHtml(applicationId)}">
          ${escapeHtml(label)}
        </button>
      `
    )
    .join("");
}

async function updateApplicationStatus(applicationId, nextStatus) {
  await supabaseRestRequest("/rpc/update_company_application_status", {
    method: "POST",
    prefer: "return=representation",
    body: {
      application_uuid: applicationId,
      next_status: nextStatus
    }
  });
  await loadReceivedCandidates();
}

async function removeCandidateFromJob(applicationId) {
  await supabaseRestRequest("/rpc/archive_company_application", {
    method: "POST",
    prefer: "return=representation",
    body: {
      application_uuid: applicationId
    }
  });
  await loadReceivedCandidates();
}

async function loadCandidateApplications() {
  if (!currentCandidateProfile?.id) {
    return;
  }

  const rows = await supabaseRestRequest(
    `/applications?select=id,job_id,status,match_score,created_at,jobs(title,company_profiles(company_name))&candidate_id=eq.${currentCandidateProfile.id}&order=created_at.desc`
  );

  const existingRealApplicationIds = new Set(applications.filter((application) => application.source === "supabase").map((application) => application.id));

  (rows ?? []).forEach((application) => {
    if (existingRealApplicationIds.has(application.id)) return;

    applications.unshift({
      id: application.id,
      source: "supabase",
      jobId: application.job_id,
      status: mapApplicationStatus(application.status)
    });
  });

  renderProfileActivity();
  renderJobs();
}

function mapApplicationStatus(status) {
  return {
    submitted: "Enviada",
    reviewing: "En revisión",
    interview: "En entrevista",
    rejected: "No seleccionada",
    hired: "Contratada",
    withdrawn: "Retirada"
  }[status] ?? status;
}

async function loadFirstConversation(openFirst = false) {
  const session = getStoredSession();
  if (!session?.user?.id) {
    renderUnreadMessagesBadge(0);
    return;
  }

  const rows = await supabaseRestRequest(
    "/conversations?select=id,job_id,last_message_at,jobs(title),company_profiles(company_name),candidate_profiles(full_name,age,target_role,location,summary,resume_name,resume_path)&status=eq.open&order=last_message_at.desc.nullslast,created_at.desc"
  );

  renderConversationList(rows ?? []);
  await loadUnreadMessagesCount();

  const conversation = rows?.[0];
  if (!openFirst || !conversation?.id) return;

  await openConversation(conversation.id, conversation);
}

async function loadUnreadMessagesCount() {
  const session = getStoredSession();
  if (!session?.user?.id) {
    renderUnreadMessagesBadge(0);
    return 0;
  }

  try {
    const rows = await supabaseRestRequest(`/messages?select=id&sender_user_id=neq.${session.user.id}&read_at=is.null`);
    const count = rows?.length ?? 0;
    renderUnreadMessagesBadge(count);
    return count;
  } catch (error) {
    renderUnreadMessagesBadge(0);
    return 0;
  }
}

function renderUnreadMessagesBadge(count) {
  const unreadCount = Number(count) || 0;
  unreadMessagesBadge.textContent = unreadCount > 9 ? "9+" : String(unreadCount);
  unreadMessagesBadge.classList.toggle("is-hidden", unreadCount === 0);
  unreadMessagesBadge.setAttribute("aria-label", unreadCount ? `${unreadCount} mensajes sin leer` : "Sin mensajes sin leer");
}

async function openConversation(conversationId, conversationData) {
  const conversation =
    conversationData ??
    (
      await supabaseRestRequest(
        `/conversations?select=id,job_id,last_message_at,jobs(title),company_profiles(company_name),candidate_profiles(full_name,age,target_role,location,summary,resume_name,resume_path)&id=eq.${conversationId}&limit=1`
      )
    )?.[0];

  if (!conversation?.id) return;

  activeConversationId = conversation.id;
  activeConversationJobId = conversation.job_id;
  const messages = await supabaseRestRequest(
    `/messages?select=id,body,sender_user_id,created_at,read_at&conversation_id=eq.${conversation.id}&order=created_at.asc`
  );

  await markConversationMessagesAsRead(conversation.id);
  renderChatMessages(messages ?? [], conversation);
  renderActiveConversation();
  await loadUnreadMessagesCount();
}

async function markConversationMessagesAsRead(conversationId) {
  const session = getStoredSession();
  if (!session?.user?.id || !conversationId) return;

  try {
    await supabaseRestRequest("/rpc/mark_conversation_read", {
      method: "POST",
      prefer: "return=minimal",
      body: { conversation_uuid: conversationId }
    });
  } catch (error) {
    console.warn("No se pudo marcar la conversación como leída.", error);
  }
}

function renderConversationList(conversations) {
  conversationCount.textContent = String(conversations.length);
  conversationList.innerHTML = conversations.length
    ? conversations
        .map((conversation) => {
          const company = Array.isArray(conversation.company_profiles)
            ? conversation.company_profiles[0]?.company_name
            : conversation.company_profiles?.company_name;
          const candidate = Array.isArray(conversation.candidate_profiles)
            ? conversation.candidate_profiles[0]
            : conversation.candidate_profiles;
          const jobTitle = Array.isArray(conversation.jobs) ? conversation.jobs[0]?.title : conversation.jobs?.title;
          const primaryName = candidate?.full_name || company || "Conversación";
          const secondaryLabel = candidate?.full_name ? `${company ?? "Empresa"} - ${jobTitle ?? "Vacante"}` : jobTitle ?? "Vacante";
          return `
            <button class="conversation-item ${sameId(conversation.id, activeConversationId) ? "active" : ""}" type="button" data-conversation-id="${escapeHtml(conversation.id)}">
              <span class="company-logo">${escapeHtml(getInitials(primaryName))}</span>
              <div>
                <strong>${escapeHtml(primaryName)}</strong>
                <small>${escapeHtml(secondaryLabel)}</small>
              </div>
              <em>${escapeHtml(conversation.last_message_at ? formatMessageTime(conversation.last_message_at) : "Nueva")}</em>
            </button>
          `;
        })
        .join("")
    : `<p class="empty-list">Aún no hay conversaciones reales. Se crea una al postularte.</p>`;
}

function renderActiveConversation() {
  document.querySelectorAll("[data-conversation-id]").forEach((button) => {
    button.classList.toggle("active", sameId(button.dataset.conversationId, activeConversationId));
  });
}

function renderChatMessages(messages, conversation) {
  const session = getStoredSession();
  const jobTitle = Array.isArray(conversation.jobs) ? conversation.jobs[0]?.title : conversation.jobs?.title;
  const companyName = Array.isArray(conversation.company_profiles)
    ? conversation.company_profiles[0]?.company_name
    : conversation.company_profiles?.company_name;
  const candidate = Array.isArray(conversation.candidate_profiles)
    ? conversation.candidate_profiles[0]
    : conversation.candidate_profiles;
  const isCompanyView = currentCompanyProfiles.some((company) => company.company_name === companyName);
  const chatTitle = isCompanyView ? candidate?.full_name ?? "Candidato" : companyName ?? "Empresa";
  const chatSubtitle = isCompanyView
    ? `${candidate?.target_role ?? "Perfil candidato"} - ${jobTitle ?? "Vacante"}`
    : `${jobTitle ?? "Vacante"} - conversación real`;

  document.querySelector(".chat-head .company-logo").textContent = getInitials(chatTitle);
  document.querySelector(".chat-head strong").textContent = chatTitle;
  document.querySelector(".chat-head small").textContent = chatSubtitle;
  activeConversationJobId = conversation.job_id;
  chatJobDetailButton.classList.toggle("is-hidden", !activeConversationJobId);
  renderCandidatePreview(candidate, isCompanyView);

  chatBody.innerHTML = messages.length
    ? messages
        .map((message) => {
          const isMine = sameId(message.sender_user_id, session?.user?.id);
          const senderName = isMine ? "Tu" : isCompanyView ? candidate?.full_name ?? "Candidato" : companyName ?? "Empresa";
          return `
            <article class="bubble ${isMine ? "candidate" : "company"}">
              <span>${escapeHtml(senderName)}</span>
              <p>${escapeHtml(message.body)}</p>
              ${message.created_at ? `<time datetime="${escapeHtml(message.created_at)}">${escapeHtml(formatMessageTime(message.created_at))}${isMine && message.read_at ? " - Leido" : ""}</time>` : ""}
            </article>
          `;
        })
        .join("")
    : `<article class="bubble candidate"><span>RedJob</span><p>Conversación lista. Escribe el primer mensaje.</p></article>`;
}

function renderCandidatePreview(candidate, isCompanyView) {
  if (!isCompanyView || !candidate) {
    candidatePreview.classList.add("is-hidden");
    activePreviewCandidate = null;
    return;
  }

  activePreviewCandidate = candidate;
  candidatePreview.classList.remove("is-hidden");
  candidatePreviewAvatar.textContent = getInitials(candidate.full_name ?? "Candidato");
  candidatePreviewName.textContent = candidate.full_name ?? "Candidato";
  candidatePreviewMeta.textContent = `${candidate.target_role ?? "Perfil candidato"} - ${formatLocationLabel(candidate.location ?? "Mexico")}${candidate.age ? ` - ${candidate.age} años` : ""}`;
  candidatePreviewSummary.textContent = candidate.summary || "Este candidato aún no agregó un resumen.";
  candidatePreviewResume.textContent = candidate.resume_name ? `Ver currículum: ${candidate.resume_name}` : "Sin currículum";
  candidatePreviewResume.disabled = !candidate.resume_path;
}

function hydrateCandidateForm(profile) {
  candidateFullName.value = profile.full_name ?? "";
  candidateAge.value = profile.age ?? "";
  candidateTargetRole.value = profile.target_role ?? "";
  candidateLocation.value = profile.location ?? "Ciudad de Mexico";
  candidateWorkMode.value = profile.work_mode ?? "hybrid";
  candidateSummary.value = profile.summary ?? "";
  renderProfileHeader();
}

function hydrateCompanyForm(profile) {
  companyNameInput.value = profile?.company_name ?? "";
  companyDescriptionInput.value = profile?.description ?? "";
  renderProfileHeader();
  renderCompanyHeader();
}

async function loadRealJobs() {
  try {
    let rows = null;
    try {
      rows = await supabaseRestRequest(
        "/jobs?select=id,title,description,location,work_mode,category,salary_min,salary_max,is_featured,featured_priority,featured_until,promotion_source,status,company_profiles(id,user_id,company_name,description,plan,plan_status,is_verified),job_skills(skill_name)&status=eq.published"
      );
    } catch (error) {
      if (!/category|schema cache|column|Falta instalar/i.test(error.message)) throw error;
      rows = await supabaseRestRequest(
        "/jobs?select=id,title,description,location,work_mode,salary_min,salary_max,status,company_profiles(id,user_id,company_name,description),job_skills(skill_name)&status=eq.published"
      );
    }

    const realJobs = (rows ?? []).map(mapSupabaseJob).filter(Boolean);

    jobs = realJobs;
    renderJobs();
    renderHiringCompanies();
    renderProfileActivity();
    renderCompanyJobs();
  } catch (error) {
    jobs = [];
    renderJobs();
    renderHiringCompanies();
    renderProfileActivity();
    renderCompanyJobs();
    showToast(friendlyError(error));
  }
}

function mapSupabaseJob(row) {
  if (!row?.id) return null;

  const company = Array.isArray(row.company_profiles) ? row.company_profiles[0] : row.company_profiles;
  const tags = (row.job_skills ?? []).map((skill) => skill.skill_name);
  const mappedJob = {
    id: row.id,
    source: "supabase",
    title: row.title,
    description: row.description,
    category: row.category || "Otra",
    isFeatured: Boolean(row.is_featured),
    featuredPriority: Number(row.featured_priority) || 0,
    featuredUntil: row.featured_until ?? null,
    promotionSource: row.promotion_source ?? null,
    companyId: company?.id,
    companyUserId: company?.user_id,
    company: company?.company_name ?? "Empresa",
    companyDescription: company?.description ?? "",
    companyPlan: company?.plan ?? "free",
    companyPlanStatus: company?.plan_status ?? "beta",
    companyVerified: Boolean(company?.is_verified),
    location: row.location ?? "Remoto",
    mode: mapWorkModeToUi(row.work_mode),
    salary: formatSalary(row.salary_min, row.salary_max),
    match: 0,
    tags
  };
  mappedJob.match = calculateMatch(mappedJob);
  return mappedJob;
}

async function saveCandidateProfile() {
  const session = requireSession();
  const profileRows = await supabaseRestRequest("/candidate_profiles?on_conflict=user_id", {
    method: "POST",
    prefer: "resolution=merge-duplicates,return=representation",
    body: {
      user_id: session.user.id,
      full_name: candidateFullName.value.trim(),
      age: candidateAge.value ? Number(candidateAge.value) : null,
      target_role: candidateTargetRole.value.trim(),
      location: candidateLocation.value.trim(),
      work_mode: candidateWorkMode.value,
      salary_min: 38000,
      salary_max: 48000,
      summary: candidateSummary.value.trim()
    }
  });

  currentCandidateProfile = profileRows?.[0] ?? currentCandidateProfile;
  const skills = splitSkills(candidateSkills.value);

  if (currentCandidateProfile?.id) {
    await supabaseRestRequest(`/candidate_skills?candidate_id=eq.${currentCandidateProfile.id}`, {
      method: "DELETE"
    });

    if (skills.length) {
      await supabaseRestRequest("/candidate_skills?on_conflict=candidate_id,skill_name", {
        method: "POST",
        prefer: "resolution=merge-duplicates",
        body: skills.map((skill) => ({
          candidate_id: currentCandidateProfile.id,
          skill_name: skill,
          level: "intermediate"
        }))
      });
    }
  }

  showToast("Perfil guardado correctamente.");
  await loadCurrentProfile();
  renderProfileHeader();
}

async function saveCompanyProfile() {
  const session = requireSession();
  const companyName = companyNameInput.value.trim();

  if (!companyName) {
    throw new Error("Agrega el nombre de la empresa.");
  }

  const body = {
    user_id: session.user.id,
    company_name: companyName,
    industry: "General",
    location: "Mexico",
    website: "",
    description: companyDescriptionInput.value.trim()
  };

  const rows = currentCompanyProfile?.id
    ? await supabaseRestRequest(`/company_profiles?id=eq.${currentCompanyProfile.id}`, {
        method: "PATCH",
        prefer: "return=representation",
        body
      })
    : await supabaseRestRequest("/company_profiles", {
        method: "POST",
        prefer: "return=representation",
        body
      });

  currentCompanyProfile = rows?.[0] ?? currentCompanyProfile;
  if (currentCompanyProfile && !currentCompanyProfiles.some((company) => sameId(company.id, currentCompanyProfile.id))) {
    currentCompanyProfiles.push(currentCompanyProfile);
  }
  currentCompanyProfiles = currentCompanyProfiles.map((company) =>
    sameId(company.id, currentCompanyProfile?.id) ? currentCompanyProfile : company
  );
  applyRoleExperience();
  renderProfileHeader();
  renderCompanyProfileSelect();
  return currentCompanyProfile;
}

async function publishRealJob() {
  const companyProfile = currentCompanyProfile ?? (await saveCompanyProfile());
  const jobTitle = jobTitleInput.value.trim();
  const jobDescription = jobDescriptionInput.value.trim();

  if (!jobTitle || !jobDescription) {
    throw new Error("Agrega el puesto y la descripción de la vacante.");
  }

  if (!companyProfile?.id) {
    throw new Error("Primero guarda el perfil de empresa.");
  }

  const duplicateJob = jobs.find(
    (job) =>
      sameId(job.companyId, companyProfile.id) &&
      job.title.trim().toLowerCase() === jobTitle.toLowerCase() &&
      !sameId(job.id, activeEditingJobId)
  );

  if (duplicateJob) {
    throw new Error("Ya existe una vacante con ese puesto en esta empresa.");
  }

  const jobPayload = {
    company_id: companyProfile.id,
    title: jobTitle,
    description: jobDescription,
    location: jobLocationInput.value.trim(),
    work_mode: jobWorkModeInput.value,
    category: getSelectedJobCategory(),
    salary_min: jobSalaryMinInput.value ? Number(jobSalaryMinInput.value) : null,
    salary_max: jobSalaryMaxInput.value ? Number(jobSalaryMaxInput.value) : null,
    status: "published"
  };

  const jobRows = await supabaseRestRequest(activeEditingJobId ? `/jobs?id=eq.${activeEditingJobId}` : "/jobs", {
    method: activeEditingJobId ? "PATCH" : "POST",
    prefer: "return=representation",
    body: jobPayload
  });

  const newJob = jobRows?.[0];
  const skills = splitSkills(jobSkillsInput.value);

  if (activeEditingJobId && newJob?.id) {
    await supabaseRestRequest(`/job_skills?job_id=eq.${newJob.id}`, { method: "DELETE" });
  }

  if (newJob?.id && skills.length) {
    await supabaseRestRequest("/job_skills?on_conflict=job_id,skill_name", {
      method: "POST",
      prefer: "resolution=merge-duplicates",
      body: skills.map((skill) => ({
        job_id: newJob.id,
        skill_name: skill,
        importance: "important"
      }))
    });
  }

  await loadRealJobs();
  await loadReceivedCandidates();
  showToast(activeEditingJobId ? "Vacante actualizada." : "Vacante publicada correctamente.");
  activeEditingJobId = null;
  updateJobFormMode();
  return newJob;
}

async function deleteCompanyJob(jobId) {
  const job = jobs.find((item) => sameId(item.id, jobId));
  if (!job) return;

  if (job.source === "supabase") {
    await supabaseRestRequest(`/jobs?id=eq.${job.id}`, {
      method: "DELETE"
    });
    showToast("Vacante eliminada.");
    await loadRealJobs();
    await loadReceivedCandidates();
    return;
  }

  showToast("Esta vacante no se puede eliminar.");
}

function updateJobFormMode() {
  companyJobSubmitButton.textContent = activeEditingJobId ? "Actualizar vacante" : "Publicar vacante real";
  cancelJobEditButton.classList.toggle("is-hidden", !activeEditingJobId);
}

function resetJobForm() {
  activeEditingJobId = null;
  companyJobForm.reset();
  companyNameInput.value = currentCompanyProfile?.company_name ?? "";
  companyDescriptionInput.value = currentCompanyProfile?.description ?? "";
  jobLocationInput.value = "Ciudad de Mexico";
  jobCategoryInput.value = "Tecnologia";
  renderCustomCategoryField();
  updateJobFormMode();
}

function editCompanyJob(jobId) {
  const job = getJobById(jobId);
  if (!job || job.source !== "supabase") {
    showToast("Solo puedes editar vacantes reales.");
    return;
  }

  activeEditingJobId = job.id;
  jobTitleInput.value = job.title;
  jobDescriptionInput.value = job.description ?? "";
  jobLocationInput.value = job.location ?? "Ciudad de Mexico";
  jobWorkModeInput.value = mapUiModeToDb(job.mode);
  if (jobCategories.includes(job.category)) {
    jobCategoryInput.value = job.category;
    jobCustomCategoryInput.value = "";
  } else {
    jobCategoryInput.value = "Otra";
    jobCustomCategoryInput.value = job.category ?? "";
  }
  renderCustomCategoryField();
  const salaryNumbers = job.salary.match(/\d[\d,]*/g)?.map((value) => Number(value.replace(/,/g, ""))) ?? [];
  jobSalaryMinInput.value = salaryNumbers[0] ?? "";
  jobSalaryMaxInput.value = salaryNumbers[1] ?? "";
  jobSkillsInput.value = (job.tags ?? []).join("\n");
  companyJobEditor.open = true;
  updateJobFormMode();
  companyJobEditor.scrollIntoView({ behavior: "smooth", block: "start" });
  showToast("Editando vacante.");
}

async function createRealApplication(job) {
  const session = requireSession();

  if (sameId(job.companyUserId, session.user.id)) {
    throw new Error("No puedes postularte a una vacante publicada por tu misma cuenta. Crea otra cuenta de candidato para probar el flujo completo.");
  }

  if (!currentCandidateProfile?.id) {
    await loadCurrentProfile();
  }

  if (!currentCandidateProfile?.id) {
    switchView("perfil");
    throw new Error("Guarda tu perfil candidato antes de postularte.");
  }

  let rows = null;
  try {
    rows = await supabaseRestRequest("/rpc/apply_to_job", {
      method: "POST",
      prefer: "return=representation",
      body: {
        job_uuid: job.id,
        candidate_uuid: currentCandidateProfile.id,
        match_score_value: job.match,
        cover_note_value: coverNote.value.trim() || null
      }
    });
  } catch (error) {
    if (/duplicate key|unique/i.test(error.message)) {
      throw new Error("Ya te postulaste a esta vacante. Revisa Perfil o Mensajes.");
    }
    if (/row-level security|violates row-level security/i.test(error.message)) {
    throw new Error("No fue posible enviar la postulación con esta cuenta. Intenta cerrar sesión y volver a entrar.");
    }
    throw error;
  }

  const application = Array.isArray(rows) ? rows[0] : rows;
  if (application?.id) {
    const conversations = await supabaseRestRequest(`/conversations?select=id&application_id=eq.${application.id}&limit=1`);
    activeConversationId = conversations?.[0]?.id ?? activeConversationId;
  }

  const initialMessage = coverNote.value.trim();
  if (activeConversationId && initialMessage) {
    await supabaseRestRequest("/messages", {
      method: "POST",
      prefer: "return=representation",
      body: {
        conversation_id: activeConversationId,
        sender_user_id: session.user.id,
        body: initialMessage
      }
    });
  }

  showToast("Postulación enviada correctamente.");
  await loadReceivedCandidates();
  return rows?.[0];
}

async function sendRealMessage(body) {
  const session = requireSession();

  if (!activeConversationId) {
    await loadFirstConversation(true);
  }

  if (!activeConversationId) {
    throw new Error("Aún no hay una conversación real. Postúlate a una vacante real primero.");
  }

  await supabaseRestRequest("/messages", {
    method: "POST",
    prefer: "return=representation",
    body: {
      conversation_id: activeConversationId,
      sender_user_id: session.user.id,
      body
    }
  });
}

function getAuthFormValues() {
  const email = authEmail.value.trim();
  const password = authPassword.value;
  const name = authName.value.trim();
  const role = document.querySelector(".role-option.active").dataset.role;

  if (!email || !password) {
    throw new Error("Agrega tu correo y contraseña.");
  }

  return { email, password, name, role };
}

function getSignInFormValues() {
  const email = authEmail.value.trim();
  const password = authPassword.value;

  if (!email || !password) {
    throw new Error("Agrega tu correo y contraseña.");
  }

  return { email, password };
}

async function createSupabaseAccount() {
  const { email, password, name, role } = getAuthFormValues();

  if (!name) {
    throw new Error(role === "company" ? "Agrega el nombre de la empresa." : "Agrega tu nombre completo.");
  }

  signupMessage.textContent = "Creando tu cuenta...";

  const payload = await supabaseAuthRequest("/auth/v1/signup", {
    email,
    password,
    data: { role, full_name: name }
  });

  if (payload.access_token) {
    setStoredSession(payload);
    await loadCurrentProfile();
    signupMessage.textContent = "Cuenta creada y sesión iniciada.";
  } else {
    signupMessage.textContent = "Cuenta creada. Si se requiere confirmación, revisa tu correo.";
  }

  showToast("Cuenta creada. Revisa tu correo si necesitas confirmarla.");
}

async function signInWithSupabase() {
  const { email, password } = getSignInFormValues();
  signupMessage.textContent = "Iniciando sesión...";

  const payload = await supabaseAuthRequest("/auth/v1/token?grant_type=password", {
    email,
    password
  });

  setStoredSession(payload);
  await loadCurrentProfile();
  await loadRealJobs();
  await loadSavedJobs();
  await loadFirstConversation(false);
  signupMessage.textContent = "Sesión iniciada correctamente.";
  showToast("Sesión iniciada.");
  switchView("inicio");
}

async function sendPasswordRecovery() {
  const email = authEmail.value.trim();
  if (!email) {
    throw new Error("Agrega tu correo para recuperar la contraseña.");
  }

  signupMessage.textContent = "Enviando correo de recuperacion...";
  await supabaseAuthRequest("/auth/v1/recover", {
    email,
    redirect_to: window.location.origin
  });
  signupMessage.textContent = "Te enviamos instrucciones para recuperar tu contraseña.";
  showToast("Correo de recuperacion enviado.");
}

async function signOutFromSupabase() {
  const session = getStoredSession();

  if (session?.access_token) {
    await supabaseAuthRequest("/auth/v1/logout", {}, session.access_token);
  }

  setStoredSession(null);
  currentProfile = null;
  currentCandidateProfile = null;
  currentCompanyProfile = null;
  activeConversationId = null;
  activeConversationJobId = null;
  applyRoleExperience();
  renderProfileHeader();
  renderResumeStatus();
  renderUnreadMessagesBadge(0);
  signupMessage.textContent = "Sesión cerrada.";
  showToast("Sesión cerrada.");
}

async function checkSupabaseSchema() {
  signupMessage.textContent = "Verificando el servicio...";

  const checks = [
    ["/profiles?select=id&limit=1", "profiles"],
    ["/candidate_profiles?select=id&limit=1", "candidate_profiles"],
    ["/company_profiles?select=id&limit=1", "company_profiles"],
    ["/jobs?select=id&limit=1", "jobs"],
    ["/messages?select=id&limit=1", "messages"]
  ];

  for (const [path, tableName] of checks) {
    try {
      await supabaseRestRequest(path);
    } catch (error) {
      if (isMissingSupabaseSchema(error.message)) {
        throw new Error(`El servicio de RedJob no está disponible en este momento (${tableName}).`);
      }
      throw error;
    }
  }

  signupMessage.textContent = "El servicio funciona correctamente.";
  showToast("Conexion verificada.");
}

function renderJobs() {
  const query = searchInput.value.trim().toLowerCase();
  const location = locationInput.value.trim().toLowerCase();
  const mode = modeFilter.value;
  const category = categoryFilter.value;

  const filteredJobs = jobs
    .filter((job) => {
      const searchable = `${job.title} ${job.company} ${job.category ?? ""} ${job.tags.join(" ")}`.toLowerCase();
      const jobLocation = `${job.location} ${job.mode}`.toLowerCase();
      const matchesQuery = !query || searchable.includes(query);
      const matchesLocation = !location || jobLocation.includes(location);
      const matchesMode = mode === "all" || job.mode === mode;
      const matchesCategory = category === "all" || job.category === category;

      return matchesQuery && matchesLocation && matchesMode && matchesCategory;
    })
    .sort((a, b) => {
      const featuredDifference = Number(isJobFeatured(b)) - Number(isJobFeatured(a));
      if (featuredDifference) return featuredDifference;
      const priorityDifference = (b.featuredPriority ?? 0) - (a.featuredPriority ?? 0);
      if (priorityDifference) return priorityDifference;
      return b.match - a.match;
    });

  resultCount.textContent = `${filteredJobs.length} resultado${filteredJobs.length === 1 ? "" : "s"}`;

  jobsList.innerHTML = filteredJobs
    .map(
      (job) => `
        <article class="job-card">
          <div class="job-card-top">
            <div>
              <div class="job-commercial-badges">${renderCommercialBadges(job)}</div>
              <h3>${escapeHtml(job.title)}</h3>
              <div class="job-meta">
                <span>${escapeHtml(formatCategoryLabel(job.category ?? "Otra"))}</span>
                <span>${escapeHtml(job.company)}</span>
                <span>${escapeHtml(formatLocationLabel(job.location))}</span>
                <span>${escapeHtml(job.salary)}</span>
                <span>${escapeHtml(formatWorkModeLabel(job.mode))}</span>
              </div>
            </div>
            <span class="company-logo">${escapeHtml(job.company.charAt(0))}</span>
          </div>
          <div class="tags">
            ${job.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
          </div>
          <div class="match-block">
            <div class="match-label">
              <span>Compatibilidad</span>
              <strong>${safePercent(job.match)}% Compatible</strong>
            </div>
            <div class="match-bar">
              <span style="width: ${safePercent(job.match)}%"></span>
            </div>
          </div>
          <div class="job-actions">
            <button class="secondary-button subtle" type="button" data-view-job="${escapeHtml(job.id)}">
              Ver detalle
            </button>
            <button class="save-button ${isSavedJob(job.id) ? "active" : ""}" type="button" data-save-job="${escapeHtml(job.id)}">
              ${isSavedJob(job.id) ? "Guardada" : "Guardar"}
            </button>
            <button class="primary-button" type="button" data-apply-job="${escapeHtml(job.id)}">
              ${hasApplication(job.id) ? "Postulada" : "Postularme"}
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderProfileActivity() {
  savedCount.textContent = savedJobs.size;
  applicationCount.textContent = applications.length;

  const savedItems = jobs.filter((job) => isSavedJob(job.id));
  savedJobsList.innerHTML = savedItems.length
    ? savedItems
        .map(
          (job) => `
            <div>
              <strong>${escapeHtml(job.title)}</strong>
              <span>${escapeHtml(job.company)}</span>
            </div>
          `
        )
        .join("")
    : `<p class="empty-list">Aún no tienes vacantes guardadas.</p>`;

  applicationsList.innerHTML = applications.length
    ? applications
        .map((application) => {
          const job = jobs.find((item) => sameId(item.id, application.jobId));
          if (!job) {
            return `
              <div>
                <strong>Vacante</strong>
                <span>${escapeHtml(application.status)}</span>
              </div>
            `;
          }
          return `
            <div>
              <strong>${escapeHtml(job.title)}</strong>
              <span>${escapeHtml(application.status)}</span>
            </div>
          `;
        })
        .join("")
    : `<p class="empty-list">Aún no has enviado postulaciones.</p>`;
}

function showToast(message) {
  const visibleMessage = /supabase|schema cache|database|relation|column/i.test(String(message))
    ? friendlyError({ message: String(message) })
    : String(message);
  window.clearTimeout(toastTimer);
  toast.textContent = visibleMessage;
  toast.classList.add("visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2600);
}

function friendlyError(error) {
  const message = error?.message ?? "No se pudo completar la acción.";

  if (/duplicate key|unique/i.test(message)) return "Ese registro ya existe.";
  if (/row-level security|violates row-level security/i.test(message)) return "No tienes permiso para hacer esta acción con esta cuenta.";
  if (/failed to fetch|network/i.test(message)) return "No se pudo conectar. Revisa tu internet e intenta de nuevo.";
  if (/supabase|schema cache|database|relation|column/i.test(message)) return "No pudimos completar la acción. Intenta de nuevo más tarde.";
  if (/jwt/i.test(message)) return "Tu sesión expiró. Inicia sesión de nuevo.";
  if (/not found|404/i.test(message)) return "No encontramos ese recurso.";

  return message;
}

async function withButtonLoading(button, loadingText, action) {
  const originalText = button?.textContent;
  if (button) {
    button.disabled = true;
    button.textContent = loadingText;
  }

  try {
    return await action();
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

function openApplicationDialog(job) {
  if (!getStoredSession()?.access_token) {
    showToast("Inicia sesión para postularte.");
    switchView("acceso");
    return;
  }

  activeApplicationJob = job;
  applicationJobTitle.textContent = job.title;
  applicationJobMeta.textContent = `${job.company} - ${formatLocationLabel(job.location)} - ${formatWorkModeLabel(job.mode)}`;
  coverNote.value = "";
  applicationDialog.showModal();
}

function switchView(viewId) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active-view", view.id === viewId);
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.viewLink === viewId);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (viewId === "mensajes" && getStoredSession()?.access_token) {
    loadFirstConversation(true).catch((error) => showToast(`Mensajes: ${error.message}`));
  }
}

document.querySelectorAll("[data-view-link]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    switchView(trigger.dataset.viewLink);
  });
});

hiringCompaniesList.addEventListener("click", (event) => {
  const companyButton = event.target.closest("[data-company-search]");
  if (!companyButton) return;

  searchInput.value = companyButton.dataset.companySearch;
  locationInput.value = "";
  modeFilter.value = "all";
  categoryFilter.value = "all";
  renderJobs();
  document.querySelector("#jobSearch").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelectorAll("[data-scroll-target]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    switchView("inicio");
    const target = document.querySelector(`#${trigger.dataset.scrollTarget}`);
    window.setTimeout(() => {
      if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  });
});

document.querySelector(".job-search").addEventListener("submit", (event) => {
  event.preventDefault();
  renderJobs();
  document.querySelector(".jobs-grid").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelectorAll("[data-category-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    categoryFilter.value = button.dataset.categoryFilter;
    renderJobs();
    document.querySelector(".jobs-grid").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

categoryFilter.addEventListener("change", renderJobs);
jobCategoryInput.addEventListener("change", renderCustomCategoryField);

jobsList.addEventListener("click", async (event) => {
  const saveButton = event.target.closest("[data-save-job]");
  const applyButton = event.target.closest("[data-apply-job]");
  const viewButton = event.target.closest("[data-view-job]");

  if (viewButton) {
    try {
      await openJobDetail(viewButton.dataset.viewJob);
    } catch (error) {
      showToast(friendlyError(error));
    }
    return;
  }

  if (saveButton) {
    const jobId = saveButton.dataset.saveJob;
    const job = jobs.find((item) => sameId(item.id, jobId));

    if (!job) return;

    let saved = false;
    try {
      saved = await toggleSavedJob(jobId);
    } catch (error) {
      showToast(friendlyError(error));
      return;
    }

    if (saved) {
      showToast(`Vacante guardada: ${job.title}`);
    } else {
      showToast(`Vacante removida: ${job.title}`);
    }

    renderJobs();
    renderProfileActivity();
  }

  if (applyButton) {
    const jobId = applyButton.dataset.applyJob;
    const job = jobs.find((item) => sameId(item.id, jobId));
    const alreadyApplied = hasApplication(jobId);

    if (!job) return;

    if (alreadyApplied) {
      showToast("Ya enviaste una postulación para esta vacante.");
      return;
    }

    openApplicationDialog(job);
  }
});

detailSaveButton.addEventListener("click", async () => {
  if (!activeDetailJobId) return;

  let saved = false;
  try {
    saved = await toggleSavedJob(activeDetailJobId);
  } catch (error) {
    showToast(friendlyError(error));
    return;
  }
  detailSaveButton.textContent = saved ? "Guardada" : "Guardar";
  detailSaveButton.classList.toggle("active", saved);
  renderJobs();
  renderProfileActivity();
  showToast(saved ? "Vacante guardada." : "Vacante removida.");
});

detailApplyButton.addEventListener("click", () => {
  const job = getJobById(activeDetailJobId);
  if (!job) return;

  if (hasApplication(job.id)) {
    showToast("Ya enviaste una postulación para esta vacante.");
    return;
  }

  openApplicationDialog(job);
});

[searchInput, locationInput, modeFilter].forEach((control) => {
  control.addEventListener("input", renderJobs);
  control.addEventListener("change", renderJobs);
});

document.querySelectorAll(".role-option").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".role-option").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const isCompany = button.dataset.role === "company";
    accountNameLabel.firstChild.textContent = isCompany ? "Nombre de empresa" : "Nombre completo";
    accountNameLabel.querySelector("input").placeholder = isCompany ? "Nombre de tu empresa" : "Nombre completo";
    selectedRoleStatus.textContent = button.dataset.role;
    applyRoleExperience();
    signupMessage.textContent = isCompany
      ? "Cuenta empresa lista para registrarse en Supabase."
      : "Cuenta candidato lista para registrarse en Supabase.";
  });
});

document.querySelector("#simulateSignup").addEventListener("click", async () => {
  try {
    await createSupabaseAccount();
  } catch (error) {
    signupMessage.textContent = friendlyError(error);
    showToast(friendlyError(error));
  }
});

signInButton.addEventListener("click", async () => {
  try {
    await signInWithSupabase();
  } catch (error) {
    signupMessage.textContent = friendlyError(error);
    showToast(friendlyError(error));
  }
});

forgotPasswordButton.addEventListener("click", async () => {
  try {
    await sendPasswordRecovery();
  } catch (error) {
    signupMessage.textContent = friendlyError(error);
    showToast(friendlyError(error));
  }
});

signOutButton.addEventListener("click", async () => {
  try {
    await signOutFromSupabase();
  } catch (error) {
    signupMessage.textContent = friendlyError(error);
    showToast(friendlyError(error));
  }
});

profileSignOutButton.addEventListener("click", async () => {
  try {
    await signOutFromSupabase();
    switchView("inicio");
  } catch (error) {
    showToast(error.message);
  }
});

companyJobsList.addEventListener("click", async (event) => {
  const deleteButton = event.target.closest("[data-delete-job]");
  const editButton = event.target.closest("[data-edit-job]");

  if (editButton) {
    editCompanyJob(editButton.dataset.editJob);
    return;
  }

  if (!deleteButton) return;

  if (!window.confirm("¿Seguro que quieres borrar esta vacante? Esta acción no se puede deshacer.")) {
    return;
  }

  try {
    await deleteCompanyJob(deleteButton.dataset.deleteJob);
  } catch (error) {
    showToast(friendlyError(error));
  }
});

receivedCandidatesList.addEventListener("click", async (event) => {
  const profileButton = event.target.closest("[data-view-candidate]");
  if (profileButton) {
    openReceivedCandidateProfile(profileButton.dataset.viewCandidate);
    return;
  }

  const removeButton = event.target.closest("[data-remove-candidate]");
  if (removeButton) {
    if (!window.confirm("¿Quieres quitar a este candidato de la vacante? Su postulación y conversación se conservarán.")) {
      return;
    }

    removeButton.disabled = true;
    try {
      await removeCandidateFromJob(removeButton.dataset.removeCandidate);
      showToast("Candidato retirado de esta lista.");
    } catch (error) {
      showToast(friendlyError(error));
      removeButton.disabled = false;
    }
    return;
  }

  const statusButton = event.target.closest("[data-application-status]");
  if (!statusButton) return;

  statusButton.disabled = true;
  try {
    await updateApplicationStatus(statusButton.dataset.applicationId, statusButton.dataset.applicationStatus);
    showToast("Estado de postulación actualizado.");
  } catch (error) {
    showToast(friendlyError(error));
  } finally {
    statusButton.disabled = false;
  }
});

document.querySelector("#closeCandidateProfileDialog").addEventListener("click", () => {
  candidateProfileDialog.close();
});

receivedCandidateResume.addEventListener("click", async () => {
  try {
    if (!activeReceivedCandidate?.resume_path) {
      showToast("Este candidato aún no subió su currículum.");
      return;
    }

    const signedUrl = await createResumeSignedUrl(activeReceivedCandidate.resume_path);
    window.open(signedUrl, "_blank", "noopener");
  } catch (error) {
    showToast(friendlyError(error));
  }
});

companyProfileSelect.addEventListener("change", async () => {
  currentCompanyProfile =
    currentCompanyProfiles.find((company) => sameId(company.id, companyProfileSelect.value)) ?? null;
  hydrateCompanyForm(currentCompanyProfile);
  activeEditingJobId = null;
  updateJobFormMode();
  renderCompanyJobs();
  await loadReceivedCandidates();
});

newCompanyButton.addEventListener("click", () => {
  currentCompanyProfile = null;
  activeEditingJobId = null;
  companyProfileSelect.value = "";
  hydrateCompanyForm(null);
  renderCompanyProfileSelect();
  renderCompanyJobs();
  updateJobFormMode();
  loadReceivedCandidates().catch((error) => showToast(friendlyError(error)));
  showToast("Formulario listo para crear otra empresa.");
});

deleteCompanyButton.addEventListener("click", async () => {
  if (!currentCompanyProfile?.id) {
    showToast("Selecciona una empresa para eliminar.");
    return;
  }

  if (!window.confirm("¿Seguro que quieres eliminar esta empresa y sus vacantes? Esta acción no se puede deshacer.")) {
    return;
  }

  try {
    await supabaseRestRequest(`/company_profiles?id=eq.${currentCompanyProfile.id}`, { method: "DELETE" });
    currentCompanyProfiles = currentCompanyProfiles.filter((company) => !sameId(company.id, currentCompanyProfile.id));
    currentCompanyProfile = currentCompanyProfiles[0] ?? null;
    hydrateCompanyForm(currentCompanyProfile);
    renderCompanyProfileSelect();
    await loadRealJobs();
    await loadReceivedCandidates();
    showToast("Empresa eliminada.");
  } catch (error) {
    showToast(friendlyError(error));
  }
});

cancelJobEditButton.addEventListener("click", () => {
  resetJobForm();
  companyJobEditor.open = false;
  showToast("Edición cancelada.");
});

conversationList.addEventListener("click", async (event) => {
  const conversationButton = event.target.closest("[data-conversation-id]");
  if (!conversationButton) return;

  try {
    await openConversation(conversationButton.dataset.conversationId);
  } catch (error) {
    showToast(error.message);
  }
});

candidatePreviewResume.addEventListener("click", async () => {
  try {
    if (!activePreviewCandidate?.resume_path) {
      showToast("Este candidato aún no subió su currículum.");
      return;
    }

    const signedUrl = await createResumeSignedUrl(activePreviewCandidate.resume_path);
    window.open(signedUrl, "_blank", "noopener");
  } catch (error) {
    showToast(error.message);
  }
});

chatJobDetailButton.addEventListener("click", async () => {
  if (!activeConversationJobId) {
    showToast("Selecciona una conversación con vacante.");
    return;
  }

  try {
    await openJobDetail(activeConversationJobId);
  } catch (error) {
    showToast(friendlyError(error));
  }
});

resumeButton.addEventListener("click", () => {
  resumeInput.click();
});

resumeInput.addEventListener("change", async () => {
  const file = resumeInput.files?.[0];
  if (!file) return;

  try {
    if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)) {
      throw new Error("Sube un archivo PDF, DOC o DOCX.");
    }

    if (file.size > 8 * 1024 * 1024) {
      throw new Error("El currículum debe pesar menos de 8 MB.");
    }

    if (!currentCandidateProfile?.id) {
      await saveCandidateProfile();
    }

    const session = requireSession();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const resumePath = `${session.user.id}/${Date.now()}-${safeName}`;

    resumeStatus.textContent = "Subiendo currículum...";
    await supabaseStorageUpload(resumePath, file);

    const rows = await supabaseRestRequest(`/candidate_profiles?id=eq.${currentCandidateProfile.id}`, {
      method: "PATCH",
      prefer: "return=representation",
      body: {
        resume_path: resumePath,
        resume_name: file.name
      }
    });

    currentCandidateProfile = rows?.[0] ?? currentCandidateProfile;
    renderResumeStatus();
    showToast("Currículum subido correctamente.");
  } catch (error) {
    renderResumeStatus();
    showToast(error.message);
  }
});

document.querySelector("#closeApplicationDialog").addEventListener("click", () => {
  applicationDialog.close();
});

document.querySelector("#confirmApplication").addEventListener("click", async () => {
  if (!activeApplicationJob) return;

  try {
    let realApplication = null;
    if (activeApplicationJob.source === "supabase") {
      realApplication = await createRealApplication(activeApplicationJob);
      await loadFirstConversation(true);
    }

    applications.unshift({
      id: realApplication?.id,
      source: "supabase",
      jobId: activeApplicationJob.id,
      status: activeApplicationJob.source === "supabase" ? "Enviada" : "Enviada"
    });

    applicationDialog.close();
    renderJobs();
    renderProfileActivity();
    if (activeDetailJobId) await openJobDetail(activeApplicationJob.id);
    showToast(`Postulación enviada a ${activeApplicationJob.company}.`);
    activeApplicationJob = null;
  } catch (error) {
    showToast(error.message);
  }
});

document.querySelector("#messageForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const input = document.querySelector("#messageInput");
  const message = input.value.trim();
  if (!message) return;

  try {
    if (!getStoredSession()?.access_token) {
      switchView("acceso");
      showToast("Inicia sesión para enviar mensajes.");
      return;
    }

    if (!activeConversationId) {
      await loadFirstConversation(true);
    }

    if (activeConversationId) {
      await sendRealMessage(message);
      await loadFirstConversation(false);
      await openConversation(activeConversationId);
      showToast("Mensaje enviado.");
    } else {
      showToast("Primero necesitas una conversación real. Se crea al postularte a una vacante real.");
    }
    input.value = "";
  } catch (error) {
    showToast(error.message);
  }
});

candidateProfileForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await withButtonLoading(candidateProfileForm.querySelector("button[type='submit']"), "Guardando...", async () => {
      await saveCandidateProfile();
      await loadRealJobs();
    });
  } catch (error) {
    showToast(friendlyError(error));
  }
});

companyJobForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const publishedJob = await withButtonLoading(
      companyJobSubmitButton,
      activeEditingJobId ? "Actualizando..." : "Publicando...",
      publishRealJob
    );
    resetJobForm();
    if (publishedJob?.title) {
      searchInput.value = "";
      locationInput.value = "";
      modeFilter.value = "all";
      categoryFilter.value = "all";
      renderJobs();
      await openJobDetail(publishedJob.id);
    }
  } catch (error) {
    showToast(friendlyError(error));
  }
});

populateMexicoStateSelects();
populateCategorySelects();
renderJobs();
renderHiringCompanies();
renderProfileActivity();
renderSessionStatus();
renderCompanyJobs();
applyRoleExperience();
loadCurrentProfile()
  .then(loadRealJobs)
  .then(loadSavedJobs)
  .then(() => loadFirstConversation(false))
  .then(loadReceivedCandidates)
  .catch((error) => showToast(friendlyError(error)));
