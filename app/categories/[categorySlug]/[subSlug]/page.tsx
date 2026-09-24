"use client";

import { useRouter, useParams } from 'next/navigation';
import { WeddingPlanningPage } from '../../../../src/views/WeddingPlanningPage';
import { PhotographyPage } from '../../../../src/views/PhotographyPage';
import { MusicEntertainmentPage } from '../../../../src/views/MusicEntertainmentPage';
import { PlaceholderPage } from '../../../../src/views/PlaceholderPage';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const categorySlug = params?.categorySlug as string;
  const subSlug = params?.subSlug as string;

  const handleNavigate = (path: string) => {
    router.push(path);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (categorySlug === 'weddings-events') {
    if (subSlug === 'planning') {
      return <WeddingPlanningPage onNavigate={handleNavigate} />;
    }
    if (subSlug === 'photography') {
      return <PhotographyPage onNavigate={handleNavigate} />;
    }
    if (subSlug === 'entertainment') {
      return <MusicEntertainmentPage onNavigate={handleNavigate} />;
    }
  }

  return (
    <PlaceholderPage
      title={subSlug ? subSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Subcategory'}
      onNavigate={handleNavigate}
    />
  );
}
