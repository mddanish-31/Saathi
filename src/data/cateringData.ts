import { Professional, ServiceItem } from '../types';

/**
 * SAATHI DATA LAYER — A5 CATERING, FOOD & DESSERTS
 * Comprehensive mock data and types for the A5 Catering marketplace.
 */

export interface CateringCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  guestRange: string;
  imageUrl: string;
  popularCuisines: string[];
  features: string[];
}

export interface CateringFoodService {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  startingPrice: string;
  priceModel: string;
  iconName: string;
  imageUrl: string;
  highlights: string[];
  idealFor: string;
}

export type DietaryType = 'veg' | 'non-veg' | 'vegan' | 'jain';

export interface FoodItem {
  id: string;
  name: string;
  category: 'starters' | 'main-course' | 'rice-biryani' | 'breads' | 'salads-sides' | 'beverages';
  diet: DietaryType;
  cuisine: string;
  description: string;
  imageUrl: string;
  priceIndicator?: string;
  isChefSpecial?: boolean;
  isPopular?: boolean;
  liveCounterAvailable?: boolean;
}

export interface DessertItem {
  id: string;
  name: string;
  category: 'indian-desserts' | 'cakes' | 'pastries' | 'ice-cream' | 'premium';
  diet: DietaryType;
  type: string;
  description: string;
  imageUrl: string;
  priceIndicator?: string;
  isChefSpecial?: boolean;
  isPopular?: boolean;
}

export interface CateringPackage {
  id: string;
  name: string;
  tier: 'basic' | 'standard' | 'premium';
  badge?: string;
  tagline: string;
  pricePerPlate: string;
  minGuests: number;
  guestRange: string;
  foodCategories: {
    starters: string;
    mainCourse: string;
    riceBreads: string;
    saladsSides: string;
  };
  dessertDetail: string;
  beverageDetail: string;
  features: string[];
  idealFor: string;
}

export interface CateringGalleryItem {
  id: string;
  title: string;
  category: 'buffet' | 'live-stations' | 'wedding' | 'desserts' | 'presentation';
  categoryLabel: string;
  imageUrl: string;
  description: string;
  catererName?: string;
}

export interface CateringReview {
  id: string;
  authorName: string;
  avatarUrl?: string;
  roleOrLocation: string;
  rating: number;
  date: string;
  eventType: string;
  guestCount: string;
  catererName: string;
  comment: string;
  verified: boolean;
  menuHighlights: string[];
}

export interface WhyChooseBenefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

/* ==========================================================================
   1. EVENT CATEGORIES (5 Core Categories)
   ========================================================================== */
export const CATERING_CATEGORIES: CateringCategory[] = [
  {
    id: 'cat-wedding',
    name: 'Wedding Catering',
    slug: 'wedding-catering',
    tagline: 'Grand Multi-Day Feasts & Royal Hospitality',
    description:
      'Opulent multi-course banquets, authentic regional wedding spreads, live royal tandoor stations, and customized mithai counters tailored for pheras and sangeet celebrations.',
    guestRange: '150 - 2,500+ Guests',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    popularCuisines: ['Royal Awadhi', 'North Indian', 'South Indian Traditional', 'Pan-Asian', 'Continental'],
    features: ['Multi-cuisine live counters', 'Silver-service VIP tables', 'Custom wedding cake setup', 'Uniformed service staff'],
  },
  {
    id: 'cat-corporate',
    name: 'Corporate Catering',
    slug: 'corporate-catering',
    tagline: 'Executive Luncheons, Galas & Summits',
    description:
      'Punctual, sophisticated catering for high-stakes business summits, executive boardroom lunches, annual awards galas, and networking cocktail mixers.',
    guestRange: '30 - 1,000+ Guests',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    popularCuisines: ['Modern Global', 'Gourmet Indian', 'Mediterranean', 'Artisan Bakery'],
    features: ['Eco-friendly boxed lunches', 'Live espresso & brew bars', 'Dietary allergy labeling', 'Strict time-block delivery'],
  },
  {
    id: 'cat-birthday-party',
    name: 'Birthday & Party',
    slug: 'birthday-party-catering',
    tagline: 'Lively Food Stations & Celebratory Treats',
    description:
      'Vibrant live street-food counters, gourmet sliders, bespoke theme cakes, custom mocktail bars, and kid-friendly delicacy stations for joyful milestone parties.',
    guestRange: '25 - 300 Guests',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    popularCuisines: ['Street Food Chaats', 'Italian & Wood-Fired', 'Finger Foods', 'Dessert Bars'],
    features: ['Live pizza & pasta stations', 'Artisanal milkshake & mocktail bar', 'Themed novelty cakes', 'Interactive candy floss'],
  },
  {
    id: 'cat-festival',
    name: 'Festival Catering',
    slug: 'festival-catering',
    tagline: 'Authentic Traditional Delicacies & Holy Feasts',
    description:
      'Culturally authentic pure-veg, satvik, and festive spreads for Diwali celebrations, Eid feasts, Navratri fasts, Holi pool brunches, and Onam Sadhya.',
    guestRange: '50 - 1,500 Guests',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    popularCuisines: ['Satvik & Traditional', 'Awadhi Biryani Feasts', 'Gujarati/Rajasthani Thali', 'Traditional Kerala Sadhya'],
    features: ['Banana leaf service available', 'Pure desi ghee preparations', 'Festive seasonal sweets', 'Dedicated pure-veg kitchens'],
  },
  {
    id: 'cat-private-events',
    name: 'Private Events',
    slug: 'private-events-catering',
    tagline: 'Intimate Chef Tables & Luxury Farm Gatherings',
    description:
      'Bespoke private dining experiences curated by master chefs with table-side live finishing, seasonal farm-to-table menus, and sommelier-styled pairings.',
    guestRange: '10 - 75 Guests',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    popularCuisines: ['Modern Progressive Indian', 'French & Italian Fine Dining', 'Robata & Charcoal Grills'],
    features: ['Personal master chef', 'Plated 5-course degustation', 'Curated artisanal tableware', 'Custom menu card printing'],
  },
];

/* ==========================================================================
   2. CATERING & FOOD SERVICES (5 Merged Services)
   ========================================================================== */
