const fs = require("fs");
const path = require("path");
const redirectsPath = path.join(__dirname, "_redirects");
fs.writeFileSync(
  redirectsPath,
  "/index.html / 301\n/blog /blog/ 301\n/blog/index.html /blog/ 301\n",
  "utf8"
);
console.log("build: wrote relative-only _redirects; host redirects via worker.js");
