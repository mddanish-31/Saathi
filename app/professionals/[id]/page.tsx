"use client";

import { useRouter, useParams } from 'next/navigation';
import { ProfessionalProfilePage } from '../../../src/views/ProfessionalProfilePage';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const professionalId = params?.id as string;

  const handleNavigate = (path: string) => {
    router.push(path);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <ProfessionalProfilePage
      professionalId={professionalId}
      onNavigate={handleNavigate}
    />
  );
}
