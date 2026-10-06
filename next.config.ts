import type { NextConfig } from "next";

// Static export: the homepage has no server work, so it ships as plain HTML/CSS/JS
// and can be hosted on Vercel, Netlify or any static host.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
