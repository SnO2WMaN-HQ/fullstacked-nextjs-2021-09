/**
 * @type {import('next/dist/next-server/server/config-shared').NextConfig}
 */
const nextConfig = {
  pageExtensions: ['page.tsx'],
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
