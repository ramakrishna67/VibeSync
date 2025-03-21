import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "mosaic.scdn.co",
      "i.scdn.co",
      "t.scdn.co",
      "wrapped-images.spotifycdn.com",
    ],
  },
};

export default nextConfig;
