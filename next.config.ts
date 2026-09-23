import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gera .next/standalone com um server.js mínimo para deploy sem node_modules completo
  output: "standalone",
};

export default nextConfig;
