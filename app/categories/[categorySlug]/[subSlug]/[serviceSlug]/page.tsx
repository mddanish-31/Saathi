"use client";

import { useRouter, useParams } from 'next/navigation';
import { WeddingPlanningPage } from '../../../../../src/views/WeddingPlanningPage';
import { MusicEntertainmentPage } from '../../../../../src/views/MusicEntertainmentPage';
import { PlaceholderPage } from '../../../../../src/views/PlaceholderPage';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const categorySlug = params?.categorySlug as string;
  const subSlug = params?.subSlug as string;
  const serviceSlug = params?.serviceSlug as string;

  const handleNavigate = (path: string) => {
    router.push(path);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (categorySlug === 'weddings-events') {
    if (subSlug === 'planning') {
      return (
        <WeddingPlanningPage
          activeServiceSlug={serviceSlug}
          onNavigate={handleNavigate}
        />
      );
    }
    if (subSlug === 'entertainment') {
      return (
        <MusicEntertainmentPage
          activeServiceSlug={serviceSlug}
          onNavigate={handleNavigate}
        />
      );
    }
  }

  return (
    <PlaceholderPage
      title={serviceSlug ? serviceSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Service'}
      onNavigate={handleNavigate}
    />
  );
}
