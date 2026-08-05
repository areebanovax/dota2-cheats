/**
 * Canonical host redirects + security headers.
 * Appearance unchanged; Cloudflare still handles gzip/brotli for assets.
 */
const CANONICAL_HOST = "dota2cheats.net";

const SECURITY_HEADERS = {
  "Content-Security-Policy":
    "default-src 'self'; img-src 'self' data: https:; media-src 'self' https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https:; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https:",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};

function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

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

    // Normalize /blog -> /blog/
    if (url.pathname === "/blog") {
      url.pathname = "/blog/";
      return Response.redirect(url.toString(), 301);
    }

    const response = await env.ASSETS.fetch(request);
    return withSecurityHeaders(response);
  },
};
