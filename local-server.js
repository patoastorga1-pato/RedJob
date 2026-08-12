const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 8065);
const host = "127.0.0.1";
const logPath = path.join(root, "local-server.log");

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

function log(message) {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  try {
    fs.appendFileSync(logPath, line);
  } catch (error) {
    // The log can be locked by an existing local server on Windows.
  }
  process.stdout.write(line);
}

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

function getLocalSupabaseConfig() {
  const configPath = path.join(root, "config.js");
  const content = fs.existsSync(configPath) ? fs.readFileSync(configPath, "utf8") : "";
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || content.match(/NEXT_PUBLIC_SUPABASE_URL:\s*"([^"]+)"/)?.[1] || "",
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || content.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY:\s*"([^"]+)"/)?.[1] || ""
  };
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

function renderLocalJobPage(job, origin) {
  const company = Array.isArray(job.company_profiles) ? job.company_profiles[0] : job.company_profiles;
  const canonical = `https://redjob.com.mx/vacantes/${slugify(job.title)}-${job.id}`;
  const localAppUrl = `/?job=${encodeURIComponent(job.id)}`;
  const description = String(job.description ?? "").replace(/\s+/g, " ").trim().slice(0, 155);
  const tags = (job.job_skills ?? []).map((skill) => skill.skill_name).filter(Boolean);
  return `<!doctype html><html lang="es-MX"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="index, follow"><title>${escapeHtml(job.title)} | RedJob</title><meta name="description" content="${escapeHtml(description)}"><link rel="canonical" href="${escapeHtml(canonical)}"><meta property="og:title" content="${escapeHtml(job.title)} | RedJob"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:url" content="${escapeHtml(canonical)}"><meta property="og:image" content="https://redjob.com.mx/assets/redjob-social-preview.png"><link rel="stylesheet" href="/styles.css?v=20260812c"></head><body><header class="site-header"><a class="brand" href="/"><img src="/assets/redjob-logo-optimizado.jpg?v=20260812c" width="88" height="78" alt="RedJob"></a><nav class="desktop-nav" aria-label="NavegaciÃ³n principal"><a class="nav-link" href="/">Vacantes</a><a class="nav-link" href="/#empresas">Empresas</a><a class="nav-link messages-nav-link" href="/#mensajes">Mensajes</a></nav></header><main class="job-public-page"><article class="job-public-card"><a class="text-button" href="/">Volver a vacantes</a><header class="job-public-head"><span class="company-logo large">${escapeHtml(String(company?.company_name ?? "R").slice(0, 2).toUpperCase())}</span><div><p class="eyebrow">${escapeHtml(company?.company_name ?? "Empresa")}</p><h1>${escapeHtml(job.title)}</h1><p>${escapeHtml(job.location ?? "MÃ©xico")} - ${escapeHtml(job.work_mode ?? "")} - ${escapeHtml(formatSalary(job.salary_min, job.salary_max))} - ${escapeHtml(job.category ?? "Otra")}</p></div></header><section><h2>DescripciÃ³n</h2><p>${escapeHtml(job.description)}</p></section>${tags.length ? `<section><h2>Requisitos</h2><div class="tags">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div></section>` : ""}<section><h2>Sobre la empresa</h2><p>${escapeHtml(company?.description || "Esta empresa publica sus vacantes en RedJob.")}</p></section><div class="job-public-actions"><a class="primary-button" href="${localAppUrl}">Postularme en RedJob</a><a class="secondary-button" href="${localAppUrl}">Guardar o ver detalle</a></div></article></main></body></html>`;
}

async function handleLocalJobPage(requestUrl, response) {
  const jobId = extractJobId(requestUrl.pathname);
  const config = getLocalSupabaseConfig();
  if (!jobId || !config.url || !config.key) {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end("<!doctype html><title>Vacante no encontrada</title><p>Vacante no encontrada.</p>");
    return true;
  }

  const select = "id,title,description,location,work_mode,category,salary_min,salary_max,status,company_profiles(company_name,description),job_skills(skill_name)";
  try {
    const supabaseUrl = `${config.url.replace(/\/$/, "")}/rest/v1/jobs?select=${encodeURIComponent(select)}&id=eq.${jobId}&status=eq.published&limit=1`;
    const apiResponse = await fetch(supabaseUrl, { headers: { apikey: config.key, Authorization: `Bearer ${config.key}` } });
    const rows = apiResponse.ok ? await apiResponse.json() : [];
    const job = rows?.[0];
    if (!job) {
      response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      response.end("<!doctype html><title>Vacante no encontrada</title><p>Vacante no encontrada.</p>");
      return true;
    }
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    response.end(renderLocalJobPage(job, `http://${host}:${port}`));
    return true;
  } catch (error) {
    const fallback = fs
      .readFileSync(path.join(root, "index.html"), "utf8")
      .replace("<head>", '<head><base href="/">');
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    response.end(fallback);
    return true;
  }
}

function legacyVacantesAssetPath(pathname) {
  if (pathname.startsWith("/vacantes/assets/")) return pathname.replace(/^\/vacantes/, "");
  const legacyFiles = new Set([
    "/styles.css",
    "/app.js",
    "/config.js",
    "/admin-report-viewer.js",
    "/manifest.json",
    "/service-worker.js"
  ]);
  const filePath = pathname.replace(/^\/vacantes/, "");
  return legacyFiles.has(filePath) ? filePath : "";
}

function serveFile(response, pathname) {
  const normalized = path.normalize(path.join(root, pathname));

  if (!normalized.startsWith(root)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  const filePath = pathname.endsWith("/") || !path.extname(normalized) ? path.join(normalized, "index.html") : normalized;
  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(data);
  });
}

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${host}:${port}`);
  const legacyPath = legacyVacantesAssetPath(decodeURIComponent(requestUrl.pathname));
  if (legacyPath) {
    log(`200 ${request.method} ${request.url} -> ${legacyPath}`);
    serveFile(response, legacyPath);
    return;
  }

  if (requestUrl.pathname.startsWith("/vacantes/") && (await handleLocalJobPage(requestUrl, response))) {
    log(`200 ${request.method} ${request.url}`);
    return;
  }

  const pathname = decodeURIComponent(requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname);
  log(`${request.method} ${request.url}`);
  serveFile(response, pathname);
});

server.on("error", (error) => {
  log(`ERROR ${error.stack || error.message}`);
  process.exit(1);
});

server.listen(port, host, () => {
  log(`RedJob local server running at http://${host}:${port}/`);
  log(`Serving ${root}`);
});

