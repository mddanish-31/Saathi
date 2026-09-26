export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface CategoryPreviewItem {
  id: string;
  name: string;
  description: string;
  iconName?: string;
  tag?: string;
  href?: string;
}

export interface NavItem {
  label: string;
  href: string;
  isAnchor?: boolean;
}

export interface ValueCardItem {
  title: string;
  description: string;
  iconName: string;
}

export interface StepItem {
  step: string;
  title: string;
  description: string;
}

/* ==========================================================================
   MARKETPLACE CATEGORY HIERARCHY
   ========================================================================== */
export interface MarketplaceSubCategory {
  id: string;
  code: string;
  name: string;
  slug: string;
  description: string;
  badge?: string;
  isActive: boolean;
  plannedServices?: string[];
  imageUrl?: string;
}

export interface MarketplaceCategory {
  id: string;
  code: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  subCategories?: MarketplaceSubCategory[];
  plannedServices?: string[];
  heroImage?: string;
}

/* ==========================================================================
   AUTHENTICATION & USER TYPES
   ========================================================================== */
export type UserRole = 'customer' | 'professional';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  businessName?: string;
  avatarUrl?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading?: boolean;
  login: (email: string, passwordOrRole?: string | UserRole, roleOrName?: UserRole | string, name?: string) => Promise<{ error?: string } | void> | void;
  signup: (userData: { name: string; email: string; phone?: string; role: UserRole; businessName?: string; password?: string }) => Promise<{ error?: string } | void> | void;
  logout: () => Promise<void> | void;
}

/* ==========================================================================
   MARKETPLACE: SERVICES, PROFESSIONALS & REVIEWS
   ========================================================================== */
export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  startingPrice: string;
  priceModel: string;
  categorySlug: string;
  subCategorySlug: string;
  features: string[];
  typicalTimeline: string;
  idealFor: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  location: string;
  imageUrl?: string;
  description: string;
  tags: string[];
  /** Optional media kind for the portfolio item. Defaults to 'image' behavior when omitted. */
  type?: 'image' | 'video' | 'audio';
}

export interface ReviewItem {
  id: string;
  authorName: string;
  rating: number;
  date: string;
  eventType: string;
  location: string;
  comment: string;
  verified: boolean;
}

export interface Professional {
  id: string;
  name: string;
  brandName: string;
  tagline: string;
  businessType: string;
  avatarUrl?: string;
  coverImageUrl?: string;
  location: string;
  citiesServed: string[];
  rating: number;
  reviewCount: number;
  experienceYears: number;
  eventsCompleted: number;
  startingPrice: string;
  priceRange: string;
  priceModel: string;
  servicesOffered: string[]; // e.g. ['wedding-planning', 'event-planning', 'wedding-coordination']
  about: string;
  specialties: string[];
  availability: string;
  verified: boolean;
  portfolio: PortfolioItem[];
  reviews: ReviewItem[];
  /* Optional, backward-compatible performance/entertainment metadata (A3). Omitted for A1 professionals. */
  performanceType?: string;
  genres?: string[];
  eventTypes?: string[];
  performanceDuration?: string;
  teamSize?: string;
  equipmentProvided?: string[];
  /* Optional, backward-compatible catering metadata (A5). Omitted for non-catering professionals. */
  cuisines?: string[];
  dietaryOptions?: string[];
  pricePerPlate?: string;
  liveCounters?: string[];
  dessertSpecialties?: string[];
  /* Optional, backward-compatible venue metadata (A6). Omitted for non-venue professionals. */
  venueType?: string;
  minGuests?: number;
  maxGuests?: number;
  capacityLabel?: string;
  amenities?: string[];
  venueSpaces?: VenueSpace[];
  policies?: string[];
  /* Optional, backward-compatible decor, styling & wedding essentials metadata (A7). */
  decorStyles?: string[];
  eventFunctions?: string[];
  serviceSpecialties?: string[];
  venueTypesSupported?: string[];
  rentalOrPurchase?: 'Purchase' | 'Rental' | 'Both';
  productTypes?: string[];
  lightingTypes?: string[];
  furnitureTypes?: string[];
  flowerPreferences?: string[];
}

export interface VenueSpace {
  name: string;
  capacity: string;
  description: string;
}

/* ==========================================================================
   ENQUIRY TYPES
   ========================================================================== */
export interface EnquiryData {
  id: string;
  professionalId: string;
  professionalName: string;
  professionalBrand: string;
  professionalAvatar?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  eventDate: string;
  eventLocation: string;
  budgetRange: string;
  message: string;
  status: 'pending' | 'reviewed' | 'responded' | 'confirmed';
  createdAt: string;
}

export interface EnquiryContextType {
  enquiries: EnquiryData[];
  createEnquiry: (data: Omit<EnquiryData, 'id' | 'createdAt' | 'status'>) => Promise<EnquiryData> | EnquiryData;
  getEnquiryById: (id: string) => EnquiryData | undefined;
  getEnquiriesByProfessional: (proId: string) => EnquiryData[];
  updateEnquiryStatus?: (id: string, status: EnquiryData['status']) => Promise<void>;
  unreadNotificationCount?: number;
}