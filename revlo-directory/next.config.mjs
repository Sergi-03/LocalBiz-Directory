/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ['localhost', 'bjnxmiarsbyxkkqxjvmd.supabase.co', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    serverActions: {}
  }
};

export default nextConfig;