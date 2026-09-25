"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { SignupPage } from '../../src/views/SignupPage';

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams?.get('returnTo') || undefined;

  const handleNavigate = (path: string) => {
    router.push(path);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return <SignupPage onNavigate={handleNavigate} returnTo={returnTo} />;
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SignupContent />
    </Suspense>
  );
}

