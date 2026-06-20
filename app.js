let jobs = [];

const jobsList = document.querySelector("#jobsList");
const hiringCompaniesList = document.querySelector("#hiringCompaniesList");
const resultCount = document.querySelector("#resultCount");
const searchInput = document.querySelector("#searchInput");
const locationInput = document.querySelector("#locationInput");
const locationCityInput = document.querySelector("#locationCityInput");
const modeFilter = document.querySelector("#modeFilter");
const categoryFilter = document.querySelector("#categoryFilter");
const signupMessage = document.querySelector("#signupMessage");
const accountNameLabel = document.querySelector("#accountNameLabel");
const authEmail = document.querySelector("#authEmail");
const authPassword = document.querySelector("#authPassword");
const signupEmail = document.querySelector("#signupEmail");
const signupPassword = document.querySelector("#signupPassword");
const authName = document.querySelector("#authName");
const legalConsent = document.querySelector("#legalConsent");
const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");
const forgotPasswordButton = document.querySelector("#forgotPasswordButton");
const signInPanel = document.querySelector("#signInPanel");
const createAccountPanel = document.querySelector("#createAccountPanel");
const sessionStatus = document.querySelector("#sessionStatus");
const selectedRoleStatus = document.querySelector("#selectedRoleStatus");
const headerSignInButton = document.querySelector("#headerSignInButton");
const headerCreateAccountButton = document.querySelector("#headerCreateAccountButton");
const headerProfileButton = document.querySelector("#headerProfileButton");
const adminNavLink = document.querySelector("#adminNavLink");
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
const profileMessagesCount = document.querySelector("#profileMessagesCount");
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
const candidateCity = document.querySelector("#candidateCity");
const candidateWorkMode = document.querySelector("#candidateWorkMode");
const candidateSkills = document.querySelector("#candidateSkills");
const candidateSummary = document.querySelector("#candidateSummary");
const companyJobEditor = document.querySelector("#companyJobEditor");
const companyJobForm = document.querySelector("#companyJobForm");
const companyNameInput = document.querySelector("#companyNameInput");
const companyDescriptionInput = document.querySelector("#companyDescriptionInput");
const companyLogoButton = document.querySelector("#companyLogoButton");
const companyLogoInput = document.querySelector("#companyLogoInput");
const companyLogoStatus = document.querySelector("#companyLogoStatus");
const jobTitleInput = document.querySelector("#jobTitleInput");
const jobDescriptionInput = document.querySelector("#jobDescriptionInput");
const jobLocationInput = document.querySelector("#jobLocationInput");
const jobCityInput = document.querySelector("#jobCityInput");
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
const detailCompanyRatingSummary = document.querySelector("#detailCompanyRatingSummary");
const detailCompanyRatingActions = document.querySelector("#detailCompanyRatingActions");
const detailRequirements = document.querySelector("#detailRequirements");
const detailSaveButton = document.querySelector("#detailSaveButton");
const detailApplyButton = document.querySelector("#detailApplyButton");
const detailReportButton = document.querySelector("#detailReportButton");
const adminRefreshButton = document.querySelector("#adminRefreshButton");
const adminUsersCount = document.querySelector("#adminUsersCount");
const adminJobsCount = document.querySelector("#adminJobsCount");
const adminCompaniesCount = document.querySelector("#adminCompaniesCount");
const adminApplicationsCount = document.querySelector("#adminApplicationsCount");
const adminReportsCount = document.querySelector("#adminReportsCount");
const adminReportsList = document.querySelector("#adminReportsList");
const adminJobsList = document.querySelector("#adminJobsList");
const adminUsersList = document.querySelector("#adminUsersList");
const adminCompaniesList = document.querySelector("#adminCompaniesList");
const adminReportsSearch = document.querySelector("#adminReportsSearch");
const adminJobsSearch = document.querySelector("#adminJobsSearch");
const adminUsersSearch = document.querySelector("#adminUsersSearch");
const adminCompaniesSearch = document.querySelector("#adminCompaniesSearch");
const adminReportsEmpty = document.querySelector("#adminReportsEmpty");
const adminJobsEmpty = document.querySelector("#adminJobsEmpty");
const adminUsersEmpty = document.querySelector("#adminUsersEmpty");
const adminCompaniesEmpty = document.querySelector("#adminCompaniesEmpty");
const reportDialog = document.querySelector("#reportDialog");
const reportForm = document.querySelector("#reportForm");
const reportCategory = document.querySelector("#reportCategory");
const reportSubject = document.querySelector("#reportSubject");
const reportDescription = document.querySelector("#reportDescription");
const submitReportButton = document.querySelector("#submitReportButton");
const openReportDialogButton = document.querySelector("#openReportDialog");
const installAppButton = document.querySelector("#installAppButton");

const savedJobs = new Set();
const applications = [];
const companyRatingSummary = new Map();
const ownCompanyRatings = new Map();
let activeApplicationJob = null;
let toastTimer = null;
let deferredInstallPrompt = null;
const isIosDevice =
  /iphone|ipad|ipod/i.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

const runtimeConfig = window.REDJOB_CONFIG ?? {};
const SUPABASE_URL = String(runtimeConfig.NEXT_PUBLIC_SUPABASE_URL ?? runtimeConfig.SUPABASE_URL ?? "")
  .trim()
  .replace(/\/$/, "");
const SUPABASE_ANON_KEY = String(runtimeConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? runtimeConfig.SUPABASE_ANON_KEY ?? "").trim();
window.REDJOB_CONFIG = {
  ...runtimeConfig,
  NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: SUPABASE_ANON_KEY
};
const SESSION_STORAGE_KEY = "redjob_supabase_session";
const LEGAL_TERMS_VERSION = "Junio 2026";
const LEGAL_PRIVACY_VERSION = "Junio 2026";
const SUPABASE_SCHEMA_MESSAGE =
  "Falta instalar la base de datos de RedJob en Supabase. Abre Supabase > SQL Editor y ejecuta outputs/RedJob/supabase-schema.sql.";
const SUPABASE_CONFIG_MESSAGE =
  "Falta configurar Supabase. Copia config.example.js como config.js y agrega la URL y la llave anon de tu proyecto.";
let currentProfile = null;
let currentUserRoles = [];
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
let activeReportTarget = null;

function isCurrentAdmin() {
  return currentUserRoles.includes("admin");
}

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

