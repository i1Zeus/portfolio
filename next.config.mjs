const isDev = process.env.NODE_ENV !== "production";

// Everything is self-hosted (fonts via next/font, images in /public), so the
// policy only needs to allow inline scripts/styles that Next.js and framer-motion
// emit, data: QR images, and the blob: worker canvas-confetti spawns.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "worker-src 'self' blob:",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const legacyProjectSlugs = {
  0: "izeus-erp",
  1: "nexogroup",
  2: "taeen",
  3: "estore",
  4: "hoster",
  5: "abdulkareem-charity",
  6: "ima-portal",
};

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets CI and local verification build into a separate folder without touching a running dev server.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  images: {
    // Images in /public are pre-converted to WebP, so the runtime optimizer is never needed.
    unoptimized: true,
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/project/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/sitemap",
        destination: "/sitemap.xml",
        permanent: true,
      },
      // Projects used to live at /project/<id>; ids are frozen, so this map never changes.
      ...Object.entries(legacyProjectSlugs).map(([id, slug]) => ({
        source: `/:locale(en|ar)/project/${id}`,
        destination: `/:locale/project/${slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
