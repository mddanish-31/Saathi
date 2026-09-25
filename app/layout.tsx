import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import '../src/styles/global.css';
import { Providers } from '../src/components/Providers';
import { AppShell } from './AppShell';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'SAATHI — Find the Right People for Every Occasion',
  description:
    'SAATHI is a premium platform connecting you with trusted professionals and specialists for all occasions, events, and everyday needs.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%235B3A4A'/><text x='16' y='22' text-anchor='middle' font-family='serif' font-size='18' font-weight='bold' fill='%23FAF7F4'>S</text></svg>",
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
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