const mexicoCitiesByState = {
  Aguascalientes: ["Aguascalientes", "Calvillo", "Jesús María", "Pabellón de Arteaga", "Rincón de Romos"],
  "Baja California": ["Tijuana", "Mexicali", "Ensenada", "Tecate", "Rosarito", "San Quintín"],
  "Baja California Sur": ["La Paz", "Cabo San Lucas", "San José del Cabo", "Ciudad Constitución", "Loreto"],
  Campeche: ["Campeche", "Ciudad del Carmen", "Champotón", "Escárcega", "Calkiní"],
  Chiapas: ["Tuxtla Gutiérrez", "Tapachula", "San Cristóbal de las Casas", "Comitán", "Palenque", "Tonalá"],
  Chihuahua: ["Chihuahua", "Ciudad Juárez", "Cuauhtémoc", "Delicias", "Hidalgo del Parral", "Nuevo Casas Grandes"],
  "Ciudad de Mexico": ["Álvaro Obregón", "Azcapotzalco", "Benito Juárez", "Coyoacán", "Cuajimalpa", "Cuauhtémoc", "Gustavo A. Madero", "Iztacalco", "Iztapalapa", "Miguel Hidalgo", "Tlalpan", "Xochimilco"],
  Coahuila: ["Saltillo", "Torreón", "Monclova", "Piedras Negras", "Acuña", "Sabinas"],
  Colima: ["Colima", "Manzanillo", "Villa de Álvarez", "Tecomán", "Armería"],
  Durango: ["Durango", "Gómez Palacio", "Lerdo", "Santiago Papasquiaro", "Pueblo Nuevo"],
  "Estado de Mexico": ["Toluca", "Ecatepec", "Naucalpan", "Tlalnepantla", "Nezahualcóyotl", "Metepec", "Cuautitlán Izcalli", "Atizapán de Zaragoza", "Texcoco", "Chalco"],
  Guanajuato: ["León", "Irapuato", "Celaya", "Guanajuato", "Salamanca", "San Miguel de Allende", "Silao"],
  Guerrero: ["Acapulco", "Chilpancingo", "Iguala", "Zihuatanejo", "Taxco", "Tlapa"],
  Hidalgo: ["Pachuca", "Tulancingo", "Tula de Allende", "Mineral de la Reforma", "Huejutla", "Ixmiquilpan"],
  Jalisco: ["Guadalajara", "Zapopan", "Tlaquepaque", "Tonalá", "Puerto Vallarta", "Tlajomulco", "Lagos de Moreno", "Tepatitlán"],
  Michoacan: ["Morelia", "Uruapan", "Zamora", "Lázaro Cárdenas", "Pátzcuaro", "La Piedad", "Zitácuaro"],
  Morelos: ["Cuernavaca", "Jiutepec", "Cuautla", "Temixco", "Yautepec", "Jojutla"],
  Nayarit: ["Tepic", "Bahía de Banderas", "Santiago Ixcuintla", "Compostela", "Ixtlán del Río"],
  "Nuevo Leon": ["Monterrey", "Guadalupe", "San Nicolás de los Garza", "Apodaca", "Escobedo", "Santa Catarina", "San Pedro Garza García"],
  Oaxaca: ["Oaxaca de Juárez", "Salina Cruz", "Juchitán", "Tuxtepec", "Huajuapan de León", "Puerto Escondido"],
  Puebla: ["Puebla", "Tehuacán", "San Martín Texmelucan", "Atlixco", "Cholula", "Teziutlán"],
  Queretaro: ["Querétaro", "San Juan del Río", "El Marqués", "Corregidora", "Tequisquiapan"],
  "Quintana Roo": ["Cancún", "Playa del Carmen", "Chetumal", "Tulum", "Cozumel", "Bacalar"],
  "San Luis Potosi": ["San Luis Potosí", "Soledad de Graciano Sánchez", "Ciudad Valles", "Matehuala", "Rioverde"],
  Sinaloa: ["Culiacán", "Mazatlán", "Los Mochis", "Guasave", "Guamúchil"],
  Sonora: ["Hermosillo", "Ciudad Obregón", "Nogales", "San Luis Río Colorado", "Guaymas", "Navojoa"],
  Tabasco: ["Villahermosa", "Cárdenas", "Comalcalco", "Macuspana", "Paraíso"],
  Tamaulipas: ["Reynosa", "Matamoros", "Nuevo Laredo", "Tampico", "Ciudad Victoria", "Ciudad Madero", "Altamira"],
  Tlaxcala: ["Tlaxcala", "Apizaco", "Huamantla", "Chiautempan", "Calpulalpan"],
  Veracruz: ["Veracruz", "Xalapa", "Coatzacoalcos", "Córdoba", "Orizaba", "Poza Rica", "Boca del Río", "Tuxpan"],
  Yucatan: ["Mérida", "Valladolid", "Tizimín", "Progreso", "Umán"],
  Zacatecas: ["Zacatecas", "Guadalupe", "Fresnillo", "Jerez", "Río Grande"]
};

const mexicoStateCodes = {
  Aguascalientes: "01",
  "Baja California": "02",
  "Baja California Sur": "03",
  Campeche: "04",
  Coahuila: "05",
  Colima: "06",
  Chiapas: "07",
  Chihuahua: "08",
  "Ciudad de Mexico": "09",
  Durango: "10",
  Guanajuato: "11",
  Guerrero: "12",
  Hidalgo: "13",
  Jalisco: "14",
  "Estado de Mexico": "15",
  Michoacan: "16",
  Morelos: "17",
  Nayarit: "18",
  "Nuevo Leon": "19",
  Oaxaca: "20",
  Puebla: "21",
  Queretaro: "22",
  "Quintana Roo": "23",
  "San Luis Potosi": "24",
  Sinaloa: "25",
  Sonora: "26",
  Tabasco: "27",
  Tamaulipas: "28",
  Tlaxcala: "29",
  Veracruz: "30",
  Yucatan: "31",
  Zacatecas: "32"
};

const municipalityCache = new Map();

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

function cityOptionsForState(state, includeAll = false) {
  if (!state || state === "Todo Mexico") {
    return includeAll ? [{ value: "", label: "Todos los municipios" }] : [];
  }
  if (state === "Remoto") return [{ value: "", label: "No aplica" }];

  const cities = mexicoCitiesByState[state] ?? [];
  return [
    { value: "", label: includeAll ? "Todos los municipios" : "Selecciona un municipio" },
    ...cities.map((city) => ({ value: city, label: city }))
  ];
}

function renderMunicipalityOptions(select, municipalities, includeAll, selectedCity = "") {
  const availableMunicipalities =
    selectedCity && !municipalities.includes(selectedCity)
      ? [selectedCity, ...municipalities]
      : municipalities;
  const municipalityOptions = [
    { value: "", label: includeAll ? "Todos los municipios" : "Selecciona un municipio" },
    ...availableMunicipalities.map((municipality) => ({ value: municipality, label: municipality }))
  ];
  select.innerHTML = municipalityOptions
    .map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`)
    .join("");
  if (selectedCity && municipalityOptions.some((option) => option.value === selectedCity)) {
    select.value = selectedCity;
  }
}

async function loadMunicipalities(state) {
  if (municipalityCache.has(state)) return municipalityCache.get(state);
  const stateCode = mexicoStateCodes[state];
  if (!stateCode) return mexicoCitiesByState[state] ?? [];

  const response = await fetch(`https://gaia.inegi.org.mx/wscatgeo/v2/mgem/${stateCode}`);
  if (!response.ok) throw new Error("No se pudo consultar el catálogo de municipios.");
  const payload = await response.json();
  const municipalities = (payload?.datos ?? payload ?? [])
    .map((entry) => entry.nomgeo ?? entry.nom_agem ?? entry.nom_mun)
    .filter(Boolean)
    .sort((left, right) => left.localeCompare(right, "es-MX"));
  if (!municipalities.length) throw new Error("El catálogo no devolvió municipios.");
  municipalityCache.set(state, municipalities);
  return municipalities;
}

async function populateCitySelect(select, state, options = {}) {
  const { includeAll = false, selectedCity = "" } = options;
  const cityOptions = cityOptionsForState(state, includeAll);
  select.dataset.stateRequest = state;
  select.innerHTML = cityOptions.length
    ? cityOptions.map((city) => `<option value="${escapeHtml(city.value)}">${escapeHtml(city.label)}</option>`).join("")
    : `<option value="">Selecciona un estado</option>`;
  select.disabled = !state || state === "Todo Mexico" || state === "Remoto";

  if (selectedCity && cityOptions.some((city) => city.value === selectedCity)) {
    select.value = selectedCity;
  }

  if (select.disabled) return;
  select.setAttribute("aria-busy", "true");
  try {
    const municipalities = await loadMunicipalities(state);
    if (select.dataset.stateRequest !== state) return;
    renderMunicipalityOptions(select, municipalities, includeAll, selectedCity);
  } catch (error) {
    // The local shortlist remains usable when INEGI is temporarily unavailable.
  } finally {
    if (select.dataset.stateRequest === state) select.removeAttribute("aria-busy");
  }
}

function composeLocation(state, city) {
  if (!state) return "";
  if (state === "Remoto") return "Remoto";
  const stateLabel = formatLocationLabel(state);
  return city ? `${city}, ${stateLabel}` : stateLabel;
}

function parseStoredLocation(location) {
  const normalized = String(location ?? "").trim();
  if (!normalized) return { state: "Ciudad de Mexico", city: "" };
  if (normalized === "Remoto") return { state: "Remoto", city: "" };

  const parts = normalized.split(",").map((part) => part.trim()).filter(Boolean);
  if (parts.length > 1) {
    const stateLabel = parts.at(-1);
    const state = mexicoStates.find((item) => formatLocationLabel(item) === stateLabel || item === stateLabel);
    if (state) return { state, city: parts.slice(0, -1).join(", ") };
  }

  const state = mexicoStates.find((item) => item === normalized || formatLocationLabel(item) === normalized);
  return state ? { state, city: "" } : { state: "Ciudad de Mexico", city: normalized };
}

