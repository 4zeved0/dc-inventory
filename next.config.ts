/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    useCache: true,
  },
  output: 'standalone', // Recomendado para deploys mais robustos (ex: Docker, Vercel)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gbnuxefotlregokf.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
