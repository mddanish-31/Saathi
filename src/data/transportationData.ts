/**
 * SAATHI WEDDING TRANSPORTATION (A8) DATA LAYER
 * Canonical data structures, fleet options, audience segmentation,
 * process steps, packages, benefits, and gallery items.
 */

export interface TransportationRide {
  id: string;
  title: string;
  badge: string;
  description: string;
  capacity: string;
  idealFor: string;
  features: string[];
  vehicleExamples: string;
  category: string;
}

export interface TransportationAudience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  badge: string;
}

export interface TransportationStep {
  step: string;
  number: string;
  title: string;
  description: string;
}

export interface TransportationTrustPoint {
  id: string;
  title: string;
  description: string;
}

export interface TransportationPackage {
  id: string;
  name: string;
  forWhom: string;
  badge: string;
  tagline: string;
  includes: string[];
  isPopular?: boolean;
}

export interface TransportationBenefit {
  id: string;
  title: string;
  description: string;
}

export interface TransportationGalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
}

/* ==========================================================================
   SECTION 2: CHOOSE YOUR RIDE (MERGED CATEGORIES & FLEET)
   ========================================================================== */
export const TRANSPORTATION_RIDES: TransportationRide[] = [
  {
    id: 'luxury-cars',
    title: 'Luxury Cars',
    badge: 'Couple & VIP Entrance',
    description:
      'Executive luxury sedans offering effortless comfort, pristine climate control, and a refined ceremonial arrival for the couple.',
    capacity: '2–4 Guests',
    idealFor: 'Bride & Groom, VIP Guests',
    vehicleExamples: 'Mercedes S-Class / E-Class, BMW 7-Series, Audi A8',
    category: 'Sedans',
    features: [
      'Uniformed chauffeur in formal wedding attire',
      'Complimentary floral & ribbon styling',
      'Chilled bottled water & climate-controlled cabin',
      'Precision ceremonial arrival timing',
    ],
  },
  {
    id: 'vintage-cars',
    title: 'Vintage Cars',
    badge: 'Baraat & Photo-Ops',
    description:
      'Classic open-top and vintage heritage cars delivering an unforgettable, royal aesthetic for memorable baraat arrivals and wedding portraits.',
    capacity: '2–3 Guests',
    idealFor: 'Groom Baraat, Vintage Entry, Couple Shoots',
    vehicleExamples: 'Classic Rolls Royce, 1930s-1950s Convertibles, Heritage Roadsters',
    category: 'Heritage',
    features: [
      'Impeccably restored period charm & glossy finish',
      'Slow-procession baraat escort capability',
      'Red-carpet photo-ready appearance',
      'Specialist vintage vehicle handler on standby',
    ],
  },
  {
    id: 'premium-suvs',
    title: 'Premium SUVs',
    badge: 'Family & Escort Convoy',
    description:
      'High-stance luxury SUVs with generous luggage capacity, all-weather comfort, and commanding road presence for immediate family and VIP convoys.',
    capacity: '4–7 Guests',
    idealFor: 'Immediate Family, Core Wedding Party',
    vehicleExamples: 'Range Rover, Land Rover Defender, Toyota Fortuner, Audi Q7',
    category: 'SUVs',
    features: [
      'Spacious boot for heavy wedding trousseau & gifts',
      'Comfortable captain seats & elevated vantage',
      'Dedicated standby service between venues',
      'Seamless multi-stop family transitions',
    ],
  },
  {
    id: 'guest-buses',
    title: 'Guest Buses',
    badge: 'Group & Venue Transit',
    description:
      'Modern air-conditioned luxury coaches providing synchronized group transit for wedding guests between hotels, wedding halls, and receptions.',
    capacity: '25–45 Guests',
    idealFor: 'Outstation Guests, Hotel-to-Venue Shuttles',
    vehicleExamples: 'Luxury AC Volvo & BharatBenz Coaches (25 / 35 / 45 Seaters)',
    category: 'Coaches',
    features: [
      'Plush pushback seats & high-power air conditioning',
      'Expansive underfloor luggage compartments',
      'Dedicated route coordinator for timely departures',
      'Synchronized sangeet & baraat convoy logistics',
    ],
  },
  {
    id: 'shuttle-vans',
    title: 'Shuttle Vans',
    badge: 'Close Relative Shuttles',
    description:
      'Agile, comfortable executive minibuses and luxury vans for rapid group transfers and continuous venue-to-venue shuttling throughout your celebrations.',
    capacity: '10–17 Guests',
    idealFor: 'Extended Family, Bridal Party, Quick Loops',
    vehicleExamples: 'Force Urbania, Executive Tempo Traveller (12 / 17 Seaters)',
    category: 'Vans',
    features: [
      'Individual AC vents & ergonomic reclining seats',
      'High-roof walk-in cabin for grand festive attire',
      'Continuous loop capability between hotels & venues',
      'Agile navigation through heritage or narrow roads',
    ],
  },
  {
    id: 'airport-transfers',
    title: 'Airport Transfers',
    badge: 'Outstation Welcome',
    description:
      'Synchronized airport and railway station reception convoys with flight tracking, personalized meet-and-greet placards, and luggage assistance.',
    capacity: 'Custom Fleet Sizing',
    idealFor: 'Arriving Outstation Guests & VIPs',
    vehicleExamples: 'Coordinated Fleet of Sedans, SUVs & Shuttles',
    category: 'Reception',
    features: [
      'Real-time flight arrival & delay monitoring',
      'Personalized guest welcome placards & assistance',
      'Attentive luggage loading and handling',
      '24/7 round-the-clock dispatch & transit desk',
    ],
  },
];

