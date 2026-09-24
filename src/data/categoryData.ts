import { MarketplaceCategory, MarketplaceSubCategory } from '../types';

/**
 * SAATHI CANONICAL MARKETPLACE DIRECTORY
 * Central hierarchical registry of Verticals -> Categories -> Subcategories -> Services.
 *
 * Implements the canonical specification:
 * A. WEDDINGS & EVENTS (A1 to A8)
 * B. HOME & LIVING
 * C. WELLNESS & BEAUTY
 * D. CORPORATE & BUSINESS
 */

export const WEDDING_SUBCATEGORIES_CANONICAL: MarketplaceSubCategory[] = [
  {
    id: 'sub-planning',
    code: 'A1',
    name: 'Wedding Planning & Coordination',
    slug: 'planning',
    description:
      'Turnkey management, bespoke timelines, vendor orchestration, and budget optimization for luxury celebrations.',
    badge: 'Active Flow',
    isActive: true,
    plannedServices: [
      'Wedding Planning',
      'Event Planning',
      'Wedding Coordination',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sub-photography',
    code: 'A2',
    name: 'Photography & Videography',
    slug: 'photography',
    description:
      'Award-winning candid and traditional visual artists capturing pheras, receptions, and pre-wedding stories with cinematic depth.',
    badge: 'Active Flow',
    isActive: true,
    plannedServices: [
      'Wedding Photography',
      'Wedding Videography',
      'Pre-Wedding Photography',
      'Pre-Wedding Videography',
      'Drone Photography & Videography',
      'Cinematography',
      'Wedding Films',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sub-entertainment',
    code: 'A3',
    name: 'Music & Entertainment',
    slug: 'entertainment',
    description:
      'Concert DJs, live Sufi & Bollywood ensembles, folk troupes, celebrity anchors, and stage sound & light production.',
    badge: 'Active Flow',
    isActive: true,
    plannedServices: [
      'DJs',
      'Live Bands',
      'Singers',
      'Performers',
      'Anchors / Hosts',
      'Event Entertainment',
      'Event Production',
      'Sound Systems',
      'Stage Sound',
      'Event Lighting',
      'Light & Sound Setup',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sub-beauty-makeup',
    code: 'A4',
    name: 'Beauty, Makeup & Mehndi',
    slug: 'beauty-makeup-mehndi',
    description:
      'Master bridal hair & makeup artists, couture saree drapers, and celebrated henna artists creating royal ceremonial looks.',
    badge: 'Coming Soon',
    isActive: false,
    plannedServices: [
      'Makeup Artists',
      'Bridal Makeup',
      'Groom Makeup',
      'Hairstylists',
      'Hair Styling',
      'Mehndi Artists',
      'Bridal Beauty',
      'Groom Grooming',
      'Pre-Wedding Makeup',
      'Makeup Trial',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sub-catering-food',
    code: 'A5',
    name: 'Catering, Food & Desserts',
    slug: 'catering-food-desserts',
    description:
      'Fine-dining wedding caterers, regional culinary specialists, bespoke live counters, artisanal bakers, and signature dessert stations.',
    badge: 'Coming Soon',
    isActive: false,
    plannedServices: [
      'Catering',
      'Full-Service Catering',
      'Buffet Catering',
      'Food Stations',
      'Beverage Catering',
      'Wedding Cakes',
      'Bakers',
      'Dessert Services',
      'Cake & Dessert Catering',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sub-wedding-venues',
    code: 'A6',
    name: 'Wedding Venues',
    slug: 'wedding-venues',
    description:
      'Heritage palaces, coastal luxury resorts, expansive lawns, and private estates curated for multi-day milestone celebrations.',
    badge: 'Coming Soon',
    isActive: false,
    plannedServices: [
      'Banquet / Marriage Hall',
      'Resort',
      'Lawn / Garden',
      'Community Hall',
      'Outdoor Venue',
      'Destination Venue',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sub-decor-styling',
    code: 'A7',
    name: 'Decor, Styling & Wedding Essentials',
    slug: 'decor-styling-essentials',
    description:
      'Visionary floral designers, thematic mandap architects, ambient lighting specialists, furniture rentals, and bespoke invitations.',
    badge: 'Coming Soon',
    isActive: false,
    plannedServices: [
      'Decoration & Styling',
      'Florists',
      'Lighting',
      'Furniture Rental',
      'Wedding Fashion',
      'Jewellery',
      'Invitations & Gifting',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sub-transportation',
    code: 'A8',
    name: 'Wedding Transportation',
    slug: 'wedding-transportation',
    description:
      'Vintage bridal cars, luxury guest transit coaches, chauffeur services, and seamless airport reception convoys.',
    badge: 'Coming Soon',
    isActive: false,
    plannedServices: [
      'Wedding Cars',
      'Luxury Cars',
      'Chauffeurs',
      'Guest Transportation',
      'Guest Bus',
      'Guest Van',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
  },
];

export const ALL_MARKETPLACE_CATEGORIES: MarketplaceCategory[] = [
  {
    id: 'cat-weddings-events',
    code: 'A',
    name: 'Weddings & Events',
    slug: 'weddings-events',
    description:
      'From royal palace unions to intimate beach ceremonies, discover certified planners, visionary decorators, and ritual specialists dedicated to perfecting your milestone moments.',
    isActive: true,
    subCategories: WEDDING_SUBCATEGORIES_CANONICAL,
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cat-home-spaces',
    code: 'B',
    name: 'Home & Living',
    slug: 'home-spaces',
    description:
      'Premier interior designers, landscape consultants, bespoke carpenters, and renovation architects dedicated to transforming living spaces.',
    isActive: false,
    plannedServices: [
      'Interior Designers & Decorators',
      'Landscape & Garden Architects',
      'Bespoke Carpentry & Furniture',
      'Renovation & Space Planning',
      'Smart Home & Architectural Lighting',
      'Home Styling & Staging',
      'Modular Kitchens & Custom Wardrobes',
    ],
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cat-wellness-lifestyle',
    code: 'C',
    name: 'Wellness & Beauty',
    slug: 'wellness-lifestyle',
    description:
      'Private classical yoga instructors, holistic nutritionists, grooming artists, and certified wellness mentors for restorative lifestyle care.',
    isActive: false,
    plannedServices: [
      'Personal Care & Wellness Guides',
      'Classical Yoga & Fitness Trainers',
      'At-Home Spa & Grooming Specialists',
      'Nutrition & Diet Consultants',
      'Holistic Therapists & Mindfulness Coaches',
      'Bridal Pre-Wedding Wellness Mentors',
    ],
    heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cat-corporate-business',
    code: 'D',
    name: 'Corporate & Business',
    slug: 'corporate-business',
    description:
      'Executive event producers, keynote curators, brand activation strategists, and enterprise hospitality teams for milestone corporate gatherings.',
    isActive: false,
    plannedServices: [
      'Corporate Event Producers',
      'Keynote Speakers & Curators',
      'Brand Experience & Activation Designers',
      'Conference Technical Production & AV',
      'Corporate Gifting & Hospitality',
      'PR & Media Event Strategists',
    ],
    heroImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
  },
];

/**
 * Find a subcategory across Weddings & Events by its slug.
 */
export const getWeddingSubCategoryBySlug = (slug: string): MarketplaceSubCategory | undefined => {
  return WEDDING_SUBCATEGORIES_CANONICAL.find((sub) => sub.slug === slug);
};

/**
 * Find any category by its slug.
 */
export const getMarketplaceCategoryBySlug = (slug: string): MarketplaceCategory | undefined => {
  return ALL_MARKETPLACE_CATEGORIES.find((cat) => cat.slug === slug);
};
