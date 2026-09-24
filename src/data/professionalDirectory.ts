import { Professional, ServiceItem } from '../types';
import { MOCK_PROFESSIONALS as A1_PROFESSIONALS, A1_SERVICES } from './weddingPlanningData';
import { A3_MOCK_PROFESSIONALS, A3_SERVICES } from './musicEntertainmentData';
import { CATERERS_DATA, A5_SERVICES } from './cateringData';

/**
 * Combined read-only directory across all live categories (currently A1 Planning &
 * Coordination + A3 Music & Entertainment + A5 Catering, Food & Desserts).
 */
export const ALL_SERVICES: ServiceItem[] = [...A1_SERVICES, ...A3_SERVICES, ...A5_SERVICES];
export const ALL_PROFESSIONALS: Professional[] = [...A1_PROFESSIONALS, ...A3_MOCK_PROFESSIONALS, ...CATERERS_DATA];

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
