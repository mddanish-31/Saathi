import { Professional, ServiceItem } from '../types';

/**
 * SAATHI DEMO DATA LAYER:
 * All professionals, portfolios, and reviews below are curated demonstration models
 * designed for frontend architecture and layout validation.
 */

export interface SubCategoryItem {
  id: string;
  slug: string;
  code: string;
  name: string;
  description: string;
  isActive: boolean;
  itemCount?: string;
  badge?: string;
}

export const MASTER_WEDDINGS_CATEGORY = {
  id: 'weddings-events',
  slug: 'weddings-events',
  code: 'A',
  name: 'Weddings & Events',
  tagline: 'Crafting Timeless Indian Celebrations with Distinction',
  description:
    'Discover curated wedding planners, event specialists, and coordination experts dedicated to orchestrating effortless luxury and deep cultural resonance for your sacred milestones.',
  subCategories: [
    {
      id: 'a1-planning-coordination',
      slug: 'planning',
      code: 'A1',
      name: 'Wedding Planning & Coordination',
      description: 'Full-scale wedding production, private event management, and precision day-of timeline coordination.',
      isActive: true,
      itemCount: '3 Dedicated Services',
    },
    {
      id: 'a2-photography-videography',
      slug: 'photography',
      code: 'A2',
      name: 'Photography & Videography',
      description: 'Wedding photography, wedding videography, pre-wedding shoots, and drone cinematography.',
      isActive: false,
      badge: 'Coming Soon',
    },
    {
      id: 'a3-music-entertainment',
      slug: 'entertainment',
      code: 'A3',
      name: 'Music & Entertainment',
      description: 'DJs, live bands, singers, performers, bilingual anchors/hosts, and event production.',
      isActive: true,
      itemCount: '6 Dedicated Services',
    },
    {
      id: 'a4-beauty-makeup-mehndi',
      slug: 'beauty-makeup-mehndi',
      code: 'A4',
      name: 'Beauty, Makeup & Mehndi',
      description: 'Bridal makeup, groom makeup, celebrity artists, couture hairstylists, and mehendi artists.',
      isActive: false,
    },
    {
      id: 'a5-catering-food-desserts',
      slug: 'catering-food-desserts',
      code: 'A5',
      name: 'Catering, Food & Desserts',
      description: 'Artisanal regional caterers, beverage & bar catering, custom wedding cakes, and dessert bars.',
      isActive: false,
    },
    {
      id: 'a6-wedding-venues',
      slug: 'wedding-venues',
      code: 'A6',
      name: 'Wedding Venues',
      description: 'Banquet & marriage halls, luxury resorts, sprawling lawns & gardens, community halls, and destination venues.',
      isActive: false,
    },
    {
      id: 'a7-decor-styling-essentials',
      slug: 'decor-styling-essentials',
      code: 'A7',
      name: 'Decor, Styling & Wedding Essentials',
      description: 'Decoration & styling, floral mandaps, ambient lighting, furniture rental, wedding fashion, jewellery, and invites.',
      isActive: false,
    },
    {
      id: 'a8-wedding-transportation',
      slug: 'wedding-transportation',
      code: 'A8',
      name: 'Wedding Transportation',
      description: 'Vintage & luxury wedding cars, professional chauffeurs, and coordinated guest fleet logistics.',
      isActive: false,
    },
  ] as SubCategoryItem[],
};

