/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lxqmtqldxtvuvnibgiwi.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com;",
              "font-src 'self' https://fonts.gstatic.com https://cdn.fontshare.com data:;",
              "img-src 'self' data: blob: https://lxqmtqldxtvuvnibgiwi.supabase.co https://images.unsplash.com;",
              "connect-src 'self' https://lxqmtqldxtvuvnibgiwi.supabase.co wss://lxqmtqldxtvuvnibgiwi.supabase.co;",
              "frame-ancestors 'none';",
            ].join(' '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
