/** @type {import("next").NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/merci.html",
        destination: "/merci",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
