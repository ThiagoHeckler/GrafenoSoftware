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
  /*
   * O domínio antigo (grafenosoftware.com.br) continua registrado e leva para
   * o novo com 301, mantendo o caminho, para não perder links já divulgados.
   */
  async redirects() {
    return ["grafenosoftware.com.br", "www.grafenosoftware.com.br"].map((value) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value }],
      destination: "https://covalia.com.br/:path*",
      permanent: true,
    }));
  },
};

export default nextConfig;
