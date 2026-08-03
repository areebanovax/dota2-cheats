/**
 * Single canonical host for SEO:
 * any non-https or www (or other) host → https://dota2cheats.net + path/query
 *
 * Do NOT put host redirects in `_redirects` (Cloudflare API 100324).
 */
const CANONICAL_HOST = "dota2cheats.net";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const proto = (
      request.headers.get("x-forwarded-proto") ||
      url.protocol.replace(":", "")
    ).toLowerCase();

    const needsHostFix = host !== CANONICAL_HOST;
    const needsHttps = proto === "http";

    if (needsHostFix || needsHttps) {
      const target = new URL(request.url);
      target.protocol = "https:";
      target.hostname = CANONICAL_HOST;
      target.port = "";
      return Response.redirect(target.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
