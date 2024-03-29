/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'baserow-media.ams3.digitaloceanspaces.com'
    ]
  }
};

module.exports = nextConfig;
