"use client";

import { useRouter, useParams } from 'next/navigation';
import { WeddingsEventsPage } from '../../../src/views/WeddingsEventsPage';
import { PlaceholderPage } from '../../../src/views/PlaceholderPage';
import { getMarketplaceCategoryBySlug } from '../../../src/data/categoryData';

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

  const category = getMarketplaceCategoryBySlug(categorySlug);

  return (
    <PlaceholderPage
      title={
        category
          ? category.name
          : categorySlug
          ? categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
          : 'Category'
      }
      description={category?.description}
      plannedServices={category?.plannedServices}
      codeTag={category?.code}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: category ? category.name : 'Category' },
      ]}
      onNavigate={handleNavigate}
    />
  );
}
