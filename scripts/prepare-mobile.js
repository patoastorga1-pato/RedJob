const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const output = path.join(root, "dist-mobile");

const files = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.json",
  "offline.html",
  "service-worker.js",
  "config.js"
];

const directories = ["assets"];

function copyFile(source, target) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function copyDirectory(source, target) {
  fs.mkdirSync(target, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      copyFile(sourcePath, targetPath);
    }
  }
}

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const file of files) {
  const source = path.join(root, file);

  if (fs.existsSync(source)) {
    copyFile(source, path.join(output, file));
  } else if (file === "config.js") {
    copyFile(path.join(root, "config.example.js"), path.join(output, "config.js"));
  }
}

for (const directory of directories) {
  copyDirectory(path.join(root, directory), path.join(output, directory));
}

console.log("RedJob mobile assets prepared in dist-mobile.");