export const CATERING_FOOD_SERVICES: CateringFoodService[] = [
  {
    id: 'srv-full-service',
    slug: 'full-service-catering',
    title: 'Full-Service Catering',
    shortDescription: 'Complete end-to-end banquet orchestration, silver table service, and synchronized multi-course dining.',
    fullDescription:
      'Our turnkey full-service catering provides master chef-curated menus, professional uniformed serving staff, premium china, silverware, ambient food station styling, and immaculate post-event cleanup.',
    startingPrice: '₹1,250',
    priceModel: 'Per plate (Min. 50 guests)',
    iconName: 'UtensilsCrossed',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    highlights: ['Uniformed hospitality team', 'Luxury crockery & glassware', 'Synchronized course timing', 'Complete setup & clean-up'],
    idealFor: 'Weddings, formal reception dinners, and large corporate award banquets.',
  },
  {
    id: 'srv-buffet-catering',
    slug: 'buffet-catering',
    title: 'Buffet Catering',
    shortDescription: 'Sumptuous multi-cuisine interactive buffet lines with heated chafers and elegant presentation.',
    fullDescription:
      'Curated buffet displays featuring hot chafer setups, fresh salad bars, artisanal bread baskets, and dessert tables engineered for smooth guest flow and consistent food temperature throughout your celebration.',
    startingPrice: '₹850',
    priceModel: 'Per plate (Min. 30 guests)',
    iconName: 'Layers',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    highlights: ['Temperature-controlled chafers', 'High-volume smooth guest flow', 'Multi-cuisine variety', 'Live replenishment chefs'],
    idealFor: 'Sangeet nights, corporate conferences, and family milestone celebrations.',
  },
  {
    id: 'srv-food-stations',
    slug: 'food-stations',
    title: 'Food Stations & Live Counters',
    shortDescription: 'Theatrical live cooking stations with chefs creating made-to-order specialties in front of guests.',
    fullDescription:
      'Bring energetic culinary theatre to your event with interactive live counters: hand-tossed wood-fired pizzas, steaming dim sum baskets, live tandoor grills, artisanal chaats, and flaming stir-fry woks.',
    startingPrice: '₹450',
    priceModel: 'Per station / Per guest addon',
    iconName: 'Flame',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    highlights: ['Theatrical chef live cooking', 'Customizable spice & topping bars', 'Artisan street-food setups', 'Freshly prepared portions'],
    idealFor: 'Cocktail soirées, mehendi brunches, and birthday celebrations.',
  },
  {
    id: 'srv-beverage-catering',
    slug: 'beverage-catering',
    title: 'Beverage Catering',
    shortDescription: 'Signature botanical mocktail bars, cold-press juice counters, artisanal tea & specialty coffee bars.',
    fullDescription:
      'Professional bar mixologists creating handcrafted signature mocktails, infusion water stations, live barista coffee lounges, and fresh tender coconut / traditional beverage bars with styled glassware.',
    startingPrice: '₹250',
    priceModel: 'Per guest / Per bar station',
    iconName: 'Wine',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    highlights: ['Trained bar mixologists', 'Bespoke event signature drinks', 'Artisanal glassware & garnishes', 'Complete ice & fruit supply'],
    idealFor: 'Pre-wedding cocktail nights, daytime mehendis, and executive receptions.',
  },
  {
    id: 'srv-cake-dessert',
    slug: 'cake-dessert-catering',
    title: 'Cake & Dessert Catering',
    shortDescription: 'Bespoke multi-tier wedding cakes, French pastry carts, authentic royal mithai bars & gelato stations.',
    fullDescription:
      'Artisanal dessert experiences blending traditional Indian halwais crafting warm jalebis with European pastry masters providing tiered floral wedding cakes, macaron towers, and gourmet gelato carts.',
    startingPrice: '₹350',
    priceModel: 'Per guest / Per custom cake',
    iconName: 'Cake',
    imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    highlights: ['Multi-tier custom structural cakes', 'Warm live Indian mithai counters', 'Artisanal French pastry tables', 'Live gelato & sorbet scoop bar'],
    idealFor: 'Wedding receptions, cake-cutting ceremonies, and luxury dessert corners.',
  },
];

/* Canonical Service Items matching Saathi ServiceItem interface for Directory linking */
export const A5_SERVICES: ServiceItem[] = CATERING_FOOD_SERVICES.map((srv) => ({
  id: srv.id,
  slug: srv.slug,
  title: srv.title,
  shortDescription: srv.shortDescription,
  fullDescription: srv.fullDescription,
  startingPrice: srv.startingPrice,
  priceModel: srv.priceModel,
  categorySlug: 'weddings-events',
  subCategorySlug: 'catering-food-desserts',
  features: srv.highlights,
  typicalTimeline: '2 to 6 months in advance',
  idealFor: srv.idealFor,
}));

/* ==========================================================================
   3. FOOD CATEGORIES & ITEMS
   ========================================================================== */
export const FOOD_CATEGORIES = [
  { id: 'all', label: 'All Food' },
  { id: 'starters', label: 'Starters' },
  { id: 'main-course', label: 'Main Course' },
  { id: 'rice-biryani', label: 'Rice & Biryani' },
  { id: 'breads', label: 'Breads' },
  { id: 'salads-sides', label: 'Salads & Sides' },
  { id: 'beverages', label: 'Beverages' },
] as const;

