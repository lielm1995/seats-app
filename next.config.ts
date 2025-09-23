import type { NextConfig } from 'next';

const repoBase = process.env.NEXT_PUBLIC_BASE_PATH; // e.g. "/seats-app"

export default {
  output: 'export',
  images: { unoptimized: true },
  ...(repoBase ? { basePath: repoBase, assetPrefix: `${repoBase}/` } : {}),
} satisfies NextConfig;
