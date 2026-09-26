"use client";

import { useRouter, useParams } from 'next/navigation';
import { WeddingPlanningPage } from '../../../../src/views/WeddingPlanningPage';
import { PhotographyPage } from '../../../../src/views/PhotographyPage';
import { MusicEntertainmentPage } from '../../../../src/views/MusicEntertainmentPage';
import { CateringPage } from '../../../../src/views/CateringPage';
import { WeddingVenuesPage } from '../../../../src/views/WeddingVenuesPage';
import { TransportationPage } from '../../../../src/views/TransportationPage';
import { PlaceholderPage } from '../../../../src/views/PlaceholderPage';
import { getWeddingSubCategoryBySlug } from '../../../../src/data/categoryData';

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
    if (subSlug === 'catering-food-desserts') {
      return <CateringPage onNavigate={handleNavigate} />;
    }
    if (subSlug === 'wedding-venues') {
      return <WeddingVenuesPage onNavigate={handleNavigate} />;
    }
    if (subSlug === 'wedding-transportation') {
      return <TransportationPage onNavigate={handleNavigate} />;
    }
  }

  const subCat = getWeddingSubCategoryBySlug(subSlug);

  return (
    <PlaceholderPage
      title={
        subCat
          ? subCat.name
          : subSlug
          ? subSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
          : 'Subcategory'
      }
      description={subCat?.description}
      plannedServices={subCat?.plannedServices}
      codeTag={subCat?.code}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Weddings & Events', href: '/categories/weddings-events' },
        { label: subCat ? subCat.name : 'Subcategory' },
      ]}
      onNavigate={handleNavigate}
    />
  );
}
