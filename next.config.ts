import type { NextConfig } from 'next';

const repoName = 'seats-app'; // <-- change this to your actual repo name

const config: NextConfig = {
  output: 'export', // produce static files in /out
  images: { unoptimized: true }, // required for static hosting
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
};

export default config;
