import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Routes from the previous multi-page site, kept alive for existing links.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/projects", destination: "/#projects", permanent: true },
      { source: "/projects/:slug*", destination: "/#projects", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/blog", destination: "/#knowledge", permanent: true },
      { source: "/blog/:slug*", destination: "/#knowledge", permanent: true },
      { source: "/services", destination: "/", permanent: true },
      { source: "/book", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
