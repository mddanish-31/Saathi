"use client";

import { useRouter } from 'next/navigation';
import { LandingPage } from '../src/views/LandingPage';

export default function HomePage() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return <LandingPage onNavigate={handleNavigate} />;
}
