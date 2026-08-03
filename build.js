const fs = require("fs");
const path = require("path");

// Relative-only _redirects (Workers rejects absolute URLs — API 100324).
// www / HTTP → apex HTTPS is handled in worker.js for Seobility SEO.
const redirectsPath = path.join(__dirname, "_redirects");
fs.writeFileSync(redirectsPath, "/index.html / 301\n", "utf8");
console.log("build: wrote relative-only _redirects; host redirects via worker.js");
