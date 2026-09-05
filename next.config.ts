import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the dev-only route indicator FAB. Build and runtime errors still surface.
  devIndicators: false,

  // Hero, campaign and product media live on the RT backend but are always
  // addressed same-origin at /uploads/, so the admin host (biz.salroid.me)
  // never appears in a public page. nginx maps /uploads/ to the backend in
  // production; the rewrite below does it in development.
  images: {
    // Next 16 blocks optimising upstream images that resolve to a private IP
    // (SSRF protection). The rewrite target is exactly that in development.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    // Floor for the optimiser's own cache. Next uses whichever is larger, this
    // or the upstream's max-age, so public/img keeps its full day while
    // admin-uploaded hero and campaign art stays on the shorter 5-minute
    // window and still refreshes promptly after a re-upload.
    minimumCacheTTL: 300,
    remotePatterns: [{ protocol: "http", hostname: "localhost", port: "4000" }],
  },

  // Photographs in public/ change only on deploy, but Next serves public
  // assets with max-age=0, so every repeat visit revalidates each one. A day
  // fresh plus a month of stale-while-revalidate keeps them instant without
  // stranding a replaced file.
  async headers() {
    return [
      {
        source: "/img/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=2592000",
          },
        ],
      },
      {
        source: "/brand/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=2592000",
          },
        ],
      },
    ];
  },

  async rewrites() {
    const rt = process.env.RT_BASE ?? "http://127.0.0.1:4000";
    return [{ source: "/uploads/:path*", destination: `${rt}/uploads/:path*` }];
  },
};

export default nextConfig;