export const FOOD_ITEMS: FoodItem[] = [
  // Starters
  {
    id: 'food-paneer-tikka',
    name: 'Zafrani Paneer Tikka',
    category: 'starters',
    diet: 'veg',
    cuisine: 'North Indian',
    description: 'Cottage cheese marinated in saffron, hung curd, and stone-ground royal spices, roasted in clay tandoor.',
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹350 / portion',
    isChefSpecial: true,
    isPopular: true,
    liveCounterAvailable: true,
  },
  {
    id: 'food-galouti-kebab',
    name: 'Melt-in-Mouth Awadhi Galouti Kebab',
    category: 'starters',
    diet: 'non-veg',
    cuisine: 'Awadhi',
    description: 'Finely minced mutton smoked with clove and cardamom, served atop saffron sheermal crisps.',
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹480 / portion',
    isChefSpecial: true,
    isPopular: true,
  },
  {
    id: 'food-dahi-kebab',
    name: 'Crisp Truffle Dahi Ke Kebab',
    category: 'starters',
    diet: 'veg',
    cuisine: 'Progressive Indian',
    description: 'Hung curd croquettes infused with aromatic green cardamom and a subtle white truffle glaze.',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹380 / portion',
    isPopular: true,
  },
  {
    id: 'food-amritsari-fish',
    name: 'Amritsari Ajwaini Fish Fry',
    category: 'starters',
    diet: 'non-veg',
    cuisine: 'Punjabi',
    description: 'Crisp carom-seed and gram flour battered river sole fillet with tangy radish mooli lachha.',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹460 / portion',
    isPopular: true,
    liveCounterAvailable: true,
  },
  {
    id: 'food-dim-sum',
    name: 'Truffle Edamame & Water Chestnut Dim Sum',
    category: 'starters',
    diet: 'veg',
    cuisine: 'Pan-Asian',
    description: 'Crystal translucent dumplings filled with crushed edamame, roasted water chestnut, and chili dip.',
    imageUrl: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹420 / portion',
    liveCounterAvailable: true,
  },
  {
    id: 'food-tandoori-prawns',
    name: 'Bhattee Smoked Jumbo Prawns',
    category: 'starters',
    diet: 'non-veg',
    cuisine: 'Coastal Indian',
    description: 'Bay of Bengal tiger prawns bathed in charred yellow chili, kaffir lime, and roasted cumin marinade.',
    imageUrl: 'https://images.unsplash.com/photo-1559742811-822863645435?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹620 / portion',
    isChefSpecial: true,
  },

  // Main Course
  {
    id: 'food-dal-makhani',
    name: '24-Hour Slow-Simmered Dal Bukhara',
    category: 'main-course',
    diet: 'veg',
    cuisine: 'North Indian',
    description: 'Black lentils slow-cooked overnight over glowing charcoal with churned white butter and vine-ripened tomatoes.',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹420 / portion',
    isPopular: true,
  },
  {
    id: 'food-butter-chicken',
    name: 'Old Delhi Velvet Butter Chicken',
    category: 'main-course',
    diet: 'non-veg',
    cuisine: 'Mughlai',
    description: 'Charred tandoori chicken simmered in a silky, satin-smooth tomato, cashew, and sun-dried fenugreek gravy.',
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹550 / portion',
    isPopular: true,
  },
  {
    id: 'food-paneer-lababdar',
    name: 'Shahi Paneer Lababdar',
    category: 'main-course',
    diet: 'veg',
    cuisine: 'Royal North Indian',
    description: 'Soft malai paneer cubes simmered in an onion-tomato relish enriched with grated paneer and melon seeds.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹440 / portion',
    isPopular: true,
  },
  {
    id: 'food-rogan-josh',
    name: 'Kashmiri Ratanjot Rogan Josh',
    category: 'main-course',
    diet: 'non-veg',
    cuisine: 'Kashmiri',
    description: 'Tender baby mutton shanks braised in Kashmiri shallots, cockscomb flower extract, and mace broth.',
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹620 / portion',
    isChefSpecial: true,
  },
  {
    id: 'food-subz-diwani-handi',
    name: 'Subz Miloni Diwani Handi',
    category: 'main-course',
    diet: 'veg',
    cuisine: 'Nizami',
    description: 'Garden farm vegetables, baby corn, and water chestnuts tossed in a spinach-cashew cream reduction.',
    imageUrl: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹390 / portion',
  },

  // Rice & Biryani
  {
    id: 'food-hyderabadi-biryani',
    name: 'Dum Pukht Mutton Biryani',
    category: 'rice-biryani',
    diet: 'non-veg',
    cuisine: 'Hyderabadi',
    description: 'Long-grain aged basmati rice and marinated spring mutton sealed with dough and slow-steamed on coals.',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹580 / portion',
    isChefSpecial: true,
    isPopular: true,
  },
  {
    id: 'food-subz-biryani',
    name: 'Zafrani Subz Dum Biryani',
    category: 'rice-biryani',
    diet: 'veg',
    cuisine: 'Awadhi',
    description: 'Layers of scented aged basmati, fresh seasonal florets, saffron milk, caramelized shallots, and mint.',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹420 / portion',
    isPopular: true,
  },
  {
    id: 'food-jeera-pulao',
    name: 'Kashmiri Saffron Berry Pulao',
    category: 'rice-biryani',
    diet: 'veg',
    cuisine: 'Kashmiri',
    description: 'Pristine basmati rice laced with real saffron strands, toasted cashews, golden raisins, and dried cranberries.',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹340 / portion',
  },

  // Breads
  {
    id: 'food-garlic-naan',
    name: 'Truffle & Butter Garlic Naan',
    category: 'breads',
    diet: 'veg',
    cuisine: 'Indian Artisan',
    description: 'Clay-oven baked leavened bread brushed with roasted garlic butter and fine white truffle oil.',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹120 / piece',
    isPopular: true,
    liveCounterAvailable: true,
  },
  {
    id: 'food-warqi-paratha',
    name: 'Flaky Saffron Warqi Paratha',
    category: 'breads',
    diet: 'veg',
    cuisine: 'Awadhi',
    description: 'Multi-layered flaky bread enriched with saffron milk and toasted on an inverted copper tawa.',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹140 / piece',
    isChefSpecial: true,
  },
  {
    id: 'food-missi-roti',
    name: 'Amritsari Chur Chur Missi Roti',
    category: 'breads',
    diet: 'veg',
    cuisine: 'Punjabi',
    description: 'Crushed spiced gram flour flatbread with fresh fenugreek leaves, pomegranate seeds, and desi ghee.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹110 / piece',
    liveCounterAvailable: true,
  },

  // Salads & Sides
  {
    id: 'food-burrata-salad',
    name: 'Artisanal Burrata & Heirloom Beetroot Salad',
    category: 'salads-sides',
    diet: 'veg',
    cuisine: 'Contemporary',
    description: 'Creamy fresh burrata cheese, roasted spiced golden beets, arugula leaves, and pomegranate balsamic molasses.',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹360 / portion',
    isChefSpecial: true,
  },
  {
    id: 'food-pineapple-raita',
    name: 'Smoked Anardana & Roasted Pineapple Raita',
    category: 'salads-sides',
    diet: 'veg',
    cuisine: 'North Indian',
    description: 'Whisked sweet curd infused with wood-roasted pineapple chunks, toasted cumin, and wild pomegranate pearls.',
    imageUrl: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹190 / portion',
  },

  // Beverages
  {
    id: 'food-jamun-mocktail',
    name: 'Black Jamun Kala Khatta Fizz',
    category: 'beverages',
    diet: 'veg',
    cuisine: 'Signature Mocktail',
    description: 'Wild purple jamun reduction with rock salt, fresh lime, mint sprigs, and bubbling botanical soda.',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹180 / glass',
    isPopular: true,
    liveCounterAvailable: true,
  },
  {
    id: 'food-kesar-thandai',
    name: 'Shahi Royal Kesar Thandai',
    category: 'beverages',
    diet: 'veg',
    cuisine: 'Traditional Indian',
    description: 'Rich chilled whole milk churned with crushed almonds, pistachios, saffron strands, and rose petals.',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹220 / glass',
    isChefSpecial: true,
  },
];

