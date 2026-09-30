import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the root to this folder: a stray package-lock.json higher up (in the user folder) otherwise makes Next warn
  // that it picked the wrong workspace root.
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