/* ==========================================================================
   SECTION 3: TRANSPORTATION FOR EVERYONE (MERGED BRIDE/GROOM & GUESTS)
   ========================================================================== */
export const TRANSPORTATION_AUDIENCES: TransportationAudience[] = [
  {
    id: 'bride-groom',
    title: 'Bride & Groom',
    subtitle: 'Ceremonial & Couple Travel',
    description:
      'Luxury wedding cars, decorated arrivals and professional chauffeur service for the couple.',
    badge: 'Couple Sanctuary',
    highlights: [
      'Floral & satin ribbon wedding car decoration',
      'Peaceful sanctuary amidst bustling festivities',
      'Red-carpet entrance coordination & timing',
      'Attentive, discreet private chauffeur',
    ],
  },
  {
    id: 'family-vip',
    title: 'Family & VIP',
    subtitle: 'Immediate Family & Important Guests',
    description:
      'Premium cars and SUVs for family members, VIP guests and important event transfers.',
    badge: 'VIP Hospitality',
    highlights: [
      'Multi-stop standby between salon, hotel & venue',
      'Generous boot space for wedding attire & gifts',
      'Comfortable high-seating luxury SUVs',
      'Priority routing & dedicated drivers',
    ],
  },
  {
    id: 'guests',
    title: 'Guests',
    subtitle: 'Synchronized Group Logistics',
    description:
      'Coordinated buses, vans and shuttle services between hotels, venues and other locations.',
    badge: 'Group Transit',
    highlights: [
      'Scheduled hotel-to-venue shuttle loops',
      'Air-conditioned 12–45 seater luxury coaches',
      'Airport & railway station reception transfers',
      'On-time sangeet and baraat group arrival',
    ],
  },
];

/* ==========================================================================
   SECTION 4: SIMPLE. SEAMLESS. ON TIME. (PROCESS FLOW & TRUST POINTS)
   ========================================================================== */
export const TRANSPORTATION_STEPS: TransportationStep[] = [
  {
    step: '01',
    number: '01',
    title: 'Choose Your Vehicle',
    description: 'Select the vehicle or transportation option that fits your event.',
  },
  {
    step: '02',
    number: '02',
    title: 'Share Your Details',
    description: 'Tell us your wedding date, locations, guest count and transportation needs.',
  },
  {
    step: '03',
    number: '03',
    title: 'We Coordinate',
    description: 'Routes, pickup points, timing and chauffeur coordination are planned around your event.',
  },
  {
    step: '04',
    number: '04',
    title: 'Enjoy Your Journey',
    description: 'Travel comfortably and arrive on time.',
  },
];

