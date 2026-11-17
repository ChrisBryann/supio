// Seminar thumbnails are served by the seminar/customer API backend.
function apiImagePattern() {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL ?? "");
    return [{ protocol: url.protocol.replace(":", ""), hostname: url.hostname }];
  } catch {
    return [];
  }
}

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
      ...(process.env.BACKEND_URL
        ? [{ protocol: "https", hostname: process.env.BACKEND_URL }]
        : []),
      ...apiImagePattern(),
    ],
    // loader: 'custom',
    // loaderFile: './utils/image-loader.ts'
  },
};

export default nextConfig;
