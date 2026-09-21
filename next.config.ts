import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // السماح لأجهزة المعاينة/الاختبار المحلية بالوصول لموارد التطوير
  // (بدونها بيتم منع /_next/hmr لما الصفحة تفتح من 127.0.0.1)
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
