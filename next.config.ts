import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  eslint: {
    // 在构建时忽略 ESLint 错误
    ignoreDuringBuilds: true,
  },
};

export default withNextIntl(nextConfig);
