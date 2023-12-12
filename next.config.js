/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:1502/api/:path*' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
