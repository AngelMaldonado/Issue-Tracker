/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'referr-policy', value: 'no-referrer' }
        ]
      }
    ]
  }
};

export default nextConfig;
