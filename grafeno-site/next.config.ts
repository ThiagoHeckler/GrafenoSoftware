import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * A hospedagem da Hostinger limita quantos processos o build pode abrir:
   * o Turbopack e os workers do webpack morrem ao iniciar. Por isso o build
   * usa webpack (--webpack no package.json) num processo só.
   */
  experimental: {
    webpackBuildWorker: false,
    cpus: 1,
  },
};

export default nextConfig;