export const TRANSPORTATION_TRUST_POINTS: TransportationTrustPoint[] = [
  {
    id: 'trust-chauffeurs',
    title: 'Professional Chauffeurs',
    description: 'Vetted, uniformed, and courteous drivers with complete route expertise.',
  },
  {
    id: 'trust-pickups',
    title: 'Timely Pickups',
    description: 'Strict adherence to wedding schedules so ceremonial muhurats are never missed.',
  },
  {
    id: 'trust-routes',
    title: 'Route Coordination',
    description: 'Pre-planned routes and traffic-conscious timing customized for wedding venues.',
  },
  {
    id: 'trust-support',
    title: 'Event-Day Support',
    description: 'Dedicated fleet coordination to assist guests and drivers in real time.',
  },
];

/* ==========================================================================
   SECTION 5: PACKAGES (3 STREAMLINED PACKAGES — NO FAKE PRICING)
   ========================================================================== */
export const TRANSPORTATION_PACKAGES: TransportationPackage[] = [
  {
    id: 'couple-package',
    name: 'Couple',
    forWhom: 'Bride & Groom',
    badge: 'Signature Arrival',
    tagline: 'Iconic ceremonial entrance and serene couple transit.',
    includes: [
      'Luxury wedding car (Sedan or Vintage)',
      'Professional uniformed chauffeur',
      'Event-day coordination',
      'Signature floral & ribbon decoration',
    ],
    isPopular: false,
  },
  {
    id: 'family-package',
    name: 'Family',
    forWhom: 'Family & VIP guests',
    badge: 'VIP Fleet',
    tagline: 'Dedicated luxury and multi-transfer flexibility for immediate family.',
    includes: [
      'Premium cars and luxury SUVs',
      'Professional chauffeur service',
      'Multiple transfers across salon, hotel & venues',
      'Dedicated on-call standby coordination',
    ],
    isPopular: false,
  },
  {
    id: 'complete-package',
    name: 'Complete',
    forWhom: 'Couple + Family + Guests',
    badge: 'Turnkey Fleet',
    tagline: 'Full end-to-end wedding transit orchestration for all your guests.',
    includes: [
      'Couple transportation (Luxury / Vintage car)',
      'Family & VIP transportation (Premium SUVs / Sedans)',
      'Guest shuttle coordination (Luxury coaches & vans)',
      'Airport / railway station reception transfers',
      'Event-day transportation planning & fleet manager',
    ],
    isPopular: true,
  },
];

/* ==========================================================================
   SECTION 6: TRAVEL IN STYLE (GALLERY & WHY SAATHI)
   ========================================================================== */
export const TRANSPORTATION_BENEFITS: TransportationBenefit[] = [
  {
    id: 'benefit-curated',
    title: 'Curated transportation options',
    description:
      'Hand-selected luxury sedans, vintage classics, and modern coaches maintained in pristine condition.',
  },
  {
    id: 'benefit-chauffeurs',
    title: 'Professional chauffeurs',
    description:
      'Courteous, experienced drivers trained in wedding etiquette, formal attire, and guest hospitality.',
  },
  {
    id: 'benefit-scheduling',
    title: 'Reliable scheduling',
    description:
      'Precision timelines synchronized with your auspicious muhurats, sangeet entries, and reception hours.',
  },
  {
    id: 'benefit-guest-coord',
    title: 'Guest coordination',
    description:
      'Effortless shuttle loops and airport pickups keeping outstation guests comfortable and connected.',
  },
  {
    id: 'benefit-flexible-planning',
    title: 'Flexible transportation planning',
    description:
      'Customized fleet solutions tailored to your guest count, celebration venues, and multi-day itinerary.',
  },
];

export const TRANSPORTATION_GALLERY_ITEMS: TransportationGalleryItem[] = [
  {
    id: 'gal-bridal-sedan',
    title: 'Luxury Bridal Entrance',
    subtitle: 'Mercedes S-Class decorated in white floral ribbons',
    category: 'Couple Fleet',
  },
  {
    id: 'gal-vintage-baraat',
    title: 'Royal Vintage Baraat',
    subtitle: 'Classic heritage convertible for the grand procession',
    category: 'Vintage Entry',
  },
  {
    id: 'gal-guest-coach',
    title: 'Coordinated Guest Transit',
    subtitle: 'Air-conditioned luxury coach escorting wedding guests',
    category: 'Guest Shuttles',
  },
  {
    id: 'gal-convoy-sunset',
    title: 'Sunset Escort Convoy',
    subtitle: 'Premium SUVs lined up at the palace gates',
    category: 'VIP Convoy',
  },
];
