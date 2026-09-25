"use client";

import { useRouter, useParams } from 'next/navigation';
import { CustomerEnquiriesPage } from '../../../../src/views/CustomerEnquiriesPage';

export default function Page() {
  const router = useRouter();
  const params = useParams();

  const handleNavigate = (path: string) => {
    router.push(path);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <CustomerEnquiriesPage
      onNavigate={handleNavigate}
      enquiryId={typeof params?.id === 'string' ? params.id : undefined}
    />
  );
}
