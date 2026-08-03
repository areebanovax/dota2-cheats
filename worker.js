/**
 * Canonical host enforcement for SEO (www / HTTP → https://dota2cheats.net).
 * Host redirects must NOT go in `_redirects` — Cloudflare Workers API rejects
 * absolute URLs there (error 100324) and breaks deploys.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const proto = (request.headers.get("x-forwarded-proto") || url.protocol.replace(":", "")).toLowerCase();

    let needsRedirect = false;

    if (host === "www.dota2cheats.net") {
      url.hostname = "dota2cheats.net";
      needsRedirect = true;
    }

    if (proto === "http") {
      url.protocol = "https:";
      needsRedirect = true;
    }

    if (needsRedirect) {
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
