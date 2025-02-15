/** @type {import('next').NextConfig} */
const API_BASE_PATH = process.env.API_BASE_PATH || ''
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  basePath: API_BASE_PATH,
  env: {
    API_BASE_PATH,
  }
};

module.exports = nextConfig;
