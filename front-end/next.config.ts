// frontend/next.config.ts

import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Disable ESLint during builds to avoid deployment failures
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    // 1) Permettre l’import de JSON en-dehors de src/
    config.module.rules.push({
      test: /\.json$/,
      include: [path.resolve(__dirname, '../target/idl')],
      type: 'javascript/auto',
    });

    // 2) Conserver vos externals existants
    config.externals = [
      ...(config.externals || []),
      'pino-pretty',
      'lokijs',
      'encoding',
    ];

    return config;
  },
};

export default nextConfig;
