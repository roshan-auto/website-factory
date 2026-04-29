import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@packages/sections"],
  basePath: '/manawatu-plumbing',
};

export default nextConfig;
