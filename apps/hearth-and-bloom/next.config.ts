import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@packages/ui"],
  basePath: "/hearth-and-bloom",
};

export default nextConfig;
