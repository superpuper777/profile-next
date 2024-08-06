/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "frontend-test-api.yoldi.agency",
      },
    ],
  },
};

export default nextConfig;
