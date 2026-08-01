const fs = require("fs");
const path = require("path");

// Always overwrite _redirects with Workers-safe relative rules before deploy.
// Absolute host redirects (http/https) cause Cloudflare API error 100324.
const redirectsPath = path.join(__dirname, "_redirects");
fs.writeFileSync(redirectsPath, "/index.html / 301\n", "utf8");
console.log("build: wrote relative-only _redirects");