/* ==========================================================================
   4. DESSERT CATEGORIES & ITEMS
   ========================================================================== */
export const DESSERT_CATEGORIES = [
  { id: 'all', label: 'All Desserts' },
  { id: 'indian-desserts', label: 'Indian Desserts' },
  { id: 'cakes', label: 'Cakes' },
  { id: 'pastries', label: 'Pastries' },
  { id: 'ice-cream', label: 'Ice Cream & Gelato' },
  { id: 'premium', label: 'Premium & Artisanal' },
] as const;

export const DESSERT_ITEMS: DessertItem[] = [
  // Indian Desserts
  {
    id: 'dessert-shahi-tukda',
    name: 'Awadhi Kesar Shahi Tukda',
    category: 'indian-desserts',
    diet: 'veg',
    type: 'Royal Mithai',
    description: 'Crisp ghee-fried brioche steeped in cardamom saffron syrup, topped with thick rabdi and 24k edible gold vark.',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹260 / portion',
    isChefSpecial: true,
    isPopular: true,
  },
  {
    id: 'dessert-rasmalai-tres-leches',
    name: 'Angoori Rasmalai Tres Leches',
    category: 'indian-desserts',
    diet: 'veg',
    type: 'Fusion Dessert',
    description: 'Light sponge soaked in three milks infused with saffron, topped with soft cottage cheese dumplings and pistachios.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹290 / portion',
    isPopular: true,
  },
  {
    id: 'dessert-gulab-jamun',
    name: 'Stuffed Pistachio Gulab Jamun',
    category: 'indian-desserts',
    diet: 'veg',
    type: 'Warm Live Counter',
    description: 'Deep-golden khoya dumplings stuffed with rose-infused pistachio center, served warm with vanilla bean rabdi.',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹220 / portion',
    isPopular: true,
  },

  // Cakes
  {
    id: 'dessert-wedding-cake',
    name: '4-Tier Vintage Floral Wedding Cake',
    category: 'cakes',
    diet: 'veg',
    type: 'Custom Wedding Cake',
    description: 'Custom textured vanilla bean sponge with raspberry compote, Belgian white chocolate ganache, and handcrafted sugar blooms.',
    imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹3,200 / kg',
    isChefSpecial: true,
  },
  {
    id: 'dessert-hazelnut-cake',
    name: 'Roasted Hazelnut & Praline Truffle Cake',
    category: 'cakes',
    diet: 'veg',
    type: 'Celebration Cake',
    description: 'Layers of moist chocolate sponge, Piedmont hazelnut crunch praline, and 70% dark Valrhona chocolate mousse.',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹2,600 / kg',
    isPopular: true,
  },

  // Pastries
  {
    id: 'dessert-macarons',
    name: 'French Artisanal Macaron Tower',
    category: 'pastries',
    diet: 'veg',
    type: 'French Patisserie',
    description: 'Delicate almond meringue shells filled with salted caramel, pistachio ganache, rose lychee, and dark chocolate.',
    imageUrl: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹95 / piece',
    isPopular: true,
  },
  {
    id: 'dessert-opera-pastry',
    name: 'Classic Parisian Opera Pastry',
    category: 'pastries',
    diet: 'veg',
    type: 'French Patisserie',
    description: 'Almond joconde sponge soaked in coffee syrup, layered with French coffee buttercream and bittersweet chocolate glaze.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹180 / piece',
  },

  // Ice Cream & Gelato
  {
    id: 'dessert-kulfi-counter',
    name: 'Live Stuffed Matka Kulfi Bar',
    category: 'ice-cream',
    diet: 'veg',
    type: 'Live Counter',
    description: 'Traditional slow-reduced whole milk kulfi in whole fruits (pomegranate, mango, orange) carved live at the event.',
    imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹190 / serving',
    isChefSpecial: true,
    isPopular: true,
  },
  {
    id: 'dessert-artisan-gelato',
    name: 'Artisanal Italian Gelato & Sorbet Cart',
    category: 'ice-cream',
    diet: 'veg',
    type: 'Gelato Cart',
    description: 'Authentic churning gelato cart with Belgian Dark, Sicilian Pistachio, Alphonso Mango, and Wild Berry sorbet.',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹220 / scoop',
    isPopular: true,
  },

  // Premium & Artisanal
  {
    id: 'dessert-baklava-platter',
    name: 'Royal Turkish Pistachio Baklava Selection',
    category: 'premium',
    diet: 'veg',
    type: 'Middle Eastern Gourmet',
    description: 'Crisp tissue-thin phyllo pastry layered with crushed Antep pistachios, simmered in light orange blossom honey.',
    imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹340 / portion',
    isChefSpecial: true,
  },
  {
    id: 'dessert-chocolate-fountain',
    name: 'Cascading Belgian Chocolate Fountain Table',
    category: 'premium',
    diet: 'veg',
    type: 'Interactive Table',
    description: 'Triple-tier warm Belgian milk chocolate fountain with fresh strawberry skewers, churros, marshmallows, and brownies.',
    imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80',
    priceIndicator: '₹18,000 / setup',
  },
];

/* ==========================================================================
   5. CATERING PACKAGES (3 Core Tiers)
   ========================================================================== */
