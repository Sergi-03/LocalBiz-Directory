/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;