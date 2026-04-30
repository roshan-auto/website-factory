import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@packages/ui", "@packages/sections"],
};

export default nextConfig;
