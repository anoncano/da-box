// next.config.ts
import type { NextConfig } from 'next';
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  output: 'export',
  turbopack: {
    /* let “@/…” point at <repo-root>/src */
    resolveAlias: {
      '@': './src',
    },
  },

  /** uncomment this to silence LAN-IP warning
  allowedDevOrigins: ['http://192.168.20.8:3000'],
  */
};

export default withFlowbiteReact(nextConfig);