function populateMexicoStateSelects() {
  locationInput.innerHTML = mexicoStates
    .map((state) => `<option value="${escapeHtml(state === "Todo Mexico" ? "" : state)}">${escapeHtml(formatLocationLabel(state))}</option>`)
    .join("");

  const formStates = mexicoStates.filter((state) => state !== "Todo Mexico");
  [candidateLocation, jobLocationInput].forEach((select) => {
    select.innerHTML = formStates
      .map((state) => `<option value="${escapeHtml(state)}">${escapeHtml(formatLocationLabel(state))}</option>`)
      .join("");
  });

  candidateLocation.value = "Ciudad de Mexico";
  jobLocationInput.value = "Ciudad de Mexico";
  populateCitySelect(locationCityInput, "", { includeAll: true });
  populateCitySelect(candidateCity, candidateLocation.value);
  populateCitySelect(jobCityInput, jobLocationInput.value);
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
  currentUserRoles = [];
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
  adminNavLink.classList.toggle("is-hidden", !isSignedIn || !isCurrentAdmin());
  adminNavLink.hidden = !isSignedIn || !isCurrentAdmin();
  document.body.classList.toggle("is-signed-in", isSignedIn);
  document.body.classList.toggle("is-admin", isSignedIn && isCurrentAdmin());
  document.querySelectorAll("[data-auth-create]").forEach((button) => {
    button.classList.toggle("is-hidden", isSignedIn);
    button.hidden = isSignedIn;
  });
}

function getCurrentRole() {
  return currentProfile?.role ?? document.querySelector(".role-option.active")?.dataset.role ?? "candidate";
}

function hasSupabaseConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function requireSupabaseConfig() {
  if (!hasSupabaseConfig()) {
    throw new Error(SUPABASE_CONFIG_MESSAGE);
  }
}

function applyRoleExperience() {
  const role = getCurrentRole();
  document.body.dataset.role = role;
}

function getCompanyLogoUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  if (!hasSupabaseConfig()) return "";
  const safePath = String(path)
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  return `${SUPABASE_URL}/storage/v1/object/public/company-logos/${safePath}`;
}

function setLogoElement(element, name, logoPath) {
  if (!element) return;

  const logoUrl = getCompanyLogoUrl(logoPath);
  element.textContent = "";
  element.dataset.logoFallback = getInitials(name || "RJ");
  element.classList.toggle("has-image", Boolean(logoUrl));

  if (logoUrl) {
    const image = document.createElement("img");
    image.src = logoUrl;
    image.alt = `Logo de ${name || "empresa"}`;
    image.loading = "lazy";
    image.onerror = () => {
      element.classList.remove("has-image");
      element.innerHTML = "";
      element.textContent = getInitials(name || "RJ");
      console.warn(`No se pudo cargar el logo de ${name || "empresa"}: ${logoUrl}`);
    };
    element.appendChild(image);
    return;
  }

  element.textContent = getInitials(name || "RJ");
}

function renderCompanyLogoMarkup(name, logoPath, extraClass = "") {
  const logoUrl = getCompanyLogoUrl(logoPath);
  const classes = `company-logo ${extraClass} ${logoUrl ? "has-image" : ""}`.trim();
  if (!logoUrl) return `<span class="${classes}">${escapeHtml(getInitials(name || "RJ"))}</span>`;
  return `<span class="${classes}" data-logo-fallback="${escapeHtml(getInitials(name || "RJ"))}"><img src="${escapeHtml(logoUrl)}" alt="Logo de ${escapeHtml(name || "empresa")}" loading="lazy" /></span>`;
}

function renderCompanyHeader() {
  const name = currentCompanyProfile?.company_name || "Tu empresa";
  const description = currentCompanyProfile?.description || "Completa el perfil de empresa para publicar vacantes reales.";

  setLogoElement(companyHeroLogo, name, currentCompanyProfile?.logo_path);
  companyHeroName.textContent = name;
  companyHeroDescription.textContent = description;
  companyLogoStatus.textContent = currentCompanyProfile?.logo_name
    ? `Logo cargado: ${currentCompanyProfile.logo_name}`
    : "Sin logo cargado";
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

function getCompanyRating(companyId) {
  return companyRatingSummary.get(String(companyId)) ?? { average: 0, count: 0 };
}

function renderStars(value, interactive = false, selected = 0) {
  const rating = Number(value) || 0;
  return Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    const filled = interactive ? starValue <= selected : starValue <= Math.round(rating);
    const className = filled ? "star filled" : "star";
    if (!interactive) return `<span class="${className}" aria-hidden="true">★</span>`;
    return `<button class="${className}" type="button" data-rate-company="${starValue}" aria-label="Calificar con ${starValue} estrellas">★</button>`;
  }).join("");
}

function renderRatingSummary(companyId) {
  const rating = getCompanyRating(companyId);
  if (!rating.count) {
    return `<span class="company-rating empty">${renderStars(0)} <small>Sin calificaciones</small></span>`;
  }
  return `
    <span class="company-rating" aria-label="${rating.average} de 5 estrellas con ${rating.count} calificaciones">
      ${renderStars(rating.average)}
      <small>${rating.average.toFixed(1)} (${rating.count})</small>
    </span>
  `;
}

function canRateCompany(companyId) {
  if (!currentCandidateProfile?.id || !companyId) return false;
  return applications.some((application) => {
    const job = getJobById(application.jobId);
    return sameId(application.companyId, companyId) || sameId(job?.companyId, companyId);
  });
}