export const CATERING_PACKAGES: CateringPackage[] = [
  {
    id: 'pkg-basic',
    name: 'Silver Banquet Package',
    tier: 'basic',
    badge: 'Essential Elegance',
    tagline: 'Ideal for intimate gatherings, pujas, birthday dinners, and small corporate meetings.',
    pricePerPlate: '₹950',
    minGuests: 30,
    guestRange: '30 - 150 Guests',
    foodCategories: {
      starters: '3 Starters (2 Veg + 1 Non-Veg / 3 Veg)',
      mainCourse: '3 Main Courses (Paneer / Dal + 1 Veg + 1 Non-Veg/Veg)',
      riceBreads: 'Steamed Basmati Rice + Assorted Tandoori Rotis & Naan',
      saladsSides: 'Green Garden Salad + Papad & Mint Chutney',
    },
    dessertDetail: '1 Traditional Indian Dessert (e.g. Warm Gulab Jamun or Moong Dal Halwa)',
    beverageDetail: 'Welcome Refreshment Punch + Mineral Water Station',
    features: [
      'Buffet setup with hot chafing dishes',
      'Quality melamine/ceramic tableware',
      'Dedicated buffet replenishment staff',
      '4-Hour event service window',
    ],
    idealFor: 'Intimate pre-wedding gatherings, housewarmings, and birthday celebrations.',
  },
  {
    id: 'pkg-standard',
    name: 'Gold Celebration Package',
    tier: 'standard',
    badge: 'Most Popular',
    tagline: 'The definitive choice for vibrant sangeets, reception dinners, and large festive galas.',
    pricePerPlate: '₹1,650',
    minGuests: 75,
    guestRange: '75 - 500 Guests',
    foodCategories: {
      starters: '5 Starters (3 Veg + 2 Non-Veg / 5 Veg) with 1 Live Counter',
      mainCourse: '5 Main Courses (Dal Bukhara, Paneer Special, 2 Curries + 1 Mutton/Chicken)',
      riceBreads: 'Hyderabadi Dum Biryani + 4 Varieties of Artisan Breads',
      saladsSides: 'Curated Salad Bar + Smoked Raita + Dips & Pickle Counter',
    },
    dessertDetail: '2 Desserts (1 Hot Royal Mithai + 1 Artisanal Cake / Pastry Table)',
    beverageDetail: 'Live Mocktail Station (3 Signatures) + Artisanal Tea/Coffee Lounge',
    features: [
      'Grand styled buffet presentation with floral accents',
      'Bone china tableware, stainless steel cutlery & glassware',
      'Uniformed captain, table attendants & chef stations',
      'Live Chaat / Tandoor interactive counter included',
      'Menu tasting session for 2 people included',
    ],
    idealFor: 'Weddings, grand sangeet evenings, and major corporate banquets.',
  },
  {
    id: 'pkg-premium',
    name: 'Royal Platinum Feast',
    tier: 'premium',
    badge: 'Luxury Curated',
    tagline: 'Uncompromising luxury with master chef live cooking, silver service, and custom menus.',
    pricePerPlate: '₹2,850',
    minGuests: 100,
    guestRange: '100 - 2,500+ Guests',
    foodCategories: {
      starters: '8 Gourmet Starters with 3 Theatrical Live Stations (Grill, Dim Sum, Street Chaat)',
      mainCourse: '7 Master Chef Main Courses across 3 International & Regional Cuisines',
      riceBreads: 'Signature Awadhi Mutton & Zafrani Dum Biryani + 6 Heritage Tandoori Breads',
      saladsSides: 'Gourmet Mezze & Burrata Salad Bar + Multi-Raita & Artisanal Chutney Spread',
    },
    dessertDetail: 'Grand Dessert Galleria: 4 Artisanal Desserts + Live Fruit Kulfi Carving + French Macaron Bar',
    beverageDetail: 'Full Botanical Mocktail Bar + Barista Specialty Coffee & Cold Brew Station',
    features: [
      'Master Chef on-site consultation and execution',
      'Royal silver & gold-rimmed fine bone china service',
      'Table-side VIP silver service & synchronized transitions',
      'Dedicated hygiene & safety supervisor on site',
      'Complimentary multi-tier ceremonial celebration cake',
      'Comprehensive pre-event tasting for 4 family members',
    ],
    idealFor: 'High-end luxury weddings, VIP receptions, and gala award dinners.',
  },
];

/* ==========================================================================
   6. CATERERS (Mock Catering Marketplace Professionals)
   ========================================================================== */
