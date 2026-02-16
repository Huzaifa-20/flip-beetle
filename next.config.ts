import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization configuration
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },

  // Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Performance optimizations
  reactStrictMode: true,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

export default nextConfig;