function renderCompanyRatingControls(job) {
  if (!detailCompanyRatingSummary || !detailCompanyRatingActions) return;

  const rating = getCompanyRating(job.companyId);
  detailCompanyRatingSummary.innerHTML = rating.count
    ? `${renderStars(rating.average)} <span>${rating.average.toFixed(1)} de 5 · ${rating.count} calificación${rating.count === 1 ? "" : "es"}</span>`
    : "Sin calificaciones todavía";

  if (!getStoredSession()?.access_token) {
    detailCompanyRatingActions.innerHTML = `<small>Inicia sesión para calificar después de postularte.</small>`;
    return;
  }

  if (!canRateCompany(job.companyId)) {
    detailCompanyRatingActions.innerHTML = `<small>Podrás calificar esta empresa cuando te postules a una de sus vacantes.</small>`;
    return;
  }

  const selectedRating = ownCompanyRatings.get(String(job.companyId)) ?? 0;
  detailCompanyRatingActions.innerHTML = `
    <span>Tu calificación</span>
    <div class="interactive-stars" data-rating-company-id="${escapeHtml(job.companyId)}">
      ${renderStars(0, true, selectedRating)}
    </div>
  `;
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

async function refreshCurrentCompanyProfile() {
  if (!currentCompanyProfile?.id) return currentCompanyProfile;

  const rows = await supabaseRestRequest(`/company_profiles?select=*&id=eq.${currentCompanyProfile.id}&limit=1`);
  const refreshedCompany = rows?.[0];
  if (!refreshedCompany) return currentCompanyProfile;

  currentCompanyProfile = refreshedCompany;
  currentCompanyProfiles = currentCompanyProfiles.map((company) =>
    sameId(company.id, refreshedCompany.id) ? refreshedCompany : company
  );
  hydrateCompanyForm(currentCompanyProfile);
  renderCompanyProfileSelect();
  return currentCompanyProfile;
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
              ${renderCompanyLogoMarkup(job.company, job.companyLogoPath, "compact")}
              <div class="company-job-info">
                <div class="job-commercial-badges">${renderCommercialBadges(job)}</div>
                <strong>${escapeHtml(job.title)}</strong>
                <span>${escapeHtml(job.company)} - ${escapeHtml(formatLocationLabel(job.location))} - ${escapeHtml(formatWorkModeLabel(job.mode))}</span>
              </div>
              <div class="company-job-actions">
                <button class="secondary-button subtle" type="button" data-edit-job="${escapeHtml(job.id)}">
                  Editar
                </button>
                <button class="delete-job-button" type="button" data-delete-job="${escapeHtml(job.id)}">
                  Borrar
                </button>
              </div>
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
      existing.logoPath ||= job.companyLogoPath;
      return;
    }

    companies.set(key, {
      id: job.companyId,
      name: job.company,
      activeJobs: 1,
      logoPath: job.companyLogoPath,
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
              ${renderCompanyLogoMarkup(company.name, company.logoPath)}
              <span class="company-card-title">
                <strong>${escapeHtml(company.name)}</strong>
                ${company.isVerified ? '<span class="verified-badge">Verificada</span>' : ""}
              </span>
              ${renderRatingSummary(company.id)}
              <p>${company.activeJobs} vacante${company.activeJobs === 1 ? "" : "s"} activa${company.activeJobs === 1 ? "" : "s"}</p>
            </button>
          `
        )
        .join("")
    : `
        <article class="company-card company-card-empty">
          ${renderCompanyLogoMarkup("RedJob", "")}
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
    switchView("acceso");
    throw new Error("Inicia sesión para guardar vacantes en tu perfil.");
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
      `/jobs?select=id,title,description,location,work_mode,category,salary_min,salary_max,is_featured,featured_priority,featured_until,promotion_source,status,company_profiles(id,user_id,company_name,description,logo_path,logo_name,plan,plan_status,is_verified),job_skills(skill_name)&id=eq.${jobId}&status=eq.published&limit=1`
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
  setLogoElement(detailCompanyLogo, job.company, job.companyLogoPath);
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
  renderCompanyRatingControls(job);
  detailRequirements.innerHTML = job.tags.length
    ? job.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")
    : `<li>Sin requisitos publicados</li>`;
  detailSaveButton.textContent = isSavedJob(job.id) ? "Guardada" : "Guardar";
  detailSaveButton.classList.toggle("active", isSavedJob(job.id));
  detailApplyButton.textContent = hasApplication(job.id) ? "Postulada" : "Postularme";
  detailReportButton.dataset.reportJobId = String(job.id);
  switchView("vacante");
}

async function supabaseAuthRequest(path, body, accessToken) {
  requireSupabaseConfig();
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
  requireSupabaseConfig();
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
  requireSupabaseConfig();
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

async function supabaseStorageUploadToBucket(bucket, path, file, errorMessage) {
  requireSupabaseConfig();
  const session = requireSession();
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${path}`, {
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
    throw new Error(payload.message || payload.error || errorMessage);
  }
}

async function createResumeSignedUrl(path) {
  requireSupabaseConfig();
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

async function loadCompanyRatingSummary() {
  companyRatingSummary.clear();
  ownCompanyRatings.clear();

  try {
    const rows = await supabaseRestRequest("/company_rating_summary?select=company_id,average_rating,rating_count");
    (rows ?? []).forEach((row) => {
      companyRatingSummary.set(String(row.company_id), {
        average: Number(row.average_rating) || 0,
        count: Number(row.rating_count) || 0
      });
    });
  } catch (error) {
    if (!/company_rating_summary|company_ratings|schema cache|relation|Falta instalar/i.test(error.message)) throw error;
  }

  if (!currentCandidateProfile?.id) return;

  try {
    const rows = await supabaseRestRequest(
      `/company_ratings?select=company_id,rating&candidate_id=eq.${currentCandidateProfile.id}`
    );
    (rows ?? []).forEach((row) => ownCompanyRatings.set(String(row.company_id), Number(row.rating) || 0));
  } catch (error) {
    if (!/company_ratings|schema cache|relation|Falta instalar/i.test(error.message)) throw error;
  }
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
  const candidateLocationValue = composeLocation(candidateLocation.value, candidateCity.value).toLowerCase();
  const locationScore =
    !candidateLocationValue ||
    job.location.toLowerCase().includes(candidateLocationValue) ||
    job.location.toLowerCase().includes(formatLocationLabel(candidateLocation.value).toLowerCase()) ||
    job.mode === "Remoto"
      ? 20
      : 8;

  return Math.min(99, skillScore + modeScore + locationScore);
}

async function loadCurrentProfile() {
  const session = getStoredSession();
  if (!session?.user?.id) return;

  let rows;
  try {
    rows = await supabaseRestRequest(`/profiles?select=id,email,role,suspended_at,suspension_reason&id=eq.${session.user.id}&limit=1`);
  } catch (error) {
    if (!/suspended_at|suspension_reason|schema cache|column/i.test(error.message)) throw error;
    rows = await supabaseRestRequest(`/profiles?select=id,email,role&id=eq.${session.user.id}&limit=1`);
  }
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

  if (currentProfile?.suspended_at) {
    const reason = currentProfile.suspension_reason ? ` Motivo: ${currentProfile.suspension_reason}` : "";
    await signOutFromSupabase();
    throw new Error(`Esta cuenta está suspendida.${reason}`);
  }

  try {
    const roleRows = await supabaseRestRequest(`/user_roles?select=role&user_id=eq.${session.user.id}`);
    currentUserRoles = (roleRows ?? []).map((entry) => entry.role);
  } catch (error) {
    currentUserRoles = [];
    if (!/user_roles|schema cache|relation/i.test(error.message)) throw error;
  }

  selectedRoleStatus.textContent = currentProfile?.role ?? "candidate";
  applyRoleExperience();
  renderHeaderAuthState();

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
    await loadCompanyRatingSummary();
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

function adminJobStatusLabel(status) {
  return {
    draft: "Borrador",
    published: "Publicada",
    paused: "Pausada",
    closed: "Cerrada"
  }[status] ?? status;
}

function adminReportStatusLabel(status) {
  return {
    pending: "Pendiente",
    reviewing: "En revisión",
    resolved: "Resuelto",
    dismissed: "Descartado"
  }[status] ?? status;
}

function normalizeAdminSearch(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function filterAdminList(input, list, emptyMessage) {
  const query = normalizeAdminSearch(input.value);
  const rows = Array.from(list.querySelectorAll(".admin-row"));
  let visibleCount = 0;

  rows.forEach((row) => {
    const matches = !query || normalizeAdminSearch(row.dataset.search).includes(query);
    row.classList.toggle("is-hidden", !matches);
    if (matches) visibleCount += 1;
  });

  emptyMessage.classList.toggle("is-hidden", !query || visibleCount > 0 || rows.length === 0);
}

function refreshAdminFilters() {
  filterAdminList(adminReportsSearch, adminReportsList, adminReportsEmpty);
  filterAdminList(adminJobsSearch, adminJobsList, adminJobsEmpty);
  filterAdminList(adminUsersSearch, adminUsersList, adminUsersEmpty);
  filterAdminList(adminCompaniesSearch, adminCompaniesList, adminCompaniesEmpty);
}

async function loadAdminDashboard() {
  if (!isCurrentAdmin()) {
    throw new Error("No tienes permisos de administración.");
  }

  const [stats, reports, adminJobs, users, companies, roleRows] = await Promise.all([
    supabaseRestRequest("/rpc/admin_dashboard_stats", { method: "POST", body: {} }),
    supabaseRestRequest("/reports?select=id,reporter_user_id,category,target_type,target_id,subject,description,status,admin_note,created_at&order=created_at.desc&limit=500"),
    supabaseRestRequest("/jobs?select=id,title,status,created_at,company_profiles(company_name)&order=created_at.desc&limit=200"),
    supabaseRestRequest("/profiles?select=id,email,role,suspended_at,suspension_reason,created_at&order=created_at.desc&limit=200"),
    supabaseRestRequest("/company_profiles?select=id,user_id,company_name,is_verified,created_at&order=created_at.desc&limit=200"),
    supabaseRestRequest("/user_roles?select=user_id,role")
  ]);

  if (stats?.error) throw new Error(stats.error);

  adminUsersCount.textContent = String(stats?.users ?? 0);
  adminJobsCount.textContent = String(stats?.published_jobs ?? 0);
  adminCompaniesCount.textContent = String(stats?.companies ?? 0);
  adminApplicationsCount.textContent = String(stats?.applications ?? 0);
  adminReportsCount.textContent = String(stats?.pending_reports ?? 0);

  const adminUserIds = new Set((roleRows ?? []).filter((entry) => entry.role === "admin").map((entry) => String(entry.user_id)));

  adminReportsList.innerHTML = reports?.length
    ? reports.map((report) => `
        <article class="admin-row" data-search="${escapeHtml(`${report.subject} ${report.description} ${report.category} ${adminReportStatusLabel(report.status)}`)}">
          <div class="admin-row-main">
            <div class="admin-row-title">
              <strong>${escapeHtml(report.subject)}</strong>
              <span class="admin-status ${escapeHtml(report.status)}">${escapeHtml(adminReportStatusLabel(report.status))}</span>
            </div>
            <p>${escapeHtml(report.description)}</p>
            <small>${escapeHtml(report.category)} · ${escapeHtml(formatMessageTime(report.created_at))}</small>
          </div>
          <div class="admin-row-actions">
            ${report.target_type === "job" && report.target_id ? `<button class="admin-action" type="button" data-admin-open-job="${escapeHtml(report.target_id)}">Ver vacante</button>` : ""}
            <button class="admin-action" type="button" data-admin-report-status="reviewing" data-report-id="${escapeHtml(report.id)}">Revisar</button>
            <button class="admin-action success" type="button" data-admin-report-status="resolved" data-report-id="${escapeHtml(report.id)}">Resolver</button>
            <button class="admin-action" type="button" data-admin-report-status="dismissed" data-report-id="${escapeHtml(report.id)}">Descartar</button>
          </div>
        </article>
      `).join("")
    : `<p class="empty-list">No hay reportes registrados.</p>`;

  adminJobsList.innerHTML = adminJobs?.length
    ? adminJobs.map((job) => {
        const company = Array.isArray(job.company_profiles) ? job.company_profiles[0] : job.company_profiles;
        return `
          <article class="admin-row" data-search="${escapeHtml(`${job.title} ${company?.company_name ?? ""} ${adminJobStatusLabel(job.status)}`)}">
            <div class="admin-row-main">
              <div class="admin-row-title">
                <strong>${escapeHtml(job.title)}</strong>
                <span class="admin-status ${escapeHtml(job.status)}">${escapeHtml(adminJobStatusLabel(job.status))}</span>
              </div>
              <p>${escapeHtml(company?.company_name ?? "Empresa sin nombre")}</p>
              <small>${escapeHtml(formatMessageTime(job.created_at))}</small>
            </div>
            <div class="admin-row-actions">
              <button class="admin-action success" type="button" data-admin-job-status="published" data-job-id="${escapeHtml(job.id)}">Aprobar</button>
              <button class="admin-action" type="button" data-admin-job-status="paused" data-job-id="${escapeHtml(job.id)}">Pausar</button>
              <button class="admin-action danger" type="button" data-admin-delete-job="${escapeHtml(job.id)}">Eliminar</button>
            </div>
          </article>
        `;
      }).join("")
    : `<p class="empty-list">No hay vacantes disponibles.</p>`;

  adminUsersList.innerHTML = users?.length
    ? users.map((user) => `
        <article class="admin-row" data-search="${escapeHtml(`${user.email} ${user.role} ${user.suspended_at ? "suspendido" : "activo"} ${adminUserIds.has(String(user.id)) ? "administrador" : ""}`)}">
          <div class="admin-row-main">
            <div class="admin-row-title">
              <strong>${escapeHtml(user.email)}</strong>
              ${adminUserIds.has(String(user.id)) ? `<span class="admin-status admin">Administrador</span>` : ""}
              ${user.suspended_at ? `<span class="admin-status paused">Suspendido</span>` : `<span class="admin-status published">Activo</span>`}
            </div>
            <p>${escapeHtml(user.role === "company" ? "Cuenta de empresa" : "Cuenta de candidato")}</p>
            <small>${user.suspension_reason ? `Motivo: ${escapeHtml(user.suspension_reason)}` : escapeHtml(formatMessageTime(user.created_at))}</small>
          </div>
          <div class="admin-row-actions">
            <button class="admin-action ${user.suspended_at ? "success" : "danger"}" type="button"
              data-admin-user-id="${escapeHtml(user.id)}"
              data-admin-suspend="${user.suspended_at ? "false" : "true"}"
              ${adminUserIds.has(String(user.id)) ? "disabled" : ""}>
              ${user.suspended_at ? "Reactivar" : "Suspender"}
            </button>
          </div>
        </article>
      `).join("")
    : `<p class="empty-list">No hay usuarios disponibles.</p>`;

  adminCompaniesList.innerHTML = companies?.length
    ? companies.map((company) => `
        <article class="admin-row" data-search="${escapeHtml(`${company.company_name} ${company.is_verified ? "verificada" : "sin verificar"}`)}">
          <div class="admin-row-main">
            <div class="admin-row-title">
              <strong>${escapeHtml(company.company_name)}</strong>
              ${company.is_verified ? `<span class="admin-status verified">Verificada</span>` : `<span class="admin-status">Sin verificar</span>`}
            </div>
            <small>${escapeHtml(formatMessageTime(company.created_at))}</small>
          </div>
          <div class="admin-row-actions">
            <button class="admin-action ${company.is_verified ? "" : "success"}" type="button"
              data-admin-company-id="${escapeHtml(company.id)}"
              data-admin-verified="${company.is_verified ? "false" : "true"}">
              ${company.is_verified ? "Quitar verificación" : "Verificar"}
            </button>
          </div>
        </article>
      `).join("")
    : `<p class="empty-list">No hay empresas disponibles.</p>`;

  refreshAdminFilters();
}

async function submitSafetyReport() {
  const session = requireSession();
  const subject = reportSubject.value.trim();
  const description = reportDescription.value.trim();

  if (!subject || !description) {
    throw new Error("Agrega el asunto y la descripción del reporte.");
  }

  await supabaseRestRequest("/reports", {
    method: "POST",
    prefer: "return=minimal",
    body: {
      reporter_user_id: session.user.id,
      category: reportCategory.value,
      target_type: activeReportTarget?.type ?? null,
      target_id: activeReportTarget?.id ?? null,
      subject,
      description
    }
  });

  reportForm.reset();
  activeReportTarget = null;
  reportDialog.close();
  showToast("Reporte enviado. Gracias por ayudarnos a cuidar RedJob.");
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
    applications.length = 0;
    renderProfileActivity();
    return;
  }

  const rows = await supabaseRestRequest(
    `/applications?select=id,job_id,status,match_score,created_at,jobs(title,company_id,company_profiles(company_name))&candidate_id=eq.${currentCandidateProfile.id}&order=created_at.desc`
  );

  applications.length = 0;
  (rows ?? []).forEach((application) => {
    const job = Array.isArray(application.jobs) ? application.jobs[0] : application.jobs;
    const company = Array.isArray(job?.company_profiles) ? job.company_profiles[0] : job?.company_profiles;
    applications.push({
      id: application.id,
      source: "supabase",
      jobId: application.job_id,
      companyId: job?.company_id,
      rawStatus: application.status,
      status: mapApplicationStatus(application.status),
      jobTitle: job?.title ?? "Vacante",
      companyName: company?.company_name ?? "Empresa"
    });
  });

  renderProfileActivity();
  renderJobs();
}

async function withdrawCandidateApplication(applicationId) {
  await supabaseRestRequest("/rpc/update_my_application", {
    method: "POST",
    prefer: "return=representation",
    body: {
      application_uuid: applicationId,
      next_status: "withdrawn",
      cover_note_value: null
    }
  });
  await loadCandidateApplications();
  await loadFirstConversation();
}

async function rateCompany(companyId, rating) {
  const session = requireSession();

  if (!currentCandidateProfile?.id) {
    await loadCurrentProfile();
  }

  if (!currentCandidateProfile?.id) {
    throw new Error("Guarda tu perfil de candidato antes de calificar una empresa.");
  }

  if (!canRateCompany(companyId)) {
    throw new Error("Solo puedes calificar empresas a las que ya te postulaste.");
  }

  await supabaseRestRequest("/company_ratings?on_conflict=company_id,candidate_id", {
    method: "POST",
    prefer: "resolution=merge-duplicates",
    body: {
      company_id: companyId,
      candidate_id: currentCandidateProfile.id,
      user_id: session.user.id,
      rating: Number(rating)
    }
  });

  ownCompanyRatings.set(String(companyId), Number(rating));
  await loadCompanyRatingSummary();
  renderJobs();
  renderHiringCompanies();

  const job = getJobById(activeDetailJobId);
  if (job) renderCompanyRatingControls(job);
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
    profileMessagesCount.textContent = "0";
    return;
  }

  const rows = await supabaseRestRequest(
    "/conversations?select=id,job_id,last_message_at,jobs(title),company_profiles(company_name,logo_path),candidate_profiles(full_name,age,target_role,location,summary,resume_name,resume_path)&status=eq.open&order=last_message_at.desc.nullslast,created_at.desc"
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
        `/conversations?select=id,job_id,last_message_at,jobs(title),company_profiles(company_name,logo_path),candidate_profiles(full_name,age,target_role,location,summary,resume_name,resume_path)&id=eq.${conversationId}&limit=1`
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

function getConversationCompanyRecord(conversation) {
  return Array.isArray(conversation.company_profiles)
    ? conversation.company_profiles[0]
    : conversation.company_profiles;
}

function getConversationDisplay(conversation) {
  const companyRecord = getConversationCompanyRecord(conversation);
  const companyName = companyRecord?.company_name;
  const candidate = Array.isArray(conversation.candidate_profiles)
    ? conversation.candidate_profiles[0]
    : conversation.candidate_profiles;
  const jobTitle = Array.isArray(conversation.jobs) ? conversation.jobs[0]?.title : conversation.jobs?.title;
  const isCompanyView = currentCompanyProfiles.some((company) => company.company_name === companyName);

  return {
    isCompanyView,
    primaryName: isCompanyView ? candidate?.full_name || "Candidato" : companyName || "Empresa",
    secondaryLabel: isCompanyView
      ? `${companyName ?? "Empresa"} - ${jobTitle ?? "Vacante"}`
      : `${jobTitle ?? "Vacante"} - conversación`,
    logoPath: isCompanyView ? "" : companyRecord?.logo_path
  };
}

function renderConversationList(conversations) {
  conversationCount.textContent = String(conversations.length);
  profileMessagesCount.textContent = String(conversations.length);
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
          const conversationDisplay = getConversationDisplay(conversation);
          const primaryName = candidate?.full_name || company || "Conversación";
          const secondaryLabel = candidate?.full_name ? `${company ?? "Empresa"} - ${jobTitle ?? "Vacante"}` : jobTitle ?? "Vacante";
          return `
            <button class="conversation-item ${sameId(conversation.id, activeConversationId) ? "active" : ""}" type="button" data-conversation-id="${escapeHtml(conversation.id)}">
              ${renderCompanyLogoMarkup(conversationDisplay.primaryName, conversationDisplay.logoPath)}
              <div>
                <strong>${escapeHtml(conversationDisplay.primaryName)}</strong>
                <small>${escapeHtml(conversationDisplay.secondaryLabel)}</small>
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
  const conversationDisplay = getConversationDisplay(conversation);
  const chatSubtitle = isCompanyView
    ? `${candidate?.target_role ?? "Perfil candidato"} - ${jobTitle ?? "Vacante"}`
    : `${jobTitle ?? "Vacante"} - conversación real`;

  setLogoElement(document.querySelector(".chat-head .company-logo"), chatTitle, conversationDisplay.logoPath);
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
  const parsedLocation = parseStoredLocation(profile.location);
  candidateFullName.value = profile.full_name ?? "";
  candidateAge.value = profile.age ?? "";
  candidateTargetRole.value = profile.target_role ?? "";
  candidateLocation.value = parsedLocation.state;
  populateCitySelect(candidateCity, parsedLocation.state, { selectedCity: parsedLocation.city });
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
        "/jobs?select=id,title,description,location,work_mode,category,salary_min,salary_max,is_featured,featured_priority,featured_until,promotion_source,status,company_profiles(id,user_id,company_name,description,logo_path,logo_name,plan,plan_status,is_verified),job_skills(skill_name)&status=eq.published"
      );
    } catch (error) {
      if (!/category|schema cache|column|Falta instalar/i.test(error.message)) throw error;
      rows = await supabaseRestRequest(
        "/jobs?select=id,title,description,location,work_mode,salary_min,salary_max,status,company_profiles(id,user_id,company_name,description),job_skills(skill_name)&status=eq.published"
      );
    }

    const realJobs = (rows ?? []).map(mapSupabaseJob).filter(Boolean);

    jobs = realJobs;
    await loadCompanyRatingSummary();
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
    companyLogoPath: company?.logo_path ?? "",
    companyLogoName: company?.logo_name ?? "",
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
  if (candidateLocation.value !== "Remoto" && !candidateCity.value) {
    throw new Error("Selecciona tu ciudad.");
  }
  const profileRows = await supabaseRestRequest("/candidate_profiles?on_conflict=user_id", {
    method: "POST",
    prefer: "resolution=merge-duplicates,return=representation",
    body: {
      user_id: session.user.id,
      full_name: candidateFullName.value.trim(),
      age: candidateAge.value ? Number(candidateAge.value) : null,
      target_role: candidateTargetRole.value.trim(),
      location: composeLocation(candidateLocation.value, candidateCity.value),
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
    description: companyDescriptionInput.value.trim(),
    logo_path: currentCompanyProfile?.logo_path ?? null,
    logo_name: currentCompanyProfile?.logo_name ?? null
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

async function uploadCompanyLogo(file) {
  if (!file) return;

  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
    throw new Error("Sube un logo en PNG, JPG o WebP.");
  }

  if (file.size > 3 * 1024 * 1024) {
    throw new Error("El logo debe pesar menos de 3 MB.");
  }

  if (!currentCompanyProfile?.id) {
    await saveCompanyProfile();
  }

  if (!currentCompanyProfile?.id) {
    throw new Error("Primero guarda el perfil de empresa.");
  }

  const session = requireSession();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const logoPath = `${session.user.id}/${currentCompanyProfile.id}/${Date.now()}-${safeName}`;

  companyLogoStatus.textContent = "Subiendo logo...";
  await supabaseStorageUploadToBucket("company-logos", logoPath, file, "No se pudo subir el logo.");

  const rows = await supabaseRestRequest(`/company_profiles?id=eq.${currentCompanyProfile.id}`, {
    method: "PATCH",
    prefer: "return=representation",
    body: {
      logo_path: logoPath,
      logo_name: file.name
    }
  });

  currentCompanyProfile = rows?.[0] ?? currentCompanyProfile;
  currentCompanyProfile = {
    ...currentCompanyProfile,
    logo_path: logoPath,
    logo_name: file.name
  };
  currentCompanyProfiles = currentCompanyProfiles.map((company) =>
    sameId(company.id, currentCompanyProfile.id) ? currentCompanyProfile : company
  );
  await refreshCurrentCompanyProfile();
  renderCompanyProfileSelect();
  renderCompanyHeader();
  await loadRealJobs();
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

  if (jobLocationInput.value !== "Remoto" && !jobCityInput.value) {
    throw new Error("Selecciona la ciudad de la vacante.");
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
    location: composeLocation(jobLocationInput.value, jobCityInput.value),
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
  populateCitySelect(jobCityInput, jobLocationInput.value);
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
  const parsedLocation = parseStoredLocation(job.location);
  jobTitleInput.value = job.title;
  jobDescriptionInput.value = job.description ?? "";
  jobLocationInput.value = parsedLocation.state;
  populateCitySelect(jobCityInput, parsedLocation.state, { selectedCity: parsedLocation.city });
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
  const email = signupEmail.value.trim();
  const password = signupPassword.value;
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

  if (!legalConsent.checked) {
    throw new Error("Debes aceptar los Términos y Condiciones y el Aviso de Privacidad para crear tu cuenta.");
  }

  signupMessage.textContent = "Creando tu cuenta...";

  const payload = await supabaseAuthRequest("/auth/v1/signup", {
    email,
    password,
    data: {
      role,
      full_name: name,
      legal_terms_version: LEGAL_TERMS_VERSION,
      legal_privacy_version: LEGAL_PRIVACY_VERSION,
      legal_accepted_at: new Date().toISOString()
    }
  });

  if (payload.access_token) {
    setStoredSession(payload);
    await loadCurrentProfile();
    await recordLegalAcceptance();
    signupMessage.textContent = "Cuenta creada y sesión iniciada.";
  } else {
    signupMessage.textContent = "Cuenta creada. Si se requiere confirmación, revisa tu correo.";
  }

  showToast("Cuenta creada. Revisa tu correo si necesitas confirmarla.");
}

async function recordLegalAcceptance() {
  const session = getStoredSession();
  if (!session?.user?.id) return;

  try {
    await supabaseRestRequest(`/profiles?id=eq.${session.user.id}`, {
      method: "PATCH",
      prefer: "return=minimal",
      body: {
        legal_terms_version: LEGAL_TERMS_VERSION,
        legal_privacy_version: LEGAL_PRIVACY_VERSION,
        legal_accepted_at: new Date().toISOString()
      }
    });
  } catch (error) {
    if (!/legal_|schema cache|column/i.test(error.message)) throw error;
  }
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
    try {
      await supabaseAuthRequest("/auth/v1/logout", {}, session.access_token);
    } catch (error) {
      // Local session data must still be removed if the network logout fails.
    }
  }

  setStoredSession(null);
  currentProfile = null;
  currentUserRoles = [];
  currentCandidateProfile = null;
  currentCompanyProfile = null;
  currentCompanyProfiles = [];
  savedJobs.clear();
  applications.length = 0;
  jobs = [];
  receivedCandidateProfiles.clear();
  activeConversationId = null;
  activeConversationJobId = null;
  activeApplicationJob = null;
  activeDetailJobId = null;
  conversationList.innerHTML = `<p class="empty-list">Inicia sesión para ver tus conversaciones.</p>`;
  chatBody.innerHTML = `<p class="empty-list">Selecciona una conversación.</p>`;
  conversationCount.textContent = "0";
  profileMessagesCount.textContent = "0";
  applyRoleExperience();
  renderProfileHeader();
  renderResumeStatus();
  renderUnreadMessagesBadge(0);
  renderJobs();
  renderHiringCompanies();
  renderProfileActivity();
  renderCompanyProfileSelect();
  renderCompanyJobs();
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
  const locationState = formatLocationLabel(locationInput.value).trim().toLowerCase();
  const locationCity = locationCityInput.value.trim().toLowerCase();
  const mode = modeFilter.value;
  const category = categoryFilter.value;

  const filteredJobs = jobs
    .filter((job) => {
      const searchable = `${job.title} ${job.company} ${job.category ?? ""} ${job.tags.join(" ")}`.toLowerCase();
      const jobLocation = `${job.location} ${job.mode}`.toLowerCase();
      const matchesQuery = !query || searchable.includes(query);
      const matchesLocation =
        (!locationState || jobLocation.includes(locationState)) &&
        (!locationCity || jobLocation.includes(locationCity));
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
              ${renderRatingSummary(job.companyId)}
              <span>${escapeHtml(formatLocationLabel(job.location))}</span>
              <span>${escapeHtml(job.salary)}</span>
              <span>${escapeHtml(formatWorkModeLabel(job.mode))}</span>
            </div>
          </div>
            ${renderCompanyLogoMarkup(job.company, job.companyLogoPath)}
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
            <article class="profile-activity-row">
              <div class="profile-activity-copy">
                <strong>${escapeHtml(job.title)}</strong>
                <span>${escapeHtml(job.company)} · ${escapeHtml(formatLocationLabel(job.location))}</span>
              </div>
              <div class="profile-activity-actions">
                <button class="secondary-button subtle compact-button" type="button" data-open-saved-job="${escapeHtml(job.id)}">Ver vacante</button>
                <button class="text-danger-button compact" type="button" data-remove-saved-job="${escapeHtml(job.id)}">Quitar</button>
              </div>
            </article>
          `
        )
        .join("")
    : `<p class="empty-list">Aún no tienes vacantes guardadas.</p>`;

  applicationsList.innerHTML = applications.length
    ? applications
        .map((application) => {
          const job = jobs.find((item) => sameId(item.id, application.jobId));
          const jobTitle = job?.title ?? application.jobTitle ?? "Vacante";
          const companyName = job?.company ?? application.companyName ?? "Empresa";
          const canWithdraw = !["withdrawn", "hired"].includes(application.rawStatus);
          return `
            <article class="profile-activity-row">
              <div class="profile-activity-copy">
                <strong>${escapeHtml(jobTitle)}</strong>
                <span>${escapeHtml(companyName)} · ${escapeHtml(application.status)}</span>
              </div>
              <div class="profile-activity-actions">
                <button class="secondary-button subtle compact-button" type="button" data-open-application-job="${escapeHtml(application.jobId)}">Ver vacante</button>
                ${canWithdraw ? `<button class="text-danger-button compact" type="button" data-withdraw-application="${escapeHtml(application.id)}">Retirar</button>` : ""}
              </div>
            </article>
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
  if (viewId === "administracion" && !isCurrentAdmin()) {
    showToast("No tienes permisos para acceder a Administración.");
    viewId = "inicio";
  }

  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active-view", view.id === viewId);
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.viewLink === viewId);
  });

  window.requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (viewId === "contacto") {
      document.querySelector("#contacto")?.scrollIntoView({ block: "start", behavior: "auto" });
    }
  });

  if (viewId === "mensajes" && getStoredSession()?.access_token) {
    loadFirstConversation(true).catch((error) => showToast(`Mensajes: ${error.message}`));
  }

  if (viewId === "administracion") {
    loadAdminDashboard().catch((error) => showToast(friendlyError(error)));
  }
}

function openAuthPanel(mode) {
  if (!signInPanel || !createAccountPanel) return;
  const createMode = mode === "create";
  createAccountPanel.open = createMode;
  signInPanel.open = !createMode;
}

document.querySelectorAll("[data-view-link]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    switchView(trigger.dataset.viewLink);
    if (trigger.dataset.authCreate !== undefined) {
      openAuthPanel("create");
    } else if (trigger.dataset.viewLink === "acceso") {
      openAuthPanel("signin");
    }
  });
});

