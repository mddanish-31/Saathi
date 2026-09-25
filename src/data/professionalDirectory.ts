import { Professional, ServiceItem } from '../types';
import { MOCK_PROFESSIONALS as A1_PROFESSIONALS, A1_SERVICES } from './weddingPlanningData';
import { A3_MOCK_PROFESSIONALS, A3_SERVICES } from './musicEntertainmentData';
import { VENUE_MOCK_PROFESSIONALS, VENUE_CATEGORIES } from './venuesData';
import { CATERERS_DATA } from './cateringData';

/**
 * Combined read-only directory across all live categories (currently A1 Planning &
 * Coordination + A3 Music & Entertainment + A6 Wedding Venues). This file
 * intentionally does not modify weddingPlanningData.ts, musicEntertainmentData.ts,
 * or venuesData.ts \u2014 it only aggregates their existing exports, so each category's
 * own data/helpers keep working unchanged.
 *
 * Shared pages (ProfessionalProfilePage, EnquiryPage) and shared components
 * (ProfessionalProfile) look professionals/services up through here so a professional
 * (or venue) from any wired category can be found, regardless of which category page
 * linked to them. When A2 (Photography & Videography) ships, add its exports here too.
 */
export const ALL_SERVICES: ServiceItem[] = [...A1_SERVICES, ...A3_SERVICES, ...VENUE_CATEGORIES];
export const ALL_PROFESSIONALS: Professional[] = [...A1_PROFESSIONALS, ...A3_MOCK_PROFESSIONALS, ...CATERERS_DATA, ...VENUE_MOCK_PROFESSIONALS];

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
