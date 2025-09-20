import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/seats-app',
  assetPrefix: '/seats-app/',
  trailingSlash: true,
};

export default config;
