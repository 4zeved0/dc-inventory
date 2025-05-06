/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useCache: true, // mantém a configuração de cache experimental, se desejado
  },
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
