import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/socially.html",
        destination: "/socially",
        permanent: true,
      },
      {
        source: "/projects.html",
        destination: "/projets",
        permanent: true,
      },
      {
        source: "/workflow.html",
        destination: "/agence/workflow",
        permanent: true,
      },
      {
        source: "/contact.html",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
