import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/ImbariWeb",
  assetPrefix: "/ImbariWeb",
};

export default nextConfig;
