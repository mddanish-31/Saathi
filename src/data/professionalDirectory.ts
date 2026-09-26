import { Professional, ServiceItem } from '../types';
import { MOCK_PROFESSIONALS as A1_PROFESSIONALS, A1_SERVICES } from './weddingPlanningData';
import { A3_MOCK_PROFESSIONALS, A3_SERVICES } from './musicEntertainmentData';
import { A4_PROFESSIONALS, A4_SERVICES } from './beautyMakeupData';
import { VENUE_MOCK_PROFESSIONALS, VENUE_CATEGORIES } from './venuesData';
import { CATERERS_DATA } from './cateringData';
import { A7_SERVICES, A7_PROFESSIONALS } from './decorStylingData';

/**
<<<<<<< HEAD
 * Combined read-only directory across all live categories (A1 Planning &
 * Coordination + A3 Music & Entertainment + A4 Beauty, Makeup & Mehndi +
 * A5 Catering & Food + A6 Wedding Venues).
 */
export const ALL_SERVICES: ServiceItem[] = [
  ...A1_SERVICES,
  ...A3_SERVICES,
  ...A4_SERVICES,
  ...VENUE_CATEGORIES,
];

export const ALL_PROFESSIONALS: Professional[] = [
  ...A1_PROFESSIONALS,
  ...A3_MOCK_PROFESSIONALS,
  ...A4_PROFESSIONALS,
  ...CATERERS_DATA,
  ...VENUE_MOCK_PROFESSIONALS,
];
=======
 * Combined read-only directory across all live categories (currently A1 Planning &
 * Coordination + A3 Music & Entertainment + A6 Wedding Venues + A7 Decor, Styling & Essentials).
 * This file aggregates exports so each category's own data/helpers keep working unchanged.
 *
 * Shared pages (ProfessionalProfilePage, EnquiryPage) and shared components
 * (ProfessionalProfile) look professionals/services up through here so a professional
 * from any wired category can be found, regardless of which category page
 * linked to them.
 */
export const ALL_SERVICES: ServiceItem[] = [...A1_SERVICES, ...A3_SERVICES, ...VENUE_CATEGORIES, ...A7_SERVICES];
export const ALL_PROFESSIONALS: Professional[] = [...A1_PROFESSIONALS, ...A3_MOCK_PROFESSIONALS, ...CATERERS_DATA, ...VENUE_MOCK_PROFESSIONALS, ...A7_PROFESSIONALS];
>>>>>>> origin/feature/A7-decor

export const getProfessionalById = (id: string): Professional | undefined =>
  ALL_PROFESSIONALS.find((pro) => pro.id === id);

export const getServiceBySlug = (slug: string): ServiceItem | undefined =>
  ALL_SERVICES.find((srv) => srv.slug === slug);

/** Best-effort "directory" path for a professional, based on the first service they offer. */
export const getDirectoryPathForProfessional = (pro: Professional): string => {
  const matched = ALL_SERVICES.find((srv) => pro.servicesOffered.includes(srv.slug));
  return matched
    ? `/categories/weddings-events/${matched.subCategorySlug}`
    : '/categories/weddings-events';
};
