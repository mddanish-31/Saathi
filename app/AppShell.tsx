"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar } from '../src/components/layout/Navbar';
import { Footer } from '../src/components/layout/Footer';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isDashboardRoute =
    Boolean(pathname?.startsWith('/customer') || pathname?.startsWith('/professional'));
  const footerVariant = isDashboardRoute ? 'compact' : 'full';

  return (
    <div
      className="saathi-app-root"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-app)',
        color: 'var(--text-primary)',
      }}
    >
      <Navbar currentPath={pathname || '/'} onNavigate={handleNavigate} />
      <main style={{ flex: '1 0 auto' }}>{children}</main>
      <Footer onNavigate={handleNavigate} variant={footerVariant} />
    </div>
  );
};
