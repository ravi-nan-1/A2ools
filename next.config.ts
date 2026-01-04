// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * Server-only packages (Genkit and dependencies)
   * This prevents them from being bundled for client-side
   */
  serverExternalPackages: [
    'genkit',
    '@genkit-ai/googleai',
    '@genkit-ai/core',
    '@google/generative-ai',
    '@grpc/grpc-js',
    '@opentelemetry/sdk-node',
    '@opentelemetry/exporter-trace-otlp-grpc',
    '@opentelemetry/otlp-grpc-exporter-base',
  ],

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
   */
  webpack: (config, { isServer }) => {
    // WASM support
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/wasm/[name].[hash][ext]',
        publicPath: '/_next/static/wasm/',
      },
    });

    // Client-side fallbacks for Node.js modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        os: false,
        path: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
        dns: false,
        child_process: false,
      };
    }

    return config;
  },

  /**
   * TypeScript safety
   */
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;