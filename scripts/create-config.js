const fs = require("fs");
const path = require("path");

const config = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
};

const content = `window.REDJOB_CONFIG = ${JSON.stringify(config, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, "..", "config.js"), content, "utf8");
