import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * Image optimization configuration
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },

  /**
   * Webpack configuration
   * (WASM support only – no server polyfills)
   */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/wasm/[name].[hash][ext]',
        publicPath: '/_next/static/wasm/',
      },
    });

    return config;
  },

  /**
   * TypeScript safety
   * (DO NOT ignore build errors in production)
   */
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
