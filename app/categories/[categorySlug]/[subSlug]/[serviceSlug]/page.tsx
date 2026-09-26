"use client";

import { useRouter, useParams } from 'next/navigation';
import { WeddingPlanningPage } from '../../../../../src/views/WeddingPlanningPage';
import { PhotographyPage } from '../../../../../src/views/PhotographyPage';
import { MusicEntertainmentPage } from '../../../../../src/views/MusicEntertainmentPage';
import { BeautyMakeupPage } from '../../../../../src/views/BeautyMakeupPage';
import { CateringPage } from '../../../../../src/views/CateringPage';
import { WeddingVenuesPage } from '../../../../../src/views/WeddingVenuesPage';
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
      return <WeddingPlanningPage activeServiceSlug={serviceSlug} onNavigate={handleNavigate} />;
    }
    if (subSlug === 'photography') {
      return <PhotographyPage onNavigate={handleNavigate} />;
    }
    if (subSlug === 'entertainment') {
      return <MusicEntertainmentPage activeServiceSlug={serviceSlug} onNavigate={handleNavigate} />;
    }
    if (subSlug === 'beauty-makeup-mehndi') {
      return <BeautyMakeupPage activeServiceSlug={serviceSlug} onNavigate={handleNavigate} />;
    }
    if (subSlug === 'catering-food-desserts') {
      return <CateringPage onNavigate={handleNavigate} />;
    }
    if (subSlug === 'wedding-venues') {
      return <WeddingVenuesPage activeCategorySlug={serviceSlug} onNavigate={handleNavigate} />;
    }
  }

  return (
    <PlaceholderPage
      title={serviceSlug ? serviceSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Service'}
      onNavigate={handleNavigate}
    />
  );
}

