"use client";

import { useRouter } from 'next/navigation';
import { SignupPage } from '../../src/views/SignupPage';

export default function Page() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return <SignupPage onNavigate={handleNavigate} />;
}