export const CATERERS_DATA: Professional[] = [
  {
    id: 'caterer-shahi-dawat',
    name: 'Chef Farhan Qureshi',
    brandName: 'Shahi Dawat Royal Caterers',
    tagline: 'Heritage Awadhi & Mughlai Royal Banquets for Milestone Weddings',
    businessType: 'Bespoke Wedding Caterer',
    avatarUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
    location: 'Delhi NCR',
    citiesServed: ['Delhi NCR', 'Jaipur', 'Udaipur', 'Chandigarh', 'Lucknow'],
    rating: 4.95,
    reviewCount: 148,
    experienceYears: 18,
    eventsCompleted: 620,
    startingPrice: '₹1,450 / plate',
    priceRange: '₹1,450 - ₹3,500 / plate',
    priceModel: 'Per plate (Min. 75 guests)',
    servicesOffered: ['full-service-catering', 'buffet-catering', 'food-stations', 'beverage-catering', 'cake-dessert-catering'],
    about:
      'Shahi Dawat brings centuries-old Awadhi culinary secrets to contemporary luxury banquets. Led by Master Chef Farhan Qureshi, direct descendant of royal khansamas, our team creates awe-inspiring dining experiences featuring slow-cooked dum pukht biryanis, silken galoutis on live sigrees, and bespoke desserts with 24k gold vark.',
    specialties: ['Royal Awadhi & Dum Pukht', 'Live Sigree Charcoal Kebabs', 'Dum Biryani Theatrics', 'Silver Service Hospitality'],
    availability: 'Booking 2026-2027 Wedding Season',
    verified: true,
    cuisines: ['Awadhi', 'Mughlai', 'North Indian', 'Kashmiri', 'Continental'],
    dietaryOptions: ['Veg', 'Non-Veg', 'Jain'],
    pricePerPlate: '₹1,450',
    minGuests: 75,
    maxGuests: 3000,
    liveCounters: ['Awadhi Galouti & Sheermal', 'Live Dum Biryani Handi', 'Kashmiri Wazwan Grill', 'Royal Kesar Thandai'],
    dessertSpecialties: ['Shahi Tukda with Gold Vark', 'Angoori Rasmalai', 'Jalebi Caviar Rabdi'],
    portfolio: [
      {
        id: 'p-shahi-1',
        title: 'Royal Palace Wedding at Udaipur',
        category: 'Wedding Feast',
        location: 'Udaipur Palace Grounds',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        description: 'Multi-course banquet for 800 guests featuring 6 live regional counters and silver-tray service.',
        tags: ['Awadhi', 'Live Sigree', 'Palace Banquet'],
      },
      {
        id: 'p-shahi-2',
        title: 'Grand Sangeet Live Kebab Bar',
        category: 'Live Counters',
        location: 'New Delhi Farmhouse',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        description: 'Flaming live sigrees serving signature kakori and galouti kebabs paired with artisan mint chutneys.',
        tags: ['Kebabs', 'Live Counter', 'Sangeet'],
      },
      {
        id: 'p-shahi-3',
        title: 'Shahi Royal Dessert Spread',
        category: 'Dessert Bar',
        location: 'Jaipur Heritage Resort',
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
        description: 'A magnificent 30-foot dessert galleria featuring gold-leafed mithai, warm jalebis, and kulfi carts.',
        tags: ['Mithai', 'Desserts', 'Royal'],
      },
    ],
    reviews: [
      {
        id: 'r-shahi-1',
        authorName: 'Vikramaditya & Sanjana Singhania',
        rating: 5,
        date: 'January 2026',
        eventType: 'Wedding Reception (750 Guests)',
        location: 'New Delhi',
        comment:
          'Chef Farhan and Shahi Dawat transformed our wedding into a gastronomic wonderland! Our guests are still raving about the Galouti kebabs and the 24-hour slow cooked Dal. The presentation was pure royalty.',
        verified: true,
      },
      {
        id: 'r-shahi-2',
        authorName: 'Rohan Mehra',
        rating: 5,
        date: 'December 2025',
        eventType: 'Sangeet Gala (400 Guests)',
        location: 'Jaipur',
        comment:
          'The live sigree counters and the botanical mocktail bar were the highlights of the night. Flawless service, warm food even at 1 AM, and extraordinarily polite staff.',
        verified: true,
      },
    ],
  },
  {
    id: 'caterer-saffron-sage',
    name: 'Chef Ananya Deshmukh',
    brandName: 'Saffron & Sage Gourmet Catering',
    tagline: 'Modern Progressive Indian & International Fine Dining Caterers',
    businessType: 'Gourmet Catering Atelier',
    avatarUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    location: 'Mumbai',
    citiesServed: ['Mumbai', 'Pune', 'Goa', 'Bengaluru', 'Ahmedabad'],
    rating: 4.92,
    reviewCount: 112,
    experienceYears: 14,
    eventsCompleted: 480,
    startingPrice: '₹1,650 / plate',
    priceRange: '₹1,650 - ₹3,800 / plate',
    priceModel: 'Per plate (Min. 50 guests)',
    servicesOffered: ['full-service-catering', 'food-stations', 'beverage-catering', 'cake-dessert-catering'],
    about:
      'Saffron & Sage pioneers modern Indian gastronomy and world-cuisine catering for discerning hosts. We blend farm-to-table Indian seasonal ingredients with French pastry artistry, pan-Asian dim sum carts, and live wood-fired pizza ovens.',
    specialties: ['Progressive Indian Plating', 'Artisanal Dim Sum Carts', 'Wood-Fired Pizza Counter', 'Botanical Mocktail Mixology'],
    availability: 'Accepting bookings for 2026',
    verified: true,
    cuisines: ['Progressive Indian', 'Pan-Asian', 'Italian & Mediterranean', 'Modern European'],
    dietaryOptions: ['Veg', 'Non-Veg', 'Vegan', 'Jain'],
    pricePerPlate: '₹1,650',
    minGuests: 50,
    maxGuests: 1500,
    liveCounters: ['Truffle Dim Sum Bar', 'Live Neapolitan Pizza Oven', 'Peruvian Ceviche & Salad Bar', 'Liquid Nitrogen Gelato'],
    dessertSpecialties: ['French Macaron Tower', 'Rasmalai Tres Leches', 'Belgian Chocolate Fountain'],
    portfolio: [
      {
        id: 'p-saffron-1',
        title: 'Sunset Beach Cocktail Soirée',
        category: 'Cocktail Feast',
        location: 'North Goa Estate',
        imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
        description: 'Live Robata grill stations, sushi rolls, and handcrafted botanical cocktails for 250 guests.',
        tags: ['Cocktail', 'Sushi & Robata', 'Beach Event'],
      },
      {
        id: 'p-saffron-2',
        title: 'Modern Fusion Wedding Banquet',
        category: 'Plated Dinner',
        location: 'Mumbai Luxury Ballroom',
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
        description: '5-Course progressive Indian plated menu featuring Burrata Chaat and Truffle Dal Bukhara.',
        tags: ['Plated Dinner', 'Fusion', 'Luxury'],
      },
    ],
    reviews: [
      {
        id: 'r-saffron-1',
        authorName: 'Kavita & Aditya Kothari',
        rating: 5,
        date: 'February 2026',
        eventType: 'Intimate Wedding (180 Guests)',
        location: 'Mumbai',
        comment:
          'Saffron & Sage curated a menu that left our international and local guests speechless. The Truffle Dahi Kebabs and Dim Sum bar were sheer perfection.',
        verified: true,
      },
    ],
  },
  {
    id: 'caterer-annapurna-pure-veg',
    name: 'Maharaj Jethalal Purohit',
    brandName: 'Annapurna Royal Veg & Jain Catering',
    tagline: '100% Pure Vegetarian & Authentic Jain Multi-Cuisine Banquets',
    businessType: 'Pure Vegetarian Specialist',
    avatarUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    location: 'Ahmedabad',
    citiesServed: ['Ahmedabad', 'Surat', 'Mumbai', 'Jaipur', 'Rajkot', 'Indore'],
    rating: 4.97,
    reviewCount: 204,
    experienceYears: 22,
    eventsCompleted: 950,
    startingPrice: '₹950 / plate',
    priceRange: '₹950 - ₹2,400 / plate',
    priceModel: 'Per plate (Min. 100 guests)',
    servicesOffered: ['full-service-catering', 'buffet-catering', 'food-stations', 'cake-dessert-catering'],
    about:
      'Annapurna Caterers is India\u2019s premier pure-vegetarian and certified Jain culinary master. Operating with dedicated onion-garlic-free kitchens on demand, Maharaj Jethalal delivers lavish spreads featuring traditional Gujarati-Rajasthani royal thalis, Punjabi delicacies, and live Italian & Mexican counters.',
    specialties: ['Authentic Jain Cuisine', 'Gujarati-Rajasthani Royal Thalis', 'Pure Desi Ghee Mithai', 'Live Chaat Street'],
    availability: 'Accepting 2026 Bookings',
    verified: true,
    cuisines: ['Gujarati', 'Rajasthani', 'North Indian Pure Veg', 'South Indian', 'Italian'],
    dietaryOptions: ['Veg', 'Jain', 'Vegan'],
    pricePerPlate: '₹950',
    minGuests: 100,
    maxGuests: 5000,
    liveCounters: ['Surati Live Chaat Bazar', 'Stone-baked Wood Fired Pizza', 'Live Jalebi Fafda Counter', 'Fresh Tender Coconut Bar'],
    dessertSpecialties: ['Basundi with Dry Fruit Flakes', 'Kesar Pista Malai Kulfi', 'Mawa Ghevar Live Counter'],
    portfolio: [
      {
        id: 'p-annapurna-1',
        title: '3-Day Royal Gujarati Wedding',
        category: 'Traditional Feast',
        location: 'Surat Heritage Lawns',
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
        description: 'Pure-veg multi-cuisine banquet for 1,200 guests with separate authentic Jain dining pavilion.',
        tags: ['Pure Veg', 'Jain Catering', 'Gujarati Thali'],
      },
    ],
    reviews: [
      {
        id: 'r-annapurna-1',
        authorName: 'Bhavin & Sneha Shah',
        rating: 5,
        date: 'January 2026',
        eventType: 'Wedding Feast (850 Guests)',
        location: 'Ahmedabad',
        comment:
          'Finding caterers who truly understand strict Jain cooking without compromising on flavor is rare. Annapurna delivered beyond our highest expectations. Maharaj ji’s hospitality is unmatched!',
        verified: true,
      },
    ],
  },
  {
    id: 'caterer-dakshin-heritage',
    name: 'Chef Radhakrishna Pillai',
    brandName: 'Dakshin Flavors & Coastal Banquets',
    tagline: 'Authentic South Indian & Coastal Feasts on Traditional Banana Leaf',
    businessType: 'Regional Specialist',
    avatarUrl: 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&w=400&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
    location: 'Bengaluru',
    citiesServed: ['Bengaluru', 'Chennai', 'Hyderabad', 'Kochi', 'Coimbatore'],
    rating: 4.90,
    reviewCount: 94,
    experienceYears: 16,
    eventsCompleted: 410,
    startingPrice: '₹850 / plate',
    priceRange: '₹850 - ₹2,200 / plate',
    priceModel: 'Per plate (Min. 50 guests)',
    servicesOffered: ['full-service-catering', 'buffet-catering', 'food-stations'],
    about:
      'Dakshin Flavors specializes in ceremonial South Indian feasts, from traditional 26-dish Kerala Sadhya on fresh banana leaves to fiery Chettinad and Mangalorean coastal banquets with live Appam and Malabar Parotta counters.',
    specialties: ['Authentic 26-Dish Sadhya', 'Live Appam & Stew Bar', 'Chettinad Specialties', 'Filter Coffee Lounge'],
    availability: 'Open for 2026 Dates',
    verified: true,
    cuisines: ['Kerala Traditional', 'Tamil Brahmin', 'Chettinad', 'Andhra Coastal', 'Udupi'],
    dietaryOptions: ['Veg', 'Non-Veg', 'Jain'],
    pricePerPlate: '₹850',
    minGuests: 50,
    maxGuests: 2000,
    liveCounters: ['Live Appam & Stew Counter', 'Dosa Degustation Bar (12 Varieties)', 'Filter Coffee Pouring Show', 'Banana Chips Frying'],
    dessertSpecialties: ['Ada Pradhaman', 'Paal Payasam', 'Elaneer Payasam'],
    portfolio: [
      {
        id: 'p-dakshin-1',
        title: 'Traditional Muhurtham Banana Leaf Lunch',
        category: 'Ceremonial Lunch',
        location: 'Bengaluru Palace Grounds',
        imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
        description: 'Authentic 26-dish ceremonial feast served synchronously to 500 seated guests on clean plantain leaves.',
        tags: ['Banana Leaf', 'Sadhya', 'Muhurtham'],
      },
    ],
    reviews: [
      {
        id: 'r-dakshin-1',
        authorName: 'Suresh & Preetha Menon',
        rating: 5,
        date: 'November 2025',
        eventType: 'Wedding Muhurtham (500 Guests)',
        location: 'Bengaluru',
        comment:
          'The Sadhya was divine! Paal Payasam melted hearts and the live Appam counter at the evening reception was a huge hit.',
        verified: true,
      },
    ],
  },
  {
    id: 'caterer-sweet-reverie',
    name: 'Chef Camille & Chef Aarav Kapoor',
    brandName: 'Sweet Reverie Artisanal Cakes & Patisserie',
    tagline: 'Couture Multi-Tier Wedding Cakes & French Dessert Bars',
    businessType: 'Artisanal Bakery & Dessert Atelier',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1200&q=80',
    location: 'Delhi NCR',
    citiesServed: ['Delhi NCR', 'Jaipur', 'Mumbai', 'Chandigarh'],
    rating: 4.96,
    reviewCount: 88,
    experienceYears: 10,
    eventsCompleted: 340,
    startingPrice: '₹350 / guest',
    priceRange: '₹350 - ₹1,500 / guest',
    priceModel: 'Per guest dessert table / Per cake',
    servicesOffered: ['cake-dessert-catering'],
    about:
      'Sweet Reverie designs breathtaking dessert landscapes and custom architectural wedding cakes. Trained at Le Cordon Bleu Paris, our pastry chefs handcraft sugar flower sculptures, macaron carousels, chocolate fountains, and artisan gelato carts.',
    specialties: ['Multi-Tier Structural Wedding Cakes', 'French Macaron Towers', 'Gourmet Gelato Carts', 'Belgian Chocolate Buffets'],
    availability: 'Limited Wedding Dates Available',
    verified: true,
    cuisines: ['French Patisserie', 'Artisan Bakery', 'Gourmet Gelato', 'Chocolaterie'],
    dietaryOptions: ['Veg', 'Vegan', 'Eggless Custom'],
    pricePerPlate: '₹350',
    minGuests: 30,
    maxGuests: 1500,
    liveCounters: ['Live Crepe & Waffle Bar', 'Gelato Scooping Cart', 'Flaming Creme Brulee Station'],
    dessertSpecialties: ['Vanilla Raspberry Tier Cake', 'Pistachio Macarons', 'Belgian Chocolate Truffles'],
    portfolio: [
      {
        id: 'p-sweet-1',
        title: '5-Tier Floral Palace Wedding Cake',
        category: 'Custom Wedding Cake',
        location: 'Jaipur Heritage Resort',
        imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
        description: 'Bespoke 5-tier wedding cake with handmade edible sugar orchids and 24k gold leaf filigree.',
        tags: ['Wedding Cake', 'Floral', 'Luxury'],
      },
    ],
    reviews: [
      {
        id: 'r-sweet-1',
        authorName: 'Ananya & Varun Oberoi',
        rating: 5,
        date: 'January 2026',
        eventType: 'Wedding Reception (450 Guests)',
        location: 'New Delhi',
        comment:
          'Our wedding cake was not just a centerpiece—it tasted out of this world! The dessert bar was cleared out in 20 minutes.',
        verified: true,
      },
    ],
  },
];