export const A1_SERVICES: ServiceItem[] = [
  {
    id: 'srv-wedding-planning',
    slug: 'wedding-planning',
    title: 'Wedding Planning',
    shortDescription: 'Comprehensive end-to-end wedding curation from initial design concept to final farewell.',
    fullDescription:
      'Our elite wedding planners oversee the complete lifecycle of your multi-day celebration. From master budget allocation and aesthetic design to vendor negotiation, hospitality protocols, and logistics choreography, every detail is engineered with meticulous artistry.',
    startingPrice: '₹4,50,000',
    priceModel: 'Starting package / Custom percentage',
    categorySlug: 'weddings-events',
    subCategorySlug: 'planning',
    features: [
      'Full budget drafting, vendor procurement & contract governance',
      'Theme concept boards, spatial layout & staging blueprints',
      'Guest RSVP management, airport transfers & hotel hospitality desks',
      'Multi-day ceremony production (Mehendi, Sangeet, Haldi, Varmala & Reception)',
      'Dedicated lead planner & on-ground production crew throughout all events',
    ],
    typicalTimeline: '4 to 12 months in advance',
    idealFor: 'Couples and families desiring a stress-free, luxurious, turnkey celebration.',
  },
  {
    id: 'srv-event-planning',
    slug: 'event-planning',
    title: 'Event Planning',
    shortDescription: 'Tailored planning and experiential design for pre-wedding functions, engagements, and private soirees.',
    fullDescription:
      'Specialized event architects for standalone milestone gatherings including high-energy Sangeet nights, intimate Sufi evenings, Roka ceremonies, cocktail parties, and silver jubilee celebrations.',
    startingPrice: '₹1,75,000',
    priceModel: 'Fixed fee per event',
    categorySlug: 'weddings-events',
    subCategorySlug: 'planning',
    features: [
      'Concept theming, lighting atmosphere & audio-visual synchronization',
      'Artist & entertainment scheduling, choreography management',
      'Food & beverage menu flow curation with caterers',
      'Run-of-show scripting and guest seating arrangements',
      'Single-event lead coordinator with specialized stage crew',
    ],
    typicalTimeline: '1 to 4 months in advance',
    idealFor: 'Hosts curating distinctive pre-wedding parties, milestone anniversaries, and high-impact private events.',
  },
  {
    id: 'srv-wedding-coordination',
    slug: 'wedding-coordination',
    title: 'Wedding Coordination',
    shortDescription: 'Flawless day-of and month-of coordination to execute your vision with precision.',
    fullDescription:
      'Designed for couples who have already booked their preferred vendors and venues, but need master coordinators to take over 4 weeks prior to synthesize schedules, lead the dry runs, and direct all ceremony timelines seamlessly.',
    startingPrice: '₹95,000',
    priceModel: 'Per celebration day',
    categorySlug: 'weddings-events',
    subCategorySlug: 'planning',
    features: [
      'Vendor alignment & contract handover 30 days before D-day',
      'Master ritual sequence timeline & bridal shadow assistance',
      'Backstage cue management for sound, lights, entrances & varmala timing',
      'Crisis prevention & real-time on-site troubleshooting',
      'Gift inventory tracking & post-event vendor settlement assistance',
    ],
    typicalTimeline: '4 to 8 weeks before event date',
    idealFor: 'Families who planned their own vendors but want complete peace of mind on the wedding day.',
  },
];

