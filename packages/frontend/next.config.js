const path = require('path');
const toPath = _path => path.join(process.cwd(), _path);

const nextConfig = {
  experimental: {
    esmExternals: false,
  },
  images: {
    domains: ['storage.googleapis.com', 'firebasestorage.googleapis.com'],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  webpack(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@': toPath('src'),
        },
        fallback: {
          ...config.resolve.fallback,
          fs: false,
          child_process: false,
          net: false,
          dns: false,
          tls: false,
        },
      },
    };
  },
};

module.exports = nextConfig;