/* ==========================================================================
   7. CATERING REVIEWS
   ========================================================================== */
export const CATERING_REVIEWS: CateringReview[] = [
  {
    id: 'rev-1',
    authorName: 'Vikramaditya & Sanjana Singhania',
    roleOrLocation: 'Royal Palace Wedding, Udaipur',
    rating: 5,
    date: 'January 2026',
    eventType: 'Wedding Reception',
    guestCount: '750 Guests',
    catererName: 'Shahi Dawat Royal Caterers',
    comment:
      'Finding the right catering partner for a 3-day royal wedding was our biggest priority. Shahi Dawat exceeded every dream. From the 24-hour slow cooked Dal Bukhara to the Awadhi Galoutis, every single course was piping hot and served with majestic hospitality.',
    verified: true,
    menuHighlights: ['Zafrani Dum Biryani', 'Awadhi Galouti Kebab', 'Shahi Tukda with Gold Vark'],
  },
  {
    id: 'rev-2',
    authorName: 'Kavita & Aditya Kothari',
    roleOrLocation: 'Beachside Sangeet Gala, North Goa',
    rating: 5,
    date: 'February 2026',
    eventType: 'Sangeet & Cocktail',
    guestCount: '350 Guests',
    catererName: 'Saffron & Sage Gourmet Catering',
    comment:
      'The live counters were an absolute showstopper! The Truffle Dim Sum and the wood-fired Neapolitan pizzas kept the dance floor energized until 3 AM. The botanical mocktail bar was pure artistry.',
    verified: true,
    menuHighlights: ['Truffle Edamame Dim Sum', 'Burrata Beetroot Salad', 'Botanical Kala Khatta Mocktail'],
  },
  {
    id: 'rev-3',
    authorName: 'Bhavin & Sneha Shah',
    roleOrLocation: 'Traditional Wedding, Ahmedabad',
    rating: 5,
    date: 'January 2026',
    eventType: 'Pure-Veg Wedding Feast',
    guestCount: '900 Guests',
    catererName: 'Annapurna Royal Veg & Jain Catering',
    comment:
      'Maharaj Jethalal Purohit made sure our strict Jain elders and our young international cousins were equally thrilled. The live Surati chaats and pure desi ghee sweets were sensational. Highly recommended!',
    verified: true,
    menuHighlights: ['Surati Live Chaat Bar', 'Jain Paneer Lababdar', 'Mawa Ghevar Live Counter'],
  },
  {
    id: 'rev-4',
    authorName: 'Tanya & Nikhil Sen',
    roleOrLocation: 'Executive Milestone Gala, Delhi NCR',
    rating: 5,
    date: 'December 2025',
    eventType: 'Corporate Annual Gala',
    guestCount: '450 Guests',
    catererName: 'Sweet Reverie Artisanal Cakes & Patisserie',
    comment:
      'The dessert galleria was the talk of our company celebration! Macaron towers, live fruit kulfi carving, and the most exquisite chocolate fountain setup. Flawless execution and zero delays.',
    verified: true,
    menuHighlights: ['French Macaron Tower', 'Live Matka Kulfi', 'Belgian Chocolate Fountain'],
  },
];