export const MOCK_PROFESSIONALS: Professional[] = [
  {
    id: 'pro-aura-weddings',
    name: 'Kavya & Rohan Singhal',
    brandName: 'Aura Bespoke Wedding Curators',
    tagline: 'Curating royal, heritage, and destination weddings with architectural precision.',
    businessType: 'Boutique Planning Studio',
    location: 'Mumbai & Udaipur',
    citiesServed: ['Mumbai', 'Udaipur', 'Jaipur', 'Goa', 'Delhi NCR'],
    rating: 4.9,
    reviewCount: 48,
    experienceYears: 9,
    eventsCompleted: 110,
    startingPrice: '₹5,00,000',
    priceRange: '₹5L - ₹20L',
    priceModel: 'Comprehensive Project Fee',
    servicesOffered: ['wedding-planning', 'event-planning', 'wedding-coordination'],
    about:
      'Founded by design-forward duo Kavya and Rohan Singhal, Aura Bespoke has orchestrated some of western India’s most visually breathtaking heritage and palace weddings. We combine royal Rajasthani hospitality traditions with Swiss-like backstage logistical precision to ensure your once-in-a-lifetime milestone is as effortless as it is unforgettable.',
    specialties: ['Palace Destination Weddings', 'Royal Rajasthani Hospitality', 'Luxury Sangeet Productions', 'Multi-day Logistics'],
    availability: 'Accepting bookings for Q4 2026 & 2027 seasons',
    verified: true,
    portfolio: [
      {
        id: 'port-1',
        title: 'The Jagmandir Royal Union',
        category: 'Destination Wedding',
        location: 'Udaipur, Rajasthan',
        description: 'A 3-day imperial celebration on Lake Pichola featuring 280 international guests, custom floating mandap, and royal hospitality protocol.',
        tags: ['Heritage', 'Destination', 'Palace Wedding'],
      },
      {
        id: 'port-2',
        title: 'Sunset Beach Symphony',
        category: 'Coastal Wedding',
        location: 'South Goa',
        description: 'Earthy bohemian coastal wedding with sustainable botanical installations, sundowner sangeet, and private fireworks permit coordination.',
        tags: ['Beach', 'Sundowner', 'Bohemian'],
      },
      {
        id: 'port-3',
        title: 'Classical Haveli Sangeet Extravaganza',
        category: 'Pre-Wedding Event',
        location: 'Jaipur, Rajasthan',
        description: 'Immersive Sufi sangeet with custom glass stage over heritage stepwell, candlelit courtyard illumination, and Michelin-curated dining flow.',
        tags: ['Sangeet', 'Heritage', 'Lighting Design'],
      },
    ],
    reviews: [
      {
        id: 'rev-1',
        authorName: 'Priyamvada & Kabir Mehta',
        rating: 5,
        date: 'February 2026',
        eventType: '3-Day Destination Wedding in Udaipur',
        location: 'Mumbai, India',
        comment:
          'Kavya and Rohan made our wedding feel like poetry in motion. Handling 300 guests across 4 separate heritage venues with zero delays is pure magic. Their vendor connections saved us both immense time and stress.',
        verified: true,
      },
      {
        id: 'rev-2',
        authorName: 'Dr. Siddharth Nambiar',
        rating: 4.8,
        date: 'January 2026',
        eventType: 'Sangeet & Reception',
        location: 'Delhi, India',
        comment:
          'Superb attention to detail on sound cues and stage transitions. The team was calm, composed, and extremely courteous with all elder family members throughout.',
        verified: true,
      },
    ],
  },
  {
    id: 'pro-vedic-heritage',
    name: 'Pt. Devang Shastri & Ananya Rao',
    brandName: 'Vedic Heritage Traditional Celebrations',
    tagline: 'Harmonizing sacred authentic rituals with seamless contemporary event management.',
    businessType: 'Ceremony & Coordination Agency',
    location: 'Bengaluru & Chennai',
    citiesServed: ['Bengaluru', 'Chennai', 'Hyderabad', 'Mysuru', 'Coimbatore'],
    rating: 4.95,
    reviewCount: 62,
    experienceYears: 12,
    eventsCompleted: 180,
    startingPrice: '₹1,20,000',
    priceRange: '₹1.2L - ₹6L',
    priceModel: 'Per Ceremony / Weekend Package',
    servicesOffered: ['wedding-coordination', 'wedding-planning'],
    about:
      'Vedic Heritage specializes in authentic regional Vedic traditions, South Indian temple weddings, and multi-cultural ceremonial harmony. Co-founded by Sanskrit scholar Pt. Devang and seasoned event producer Ananya Rao, we ensure Vedic rituals are conducted with spiritual precision while guest logistics remain effortless and punctual.',
    specialties: ['Vedic Sacred Timelines', 'South Indian Muhurtham', 'Multi-Cultural Ceremonies', 'Day-of Coordination'],
    availability: 'Booking Muhurtham dates for 2026-2027',
    verified: true,
    portfolio: [
      {
        id: 'port-4',
        title: 'Morning Muhurtham at Bangalore Palace',
        category: 'Traditional Muhurtham',
        location: 'Bengaluru, Karnataka',
        description: 'Traditional dawn ceremony with live Carnatic nadhaswaram ensemble, fragrant jasmine courtyard pathways, and synchronized ritual timing.',
        tags: ['Traditional', 'South Indian', 'Vedic'],
      },
      {
        id: 'port-5',
        title: 'Fusion Gujarati-Tamil Union',
        category: 'Cross-Cultural Wedding',
        location: 'Hyderabad, Telangana',
        description: 'Bi-lingual ceremonial booklets, dual-priest synchronization, and customized lunch service transitions catering to two rich cultural heritages.',
        tags: ['Cross-Cultural', 'Fusion', 'Coordination'],
      },
    ],
    reviews: [
      {
        id: 'rev-3',
        authorName: 'Divya & Ashwin Ramanathan',
        rating: 5,
        date: 'December 2025',
        eventType: 'Traditional South Indian Wedding',
        location: 'Bengaluru, India',
        comment:
          'Our parents were extremely particular about sacred timings. Pt. Devang and Ananya balanced our modern lifestyle with sacred traditions flawlessly. Truly priceless peace of mind.',
        verified: true,
      },
    ],
  },
  {
    id: 'pro-nakshatra-events',
    name: 'Tarun Varma',
    brandName: 'Nakshatra Signature Celebrations',
    tagline: 'High-octane entertainment choreography, cocktail productions, and sangeet planning.',
    businessType: 'Event Planning & Production Studio',
    location: 'Delhi NCR & Chandigarh',
    citiesServed: ['Delhi NCR', 'Chandigarh', 'Ludhiana', 'Kolkata', 'Jim Corbett'],
    rating: 4.85,
    reviewCount: 39,
    experienceYears: 7,
    eventsCompleted: 92,
    startingPrice: '₹2,50,000',
    priceRange: '₹2.5L - ₹10L',
    priceModel: 'Per Event Production Fee',
    servicesOffered: ['event-planning', 'wedding-planning'],
    about:
      'Nakshatra Signature is known across Northern India for showstopping Sangeet evenings, celebrity artist handling, cinematic entrance staging, and high-energy pre-wedding events. Tarun Varma brings Bollywood-grade stage production values to private family celebrations.',
    specialties: ['Sangeet & Cocktail Productions', 'Celebrity Artist Procurement', 'Concert-grade Lighting', 'Bespoke Bar Experiences'],
    availability: 'Accepting bookings for winter wedding season',
    verified: true,
    portfolio: [
      {
        id: 'port-6',
        title: 'The Grand Starlight Sangeet',
        category: 'Sangeet Production',
        location: 'Gurugram, NCR',
        description: '360-degree LED stage with pyrotechnic entrance choreography, international live band, and 450 dancing guests.',
        tags: ['Sangeet', 'LED Production', 'Stage Design'],
      },
    ],
    reviews: [
      {
        id: 'rev-4',
        authorName: 'Manav & Tanya Khurana',
        rating: 4.9,
        date: 'January 2026',
        eventType: 'Sangeet & Cocktail Soiree',
        location: 'New Delhi, India',
        comment:
          'Tarun delivered an experience that felt like an award show! Sound was immaculate, lighting was moody and elegant, and our family performances were rehearsed to perfection.',
        verified: true,
      },
    ],
  },
  {
    id: 'pro-samarpan-coordination',
    name: 'Meera Deshmukh',
    brandName: 'Samarpan Wedding Management',
    tagline: 'Calm, precise, and discreet on-site day-of wedding management and logistics.',
    businessType: 'Coordination Specialist',
    location: 'Pune & Mumbai',
    citiesServed: ['Pune', 'Mumbai', 'Nashik', 'Mahabaleshwar', 'Lonavala'],
    rating: 4.92,
    reviewCount: 54,
    experienceYears: 8,
    eventsCompleted: 135,
    startingPrice: '₹85,000',
    priceRange: '₹85K - ₹3L',
    priceModel: 'Fixed Day-Rate',
    servicesOffered: ['wedding-coordination', 'event-planning'],
    about:
      'With over 130 weddings managed across Maharashtra, Meera Deshmukh and her all-women crew specialize in taking the stress off families during D-day. From shadow assistance for the bride and mother to vendor scheduling, timing cue control, and hospitality troubleshooting, Samarpan ensures flawless execution.',
    specialties: ['Day-of Coordination', 'Bridal Shadow Assistance', 'Vendor Timing Enforcement', 'Hospitality Desk Management'],
    availability: 'Accepting bookings for 2026-2027 calendar',
    verified: true,
    portfolio: [
      {
        id: 'port-7',
        title: 'Fort JadhavGADH Maratha Wedding',
        category: 'Heritage Coordination',
        location: 'Pune, Maharashtra',
        description: 'Complete day-of execution for traditional Maharashtrian rituals with 400 attendees across multiple fort terraces.',
        tags: ['Day-of Coordination', 'Heritage', 'Logistics'],
      },
    ],
    reviews: [
      {
        id: 'rev-5',
        authorName: 'Neha & Aditya Joshi',
        rating: 5,
        date: 'March 2026',
        eventType: 'Wedding Day Coordination',
        location: 'Pune, India',
        comment:
          'Hiring Meera was the single best decision we made. She solved three vendor emergencies before we even realized they happened. My parents could actually sit back and enjoy our wedding ceremony.',
        verified: true,
      },
    ],
  },
];

export const getProfessionalsByService = (serviceSlug?: string): Professional[] => {
  if (!serviceSlug) return MOCK_PROFESSIONALS;
  return MOCK_PROFESSIONALS.filter((pro) => pro.servicesOffered.includes(serviceSlug));
};

export const getProfessionalById = (id: string): Professional | undefined => {
  return MOCK_PROFESSIONALS.find((pro) => pro.id === id);
};

export const getServiceBySlug = (slug: string): ServiceItem | undefined => {
  return A1_SERVICES.find((srv) => srv.slug === slug);
};