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

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${host}:${port}`);
  const pathname = decodeURIComponent(requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname);
  const normalized = path.normalize(path.join(root, pathname));

  if (!normalized.startsWith(root)) {
    log(`403 ${request.method} ${request.url}`);
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  const filePath = pathname.endsWith("/") || !path.extname(normalized) ? path.join(normalized, "index.html") : normalized;

  fs.readFile(filePath, (error, data) => {
    if (error) {
      log(`404 ${request.method} ${request.url}`);
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    log(`200 ${request.method} ${request.url}`);
    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(data);
  });
});

server.on("error", (error) => {
  log(`ERROR ${error.stack || error.message}`);
  process.exit(1);
});

server.listen(port, host, () => {
  log(`RedJob local server running at http://${host}:${port}/`);
  log(`Serving ${root}`);
});
