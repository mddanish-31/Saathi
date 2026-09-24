"use client";

import { useRouter } from 'next/navigation';
import { ProfessionalDashboardPage } from '../../../src/views/ProfessionalDashboardPage';

export default function Page() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return <ProfessionalDashboardPage onNavigate={handleNavigate} />;
}
