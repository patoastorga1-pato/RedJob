const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.json",
  "service-worker.js",
  "offline.html",
  "capacitor.config.json",
  "package.json"
];

const requiredAssets = [
  "assets/redjob-icon-192.png",
  "assets/redjob-icon-512.png",
  "assets/redjob-icon-maskable-512.png",
  "assets/redjob-favicon.png"
];

const checks = [];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function pass(label) {
  checks.push({ ok: true, label });
}

function fail(label) {
  checks.push({ ok: false, label });
}

for (const file of requiredFiles) {
  exists(file) ? pass(`Existe ${file}`) : fail(`Falta ${file}`);
}

for (const asset of requiredAssets) {
  exists(asset) ? pass(`Existe ${asset}`) : fail(`Falta ${asset}`);
}

if (exists("config.js")) {
  const config = fs.readFileSync(path.join(root, "config.js"), "utf8");
  if (/https:\/\/.+\.supabase\.co/.test(config) && /sb_publishable_|anon/i.test(config)) {
    pass("config.js tiene datos de Supabase para generar la app localmente");
  } else {
    fail("config.js existe, pero no parece tener Supabase configurado");
  }
} else {
  fail("Falta config.js local. No lo subas a GitHub, pero debe existir al generar Android/iOS");
}

try {
  const capacitor = JSON.parse(fs.readFileSync(path.join(root, "capacitor.config.json"), "utf8"));
  capacitor.appId === "mx.com.redjob.app"
    ? pass("Capacitor appId fijo: mx.com.redjob.app")
    : fail("Revisa capacitor.config.json: appId debe mantenerse fijo");
  capacitor.appName === "RedJob" ? pass("Capacitor appName: RedJob") : fail("Revisa capacitor.config.json: appName");
  capacitor.webDir === "dist-mobile" ? pass("Capacitor usa dist-mobile") : fail("Capacitor debe usar webDir dist-mobile");
} catch (error) {
  fail("capacitor.config.json no se pudo leer como JSON");
}

const failed = checks.filter((check) => !check.ok);

for (const check of checks) {
  console.log(`${check.ok ? "OK" : "FALTA"} - ${check.label}`);
}

if (failed.length) {
  console.error(`\nRevisa ${failed.length} punto(s) antes de generar la app.`);
  process.exit(1);
}

console.log("\nRedJob esta listo para preparar el paquete movil.");
