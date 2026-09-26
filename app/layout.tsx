import type { Metadata, Viewport } from 'next';
import { Fraunces } from 'next/font/google';
import '../src/styles/global.css';
import { Providers } from '../src/components/Providers';
import { AppShell } from './AppShell';
import { CookieBanner } from '../src/components/common/CookieBanner';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Saathi — Simpler 2 Gather | Wedding & Events Marketplace',
  description:
    'Saathi is India’s editorial marketplace connecting couples and event hosts with verified wedding planners, entertainers, caterers, and milestone specialists.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%235B3A4A'/><text x='16' y='22' text-anchor='middle' font-family='serif' font-size='18' font-weight='bold' fill='%23FBF6F3'>S∞</text></svg>",
  },
};

export const viewport: Viewport = {
  themeColor: '#5B3A4A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fraunces.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('saathi_theme_preference');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.setAttribute('data-theme','dark');document.documentElement.classList.add('dark');}else{document.documentElement.setAttribute('data-theme','light');document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <Providers>
          <AppShell>
            {children}
            <CookieBanner />
          </AppShell>
        </Providers>
      </body>
    </html>
  );
}