signInPanel.addEventListener("toggle", () => {
  if (signInPanel.open) createAccountPanel.open = false;
});

createAccountPanel.addEventListener("toggle", () => {
  if (createAccountPanel.open) signInPanel.open = false;
});

hiringCompaniesList.addEventListener("click", (event) => {
  const companyButton = event.target.closest("[data-company-search]");
  if (!companyButton) return;

  searchInput.value = companyButton.dataset.companySearch;
  locationInput.value = "";
  populateCitySelect(locationCityInput, "", { includeAll: true });
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

detailCompanyRatingActions.addEventListener("click", async (event) => {
  const ratingButton = event.target.closest("[data-rate-company]");
  if (!ratingButton) return;

  const job = getJobById(activeDetailJobId);
  if (!job?.companyId) return;

  ratingButton.disabled = true;
  try {
    await rateCompany(job.companyId, ratingButton.dataset.rateCompany);
    showToast("Calificación guardada. Gracias por ayudar a otros candidatos.");
  } catch (error) {
    showToast(friendlyError(error));
  } finally {
    ratingButton.disabled = false;
  }
});

[searchInput, locationCityInput, modeFilter].forEach((control) => {
  control.addEventListener("input", renderJobs);
  control.addEventListener("change", renderJobs);
});

locationInput.addEventListener("change", () => {
  populateCitySelect(locationCityInput, locationInput.value, { includeAll: true });
  renderJobs();
});

candidateLocation.addEventListener("change", () => {
  populateCitySelect(candidateCity, candidateLocation.value);
});

jobLocationInput.addEventListener("change", () => {
  populateCitySelect(jobCityInput, jobLocationInput.value);
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

savedJobsList.addEventListener("click", async (event) => {
  const openButton = event.target.closest("[data-open-saved-job]");
  const removeButton = event.target.closest("[data-remove-saved-job]");

  if (openButton) {
    try {
      await openJobDetail(openButton.dataset.openSavedJob);
    } catch (error) {
      showToast(friendlyError(error));
    }
    return;
  }

  if (!removeButton) return;

  removeButton.disabled = true;
  try {
    await toggleSavedJob(removeButton.dataset.removeSavedJob);
    renderJobs();
    renderProfileActivity();
    showToast("Vacante eliminada de tus guardadas.");
  } catch (error) {
    showToast(friendlyError(error));
    removeButton.disabled = false;
  }
});

applicationsList.addEventListener("click", async (event) => {
  const openButton = event.target.closest("[data-open-application-job]");
  const withdrawButton = event.target.closest("[data-withdraw-application]");

  if (openButton) {
    try {
      await openJobDetail(openButton.dataset.openApplicationJob);
    } catch (error) {
      showToast(friendlyError(error));
    }
    return;
  }

  if (!withdrawButton) return;
  if (!window.confirm("¿Quieres retirar esta postulación? La empresa verá que fue retirada y ya no podrás reactivarla.")) return;

  withdrawButton.disabled = true;
  try {
    await withdrawCandidateApplication(withdrawButton.dataset.withdrawApplication);
    showToast("Postulación retirada.");
  } catch (error) {
    showToast(friendlyError(error));
    withdrawButton.disabled = false;
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

adminRefreshButton.addEventListener("click", async () => {
  try {
    await withButtonLoading(adminRefreshButton, "Actualizando...", loadAdminDashboard);
    showToast("Panel actualizado.");
  } catch (error) {
    showToast(friendlyError(error));
  }
});

[adminReportsSearch, adminJobsSearch, adminUsersSearch, adminCompaniesSearch].forEach((input) => {
  input.addEventListener("input", refreshAdminFilters);
});

document.querySelector("#administracion").addEventListener("click", async (event) => {
  const jobStatusButton = event.target.closest("[data-admin-job-status]");
  const deleteJobButton = event.target.closest("[data-admin-delete-job]");
  const openJobButton = event.target.closest("[data-admin-open-job]");
  const userButton = event.target.closest("[data-admin-user-id]");
  const companyButton = event.target.closest("[data-admin-company-id]");
  const reportButton = event.target.closest("[data-admin-report-status]");

  try {
    if (openJobButton) {
      const rows = await supabaseRestRequest(
        `/jobs?select=id,title,description,location,work_mode,category,salary_min,salary_max,status,company_profiles(id,user_id,company_name,description,logo_path,logo_name,is_verified),job_skills(skill_name)&id=eq.${openJobButton.dataset.adminOpenJob}&limit=1`
      );
      const job = mapSupabaseJob(rows?.[0]);
      if (!job) throw new Error("Vacante no encontrada.");
      const existingIndex = jobs.findIndex((item) => sameId(item.id, job.id));
      if (existingIndex >= 0) jobs[existingIndex] = job;
      else jobs.unshift(job);
      await openJobDetail(job.id);
    } else if (jobStatusButton) {
      await supabaseRestRequest("/rpc/admin_set_job_status", {
        method: "POST",
        body: {
          job_uuid: jobStatusButton.dataset.jobId,
          next_status: jobStatusButton.dataset.adminJobStatus
        }
      });
      showToast("Estado de vacante actualizado.");
    } else if (deleteJobButton) {
      if (!window.confirm("¿Eliminar esta vacante definitivamente? También se eliminarán sus postulaciones y conversaciones relacionadas.")) return;
      await supabaseRestRequest("/rpc/admin_delete_job", {
        method: "POST",
        body: { job_uuid: deleteJobButton.dataset.adminDeleteJob }
      });
      showToast("Vacante eliminada.");
    } else if (userButton) {
      const shouldSuspend = userButton.dataset.adminSuspend === "true";
      const reason = shouldSuspend ? window.prompt("Motivo de la suspensión:") : "";
      if (shouldSuspend && reason === null) return;
      await supabaseRestRequest("/rpc/admin_set_user_suspension", {
        method: "POST",
        body: {
          user_uuid: userButton.dataset.adminUserId,
          should_suspend: shouldSuspend,
          reason
        }
      });
      showToast(shouldSuspend ? "Usuario suspendido." : "Usuario reactivado.");
    } else if (companyButton) {
      const verified = companyButton.dataset.adminVerified === "true";
      await supabaseRestRequest("/rpc/admin_set_company_verified", {
        method: "POST",
        body: {
          company_uuid: companyButton.dataset.adminCompanyId,
          verified
        }
      });
      showToast(verified ? "Empresa verificada." : "Verificación retirada.");
    } else if (reportButton) {
      const nextStatus = reportButton.dataset.adminReportStatus;
      const note = window.prompt("Nota interna opcional para este reporte:") ?? "";
      await supabaseRestRequest("/rpc/admin_update_report", {
        method: "POST",
        body: {
          report_uuid: reportButton.dataset.reportId,
          next_status: nextStatus,
          note
        }
      });
      showToast("Reporte actualizado.");
    } else {
      return;
    }

    await loadAdminDashboard();
    await loadRealJobs();
  } catch (error) {
    showToast(friendlyError(error));
  }
});

openReportDialogButton.addEventListener("click", () => {
  if (!getStoredSession()?.access_token) {
    showToast("Inicia sesión para enviar un reporte.");
    switchView("acceso");
    return;
  }
  activeReportTarget = null;
  reportDialog.showModal();
});

detailReportButton.addEventListener("click", () => {
  if (!getStoredSession()?.access_token) {
    showToast("Inicia sesión para reportar una vacante.");
    switchView("acceso");
    return;
  }

  const job = getJobById(detailReportButton.dataset.reportJobId);
  activeReportTarget = job ? { type: "job", id: job.id } : null;
  reportCategory.value = "job";
  reportSubject.value = job ? `Reporte sobre la vacante: ${job.title}` : "";
  reportDescription.value = "";
  reportDialog.showModal();
});

document.querySelector("#closeReportDialog").addEventListener("click", () => {
  activeReportTarget = null;
  reportDialog.close();
});

reportForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await withButtonLoading(submitReportButton, "Enviando...", submitSafetyReport);
  } catch (error) {
    showToast(friendlyError(error));
  }
});

document.addEventListener(
  "error",
  (event) => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement)) return;
    const logo = image.closest(".company-logo.has-image");
    if (!logo) return;

    logo.classList.remove("has-image");
    logo.textContent = logo.dataset.logoFallback || "RJ";
  },
  true
);

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

companyLogoButton.addEventListener("click", () => {
  if (!getStoredSession()?.access_token) {
    showToast("Inicia sesión para subir el logo de tu empresa.");
    switchView("acceso");
    return;
  }
  companyLogoInput.click();
});

companyLogoInput.addEventListener("change", async () => {
  const file = companyLogoInput.files?.[0];
  if (!file) return;

  try {
    await uploadCompanyLogo(file);
    showToast("Logo de empresa actualizado.");
  } catch (error) {
    renderCompanyHeader();
    showToast(friendlyError(error));
  } finally {
    companyLogoInput.value = "";
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
      await loadCandidateApplications();
    } else {
      applications.unshift({
        id: realApplication?.id,
        source: "supabase",
        jobId: activeApplicationJob.id,
        companyId: activeApplicationJob.companyId,
        rawStatus: "submitted",
        status: "Enviada",
        jobTitle: activeApplicationJob.title,
        companyName: activeApplicationJob.company
      });
    }

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
      populateCitySelect(locationCityInput, "", { includeAll: true });
      modeFilter.value = "all";
      categoryFilter.value = "all";
      renderJobs();
      await openJobDetail(publishedJob.id);
    }
  } catch (error) {
    showToast(friendlyError(error));
  }
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installAppButton.classList.remove("is-hidden");
});

installAppButton.addEventListener("click", async () => {
  if (!deferredInstallPrompt) {
    if (isIosDevice) {
      showToast("En Safari toca Compartir y después Agregar a pantalla de inicio.");
    }
    return;
  }
  deferredInstallPrompt.prompt();
  const choice = await deferredInstallPrompt.userChoice;
  if (choice.outcome === "accepted") {
    showToast("RedJob se está instalando.");
  }
  deferredInstallPrompt = null;
  installAppButton.classList.add("is-hidden");
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  installAppButton.classList.add("is-hidden");
  showToast("RedJob quedó instalada.");
});

if (window.matchMedia("(display-mode: standalone)").matches) {
  installAppButton.classList.add("is-hidden");
} else if (isIosDevice) {
  installAppButton.classList.remove("is-hidden");
}

const isLocalPreview = ["localhost", "127.0.0.1"].includes(window.location.hostname);

if ("serviceWorker" in navigator && isLocalPreview) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });
  });
}

if ("serviceWorker" in navigator && !isLocalPreview) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => registration.update())
      .catch(() => {
        // The website remains fully usable if service worker registration is unavailable.
      });
  });
}

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
