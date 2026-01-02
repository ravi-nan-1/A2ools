import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@opentelemetry/api', '@opentelemetry/sdk-trace-base', 'genkit'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Use Webpack 5's asset modules for WASM files.
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/wasm/[name].[hash][ext]',
        publicPath: '/_next/static/wasm/',
      }
    });
    
    if (!isServer) {
        config.resolve.fallback = {
            fs: false,
            path: false,
            crypto: false,
        };
    }

    return config;
  },
};

export default nextConfig;
