function getEnv(name, fallback = "") {
  return globalThis.Netlify?.env?.get(name) ?? fallback;
}

const SITE_URL = (getEnv("SITE_URL") || getEnv("URL") || "https://redjob.com.mx").replace(/\/$/, "");
const SUPABASE_URL = (getEnv("SUPABASE_URL") || getEnv("NEXT_PUBLIC_SUPABASE_URL") || "").replace(/\/$/, "");
const SUPABASE_ANON_KEY = getEnv("SUPABASE_ANON_KEY") || getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") || "";
const SUPABASE_SERVICE_ROLE_KEY = getEnv("SUPABASE_SERVICE_ROLE_KEY") || "";
const JOB_SELECT =
  "id,title,description,location,work_mode,category,salary_min,salary_max,status,created_at,updated_at,company_profiles(id,company_name,description,logo_path,is_verified),job_skills(skill_name)";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slugify(value) {
  return String(value ?? "vacante")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72) || "vacante";
}

function extractJobId(pathname) {
  return pathname.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i)?.[1] ?? "";
}

function getInitials(value) {
  const parts = String(value || "RJ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);
  return (parts.map((part) => part[0]).join("") || "RJ").toUpperCase();
}

function getCompanyLogoUrl(path) {
  if (!path) return "";
  if (/^data:image\/(png|jpe?g|webp);base64,/i.test(path)) return path;
  if (/^https?:\/\//i.test(path)) return path;
  if (!SUPABASE_URL) return "";
  const safePath = String(path)
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  return `${SUPABASE_URL}/storage/v1/object/public/company-logos/${safePath}`;
}

function renderCompanyLogo(company, extraClass = "large") {
  const name = company?.company_name || "Empresa";
  const initials = getInitials(name);
  const logoUrl = getCompanyLogoUrl(company?.logo_path);
  const classes = `company-logo ${extraClass} ${logoUrl ? "has-image" : ""}`.trim();
  if (!logoUrl) return `<span class="${classes}">${escapeHtml(initials)}</span>`;
  return `<span class="${classes}" data-logo-fallback="${escapeHtml(initials)}"><img src="${escapeHtml(logoUrl)}" alt="Imagen de ${escapeHtml(name)}" loading="eager" decoding="async"></span>`;
}

function formatLocationLabel(location) {
  const labels = {
    "Todo Mexico": "Todo Mexico",
    "Ciudad de Mexico": "Ciudad de Mexico",
    "Estado de Mexico": "Estado de Mexico",
    "Nuevo Leon": "Nuevo Leon",
    Queretaro: "Queretaro",
    Yucatan: "Yucatan"
  };
  return labels[String(location ?? "")] ?? String(location ?? "Mexico");
}

function formatWorkModeLabel(mode) {
  return { remote: "Remoto", hybrid: "Hibrido", onsite: "Presencial" }[String(mode)] ?? String(mode ?? "");
}

function formatCategoryLabel(category) {
  return {
    Tecnologia: "Tecnologia",
    "Atencion al Cliente": "Atencion al Cliente",
    Administracion: "Administracion",
    Logistica: "Logistica",
    Educacion: "Educacion"
  }[String(category)] ?? String(category ?? "Otra");
}

function formatSalary(min, max) {
  const minimum = Number(min);
  const maximum = Number(max);
  const money = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
  if (minimum && maximum) return `${money.format(minimum)} - ${money.format(maximum)} MXN`;
  if (minimum) return `Desde ${money.format(minimum)} MXN`;
  if (maximum) return `Hasta ${money.format(maximum)} MXN`;
  return "Salario no publicado";
}

function plainText(value, maxLength = 160) {
  const text = String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}...`;
}

async function fetchJob(jobId) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error("Supabase no esta configurado.");
  const key = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
  const response = await fetch(`${SUPABASE_URL}/rest/v1/jobs?select=${encodeURIComponent(JOB_SELECT)}&id=eq.${jobId}&limit=1`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`
    }
  });
  if (!response.ok) throw new Error(`Supabase respondio ${response.status}.`);
  const rows = await response.json();
  return rows?.[0] ?? null;
}

function renderUnavailable(status) {
  const noindex = status === "paused" || status === "closed";
  const code = status === "closed" ? 410 : status === "paused" ? 200 : 404;
  const title = status === "closed" ? "Vacante cerrada | RedJob" : "Vacante no disponible | RedJob";
  const body = status === "closed" ? "Esta vacante ya no esta activa." : "Esta vacante no esta disponible publicamente en este momento.";
  return new Response(
    `<!doctype html><html lang="es-MX"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${noindex ? '<meta name="robots" content="noindex, follow">' : ""}<title>${title}</title><link rel="stylesheet" href="/styles.css?v=20260812d"></head><body><main class="job-public-page"><section class="job-public-card"><p class="eyebrow">RedJob</p><h1>${title}</h1><p>${body}</p><a class="primary-button" href="/">Ver vacantes activas</a></section></main></body></html>`,
    {
      status: code,
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" }
    }
  );
}

