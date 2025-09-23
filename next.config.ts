import type { NextConfig } from 'next';

export default {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/seats-app',
  assetPrefix: '/seats-app/',
} satisfies NextConfig;
