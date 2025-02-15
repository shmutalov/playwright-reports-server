/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  basePath: process.env.API_BASE_PATH || ''
};

module.exports = nextConfig;
