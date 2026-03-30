/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pwxvctdmbiuhvswfsjln.supabase.co',
      },
    ],
  },
};

export default nextConfig;
