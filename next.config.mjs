/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: 'https',
        hostname: process.env.BACKEND_URL,
      }
    ],
    // loader: 'custom',
    // loaderFile: './utils/image-loader.ts'
  },
};

export default nextConfig;
