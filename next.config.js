/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: false,
  api: {
    externalResolver: true,
  },
  env: {
  },
};

module.exports = nextConfig;
