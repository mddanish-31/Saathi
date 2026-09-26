"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="saathi-app-root flex flex-col min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Navbar currentPath={pathname || '/'} onNavigate={handleNavigate} />
      <main className="flex-1 w-full relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.25,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onNavigate={handleNavigate} variant={footerVariant} />
    </div>
  );
};
