import createNextIntPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntPlugin()

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
