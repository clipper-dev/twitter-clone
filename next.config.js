/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['coderburg.com','randomuser.me'],
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig
