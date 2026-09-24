"use client";

import { useRouter, useParams } from 'next/navigation';
import { PlaceholderPage } from '../../../../../src/views/PlaceholderPage';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const serviceSlug = params?.serviceSlug as string;

  const handleNavigate = (path: string) => {
    router.push(path);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <PlaceholderPage
      title={serviceSlug ? serviceSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Service'}
      onNavigate={handleNavigate}
    />
  );
}
