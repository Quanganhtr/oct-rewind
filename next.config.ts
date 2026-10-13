import type { NextConfig } from "next";

// Set by the GitHub Pages workflow so assets resolve under /<repo>
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
  // Dev only: let phones on the same Wi-Fi / hotspot open the dev server by the Mac's IP
  allowedDevOrigins: ["172.20.10.*", "192.168.*.*", "10.*.*.*"],
};

export default nextConfig;