/* ==========================================================================
   8. CATERING GALLERY ITEMS
   ========================================================================== */
export const CATERING_GALLERY: CateringGalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Royal Palace Banquet Setup',
    category: 'wedding',
    categoryLabel: 'Wedding Banquet',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    description: 'Silver-tray fine dining table settings with floral centerpieces at a palace wedding in Udaipur.',
    catererName: 'Shahi Dawat Royal Caterers',
  },
  {
    id: 'gal-2',
    title: 'Live Sigree Charcoal Kebab Counter',
    category: 'live-stations',
    categoryLabel: 'Live Counter',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    description: 'Master chefs grilling succulent Awadhi kebabs over aromatic glowing coals.',
    catererName: 'Shahi Dawat Royal Caterers',
  },
  {
    id: 'gal-3',
    title: 'Grand Multi-Cuisine Buffet Galleria',
    category: 'buffet',
    categoryLabel: 'Buffet Setup',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    description: 'Temperature-controlled heated chafers and illuminated buffet counters for 800 guests.',
    catererName: 'Saffron & Sage Gourmet',
  },
  {
    id: 'gal-4',
    title: 'Artisanal Wedding Cake & Macaron Display',
    category: 'desserts',
    categoryLabel: 'Dessert Bar',
    imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted floral 4-tier wedding cake paired with pastel macaron tiers.',
    catererName: 'Sweet Reverie Patisserie',
  },
  {
    id: 'gal-5',
    title: 'Plated Degustation Master Plating',
    category: 'presentation',
    categoryLabel: 'Chef Plating',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    description: 'Fine dining course presentation with microgreens, edible flowers, and reduction drizzle.',
    catererName: 'Saffron & Sage Gourmet',
  },
  {
    id: 'gal-6',
    title: 'Traditional Desi Ghee Mithai Counter',
    category: 'desserts',
    categoryLabel: 'Dessert Bar',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    description: 'Golden shahi tukda, warm jalebis, and pistachio rabdi crafted live on brass tawas.',
    catererName: 'Annapurna Royal Veg',
  },
];

/* ==========================================================================
   9. WHY CHOOSE SAATHI CATERING (5 Core Benefits)
   ========================================================================== */
export const WHY_CHOOSE_CATERING: WhyChooseBenefit[] = [
  {
    id: 'why-verified',
    title: 'Verified Master Caterers',
    description:
      'Every caterer undergoes strict hygiene, kitchen facility inspection, and client tasting audits before listing on Saathi.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'why-custom-menus',
    title: '100% Custom Menus',
    description:
      'Tailor dishes to your regional traditions, dietary needs (Jain, vegan, pure-veg), and custom culinary themes without friction.',
    iconName: 'Sparkles',
  },
  {
    id: 'why-packages',
    title: 'Flexible Package Scalability',
    description:
      'From intimate 25-guest private dinners to 3,000+ guest royal wedding feasts, easily scale food courses and service staff.',
    iconName: 'Layers',
  },
  {
    id: 'why-pricing',
    title: 'Transparent Per-Plate Pricing',
    description:
      'Clear, itemized per-plate rate breakdowns with zero hidden vendor markups or surprise service commissions.',
    iconName: 'Award',
  },
  {
    id: 'why-event-specific',
    title: 'Event-Specific Expertise',
    description:
      'Specialist teams with deep expertise in weddings, corporate summits, festive gatherings, and private dining events.',
    iconName: 'Clock',
  },
];
