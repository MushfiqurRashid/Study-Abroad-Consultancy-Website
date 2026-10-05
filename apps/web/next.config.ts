import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  outputFileTracingRoot: process.cwd(),
  images: {
    unoptimized: true,
  },
  async rewrites() {
    const apiOrigin = process.env.API_PROXY_ORIGIN ?? "http://localhost:8000";
    return [
      {
        source: "/api/:path*",
        destination: `${apiOrigin}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
