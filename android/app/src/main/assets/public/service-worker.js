const CACHE_NAME = "redjob-shell-20260814a";
const APP_SHELL = [
  "/",
  "/index.html",
  "/blog/",
  "/blog/index.html",
  "/eliminar-cuenta/",
  "/eliminar-cuenta/index.html",
  "/blog/blog.js?v=20260812c",
  "/offline.html",
  "/styles.css?v=20260814a",
  "/app.js?v=20260814a",
  "/admin-report-viewer.js?v=20260801e",
  "/manifest.json?v=20260609b",
  "/assets/redjob-logo-header.png?v=20260812d",
  "/assets/redjob-icon-192.png?v=20260609b",
  "/assets/redjob-icon-512.png?v=20260609b",
  "/assets/redjob-icon-maskable-512.png?v=20260609b",
  "/assets/redjob-favicon-64.png?v=20260812c",
  "/assets/redjob-briefcase-access.png?v=20260812d"
];

const NETWORK_FIRST_PATHS = new Set([
  "/",
  "/index.html",
  "/blog/",
  "/blog/index.html",
  "/styles.css",
  "/app.js",
  "/admin-report-viewer.js",
  "/service-worker.js"
]);

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname === "/config.js") return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (url.pathname === "/" || url.pathname === "/index.html") {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put("/index.html", copy));
          }
          return response;
        })
        .catch(async () => (await caches.match("/index.html")) || caches.match("/offline.html"))
    );
    return;
  }

  if (NETWORK_FIRST_PATHS.has(url.pathname)) {
    event.respondWith(
      fetch(request, { cache: "reload" })
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => (await caches.match(request)) || caches.match("/offline.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (!response.ok) return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});
