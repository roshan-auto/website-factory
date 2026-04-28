import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@packages/sections"],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/manawatu-flow-plumbing',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
