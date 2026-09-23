import { CategoryPreviewItem } from '../types';

/**
 * Temporary curated category preview data for foundation & design verification.
 * Decoupled from core category business logic to allow upcoming vertical teams
 * to replace or extend with ease.
 */
export const PREVIEW_CATEGORIES: CategoryPreviewItem[] = [
  {
    id: 'weddings-celebrations',
    name: 'Weddings & Celebrations',
    description: 'Decorators, bridal stylists, mehendi artists, event coordinators, and ritual specialists.',
    iconName: 'Sparkles',
    tag: 'Celebrations',
    href: '#categories',
  },
  {
    id: 'photography-production',
    name: 'Photography & Visuals',
    description: 'Professional photography services to preserve your most memorable moments.',
    iconName: 'Camera',
    tag: 'Creative',
    href: '#photography',
  },
  {
    id: 'home-spaces',
    name: 'Home & Living Spaces',
    description: 'Interior designers, landscape consultants, bespoke carpenters, and renovation architects.',
    iconName: 'Home',
    tag: 'Living',
    href: '#categories',
  },
  {
    id: 'wellness-lifestyle',
    name: 'Personal Wellness & Care',
    description: 'Classical yoga instructors, holistic nutritionists, grooming experts, and wellness guides.',
    iconName: 'Heart',
    tag: 'Wellness',
    href: '#categories',
  },
  {
    id: 'events-gatherings',
    name: 'Events & Hospitality',
    description: 'Artisanal caterers, classical and contemporary musicians, emcees, and culinary artists.',
    iconName: 'Music',
    tag: 'Events',
    href: '#categories',
  },
  {
    id: 'business-corporate',
    name: 'Corporate & Gatherings',
    description: 'Keynote curators, corporate event producers, PR strategists, and brand experience designers.',
    iconName: 'Briefcase',
    tag: 'Professional',
    href: '#categories',
  },
];