function renderJob(job) {
  const company = Array.isArray(job.company_profiles) ? job.company_profiles[0] : job.company_profiles;
  const canonical = `${SITE_URL}/vacantes/${slugify(job.title)}-${job.id}`;
  const salary = formatSalary(job.salary_min, job.salary_max);
  const location = formatLocationLabel(job.location);
  const mode = formatWorkModeLabel(job.work_mode);
  const category = formatCategoryLabel(job.category);
  const description = plainText(job.description, 155) || `${job.title} en ${location}. Postulate en RedJob.`;
  const title = `${job.title} en ${location} | RedJob`;
  const appUrl = `/?job=${encodeURIComponent(job.id)}`;
  const tags = (job.job_skills ?? []).map((skill) => skill.skill_name).filter(Boolean);

  return `<!doctype html>
<html lang="es-MX">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="index, follow">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="${escapeHtml(canonical)}">
    <meta property="og:type" content="article">
    <meta property="og:locale" content="es_MX">
    <meta property="og:site_name" content="RedJob">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${escapeHtml(canonical)}">
    <meta property="og:image" content="${SITE_URL}/assets/redjob-social-preview.png">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" type="image/png" sizes="64x64" href="/assets/redjob-favicon-64.png?v=20260812c">
    <link rel="stylesheet" href="/styles.css?v=20260812d">
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="/" aria-label="RedJob inicio"><img src="/assets/redjob-logo-header.png?v=20260812d" width="88" height="78" alt="RedJob" decoding="async"></a>
      <nav class="desktop-nav" aria-label="Navegacion principal">
        <a class="nav-link" href="/">Vacantes</a>
        <a class="nav-link" href="/#empresas">Empresas</a>
        <a class="nav-link messages-nav-link" href="/#mensajes">Mensajes</a>
      </nav>
      <div class="header-actions">
        <a class="auth-header-button" href="/#acceso">Iniciar sesion</a>
        <a class="auth-header-button primary" href="/#acceso">Crear cuenta</a>
      </div>
    </header>
    <main class="job-public-page">
      <article class="job-public-card">
        <a class="text-button" href="/">Volver a vacantes</a>
        <header class="job-public-head">
          ${renderCompanyLogo(company)}
          <div>
            <p class="eyebrow">${escapeHtml(company?.company_name ?? "Empresa")}</p>
            <h1>${escapeHtml(job.title)}</h1>
            <p>${escapeHtml(location)} - ${escapeHtml(mode)} - ${escapeHtml(salary)} - ${escapeHtml(category)}</p>
          </div>
        </header>
        <section>
          <h2>Descripcion</h2>
          <p>${escapeHtml(job.description)}</p>
        </section>
        ${tags.length ? `<section><h2>Requisitos</h2><div class="tags">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div></section>` : ""}
        <section>
          <h2>Sobre la empresa</h2>
          <p>${escapeHtml(company?.description || "Esta empresa publica sus vacantes en RedJob.")}</p>
        </section>
        <div class="job-public-actions">
          <a class="primary-button" href="${escapeHtml(appUrl)}">Postularme en RedJob</a>
          <a class="secondary-button" href="${escapeHtml(appUrl)}">Guardar o ver detalle</a>
        </div>
      </article>
    </main>
  </body>
</html>`;
}

export default async (request) => {
  const url = new URL(request.url);
  const jobId = extractJobId(url.pathname);
  if (!jobId) return renderUnavailable("missing");

  try {
    const job = await fetchJob(jobId);
    if (!job) return renderUnavailable("missing");
    if (job.status !== "published") return renderUnavailable(job.status);

    const canonicalPath = `/vacantes/${slugify(job.title)}-${job.id}`;
    if (url.pathname !== canonicalPath) {
      return new Response(null, {
        status: 301,
        headers: { Location: canonicalPath }
      });
    }

    return new Response(renderJob(job), {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=300, stale-while-revalidate=3600"
      }
    });
  } catch (error) {
    return new Response(
      `<!doctype html><html lang="es-MX"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>RedJob</title></head><body><p>No pudimos cargar esta vacante en este momento.</p></body></html>`,
      {
        status: 500,
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" }
      }
    );
  }
};
