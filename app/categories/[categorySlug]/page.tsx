"use client";

import { useRouter, useParams } from 'next/navigation';
import { WeddingsEventsPage } from '../../../src/views/WeddingsEventsPage';
import { PlaceholderPage } from '../../../src/views/PlaceholderPage';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const categorySlug = params?.categorySlug as string;

  const handleNavigate = (path: string) => {
    router.push(path);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (categorySlug === 'weddings-events') {
    return <WeddingsEventsPage onNavigate={handleNavigate} />;
  }

  return (
    <PlaceholderPage
      title={categorySlug ? categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Category'}
      onNavigate={handleNavigate}
    />
  );
}
