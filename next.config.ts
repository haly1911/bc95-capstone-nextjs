import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "fiverrnew.cybersoft.edu.vn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fiverrnew.cybersoft.edu.vn",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
