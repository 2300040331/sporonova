import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ["10.63.12.29", "10.101.28.54"],
};

export default nextConfig;
