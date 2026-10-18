import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: let phones on the home Wi-Fi load the dev server's JS (blocked by default
  // for non-localhost origins, which leaves Reveal'd content stuck at opacity-0)
  allowedDevOrigins: ["192.168.1.*"],
};

export default nextConfig;
