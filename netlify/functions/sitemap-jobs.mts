function getEnv(name, fallback = "") {
  return globalThis.Netlify?.env?.get(name) ?? fallback;
}

const SITE_URL = (getEnv("SITE_URL") || getEnv("URL") || "https://redjob.com.mx").replace(/\/$/, "");
const SUPABASE_URL = (getEnv("SUPABASE_URL") || getEnv("NEXT_PUBLIC_SUPABASE_URL") || "").replace(/\/$/, "");
const SUPABASE_ANON_KEY = getEnv("SUPABASE_ANON_KEY") || getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") || "";
const SUPABASE_SERVICE_ROLE_KEY = getEnv("SUPABASE_SERVICE_ROLE_KEY") || "";
const JOB_SELECT = "id,title,updated_at,created_at,status";
const PAGE_SIZE = 1000;
const MAX_URLS_PER_SITEMAP = 45000;

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
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

function formatLastmod(value) {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toISOString() : "";
}

function renderSitemap(jobs) {
  const urls = jobs
    .filter((job) => job?.id && job?.title && job?.status === "published")
    .map((job) => {
      const loc = `${SITE_URL}/vacantes/${slugify(job.title)}-${job.id}`;
      const lastmod = formatLastmod(job.updated_at || job.created_at);
      return [
        "  <url>",
        `    <loc>${escapeXml(loc)}</loc>`,
        lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>` : "",
        "  </url>"
      ].filter(Boolean).join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function fetchPublishedJobs() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error("Supabase no esta configurado.");
  const key = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
  const jobs = [];

  for (let offset = 0; offset < MAX_URLS_PER_SITEMAP; offset += PAGE_SIZE) {
    const limit = Math.min(PAGE_SIZE, MAX_URLS_PER_SITEMAP - offset);
    const url = `${SUPABASE_URL}/rest/v1/jobs?select=${encodeURIComponent(JOB_SELECT)}&status=eq.published&order=updated_at.desc.nullslast,created_at.desc&limit=${limit}&offset=${offset}`;
    const response = await fetch(url, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`
      }
    });

    if (!response.ok) throw new Error(`Supabase respondio ${response.status}.`);

    const rows = await response.json();
    jobs.push(...(Array.isArray(rows) ? rows : []));
    if (!Array.isArray(rows) || rows.length < limit) break;
  }

  return jobs;
}

export default async (request) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  }

  try {
    const sitemap = renderSitemap(await fetchPublishedJobs());
    return new Response(request.method === "HEAD" ? null : sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=900, stale-while-revalidate=3600"
      }
    });
  } catch (error) {
    return new Response("No pudimos generar el sitemap de vacantes.", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }
};
