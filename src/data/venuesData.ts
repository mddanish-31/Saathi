import { Professional, ServiceItem } from '../types';

/**
 * SAATHI DEMO DATA LAYER — A6: WEDDING VENUES
 * All venues, galleries, and reviews below are curated demonstration models for
 * frontend architecture and layout validation. No backend / API is involved.
 *
 * ARCHITECTURE NOTE:
 * Venues are modeled directly as `Professional` records (a venue is simply a
 * "business" in SAATHI's marketplace sense) using the venue-specific optional
 * fields added to `Professional` in types/index.ts (venueType, minGuests,
 * maxGuests, capacityLabel, amenities, venueSpaces, policies). This means every
 * existing shared component — ProfessionalCard, ProfessionalGrid, FilterBar,
 * ProfessionalProfile (gallery/reviews/enquiry), and the /professionals/:id and
 * /professionals/:id/enquire routes — works for venues with zero duplication,
 * exactly the pattern already used for A1 and A3.
 */

const createVenuePlaceholder = (title: string, category: string, width = 800, height = 500): string => {
    const bgColors = [
        ['%234A2E35', '%232D1B22'],
        ['%233D2630', '%235A3846'],
        ['%23513340', '%23351F2A'],
        ['%23422834', '%23633E4D'],
    ];
    let hash = 0;
    for (let i = 0; i < title.length; i++) hash = (hash + title.charCodeAt(i)) % bgColors.length;
    const [c1, c2] = bgColors[hash];
    const safeTitle = encodeURIComponent(title);
    const safeCat = encodeURIComponent(category.toUpperCase());

    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'>` +
        `<defs>` +
        `<linearGradient id='g_${hash}' x1='0%' y1='0%' x2='100%' y2='100%'>` +
        `<stop offset='0%' stop-color='${c1}'/>` +
        `<stop offset='100%' stop-color='${c2}'/>` +
        `</linearGradient>` +
        `<pattern id='p' width='40' height='40' patternUnits='userSpaceOnUse'>` +
        `<path d='M0 20 L20 0 L40 20 L20 40 Z' fill='none' stroke='%23FFFFFF' stroke-width='0.5' stroke-opacity='0.05'/>` +
        `</pattern>` +
        `</defs>` +
        `<rect width='100%' height='100%' fill='url(%23g_${hash})'/>` +
        `<rect width='100%' height='100%' fill='url(%23p)'/>` +
        `<circle cx='${width / 2}' cy='${height / 2 - 30}' r='36' fill='%23FFFFFF' fill-opacity='0.08'/>` +
        `<path d='M${width / 2 - 16} ${height / 2 - 20} L${width / 2} ${height / 2 - 42} L${width / 2 + 16} ${height / 2 - 20} Z M${width / 2 - 12} ${height / 2 - 20} L${width / 2 - 12} ${height / 2 - 14} L${width / 2 + 12} ${height / 2 - 14} L${width / 2 + 12} ${height / 2 - 20} Z' fill='%23D4AF37' fill-opacity='0.85'/>` +
        `<text x='50%' y='${height / 2 + 25}' text-anchor='middle' font-family='sans-serif' font-size='12' font-weight='600' letter-spacing='2' fill='%23D4AF37'>${safeCat}</text>` +
        `<text x='50%' y='${height / 2 + 52}' text-anchor='middle' font-family='serif' font-size='18' font-weight='600' fill='%23FAF7F4'>${safeTitle}</text>` +
        `<text x='50%' y='${height - 30}' text-anchor='middle' font-family='sans-serif' font-size='10' font-weight='500' letter-spacing='1.5' fill='%23FAF7F4' fill-opacity='0.4'>SAATHI VENUES</text>` +
        `</svg>`;
    return `data:image/svg+xml;utf8,${svg}`;
};

const createAvatarPlaceholder = (name: string): string => {
    const initials = name.trim().split(/\s+/).map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width='200' height='200'>` +
        `<defs>` +
        `<linearGradient id='ag' x1='0%' y1='0%' x2='100%' y2='100%'>` +
        `<stop offset='0%' stop-color='%235B3A4A'/>` +
        `<stop offset='100%' stop-color='%233D2230'/>` +
        `</linearGradient>` +
        `</defs>` +
        `<rect width='100%' height='100%' fill='url(%23ag)'/>` +
        `<circle cx='100' cy='100' r='80' fill='%23FFFFFF' fill-opacity='0.05'/>` +
        `<text x='50%' y='58%' text-anchor='middle' font-family='serif' font-size='56' font-weight='600' fill='%23FAF7F4'>${initials}</text>` +
        `</svg>`;
    return `data:image/svg+xml;utf8,${svg}`;
};

/* ==========================================================================
   A6 VENUE CATEGORIES
   ========================================================================== */
export const VENUE_CATEGORIES: ServiceItem[] = [
    {
        id: 'venue-cat-marriage-halls',
        slug: 'marriage-halls',
        title: 'Marriage Halls',
        shortDescription: 'Traditional indoor marriage halls built for ritual-heavy, multi-function weddings.',
        fullDescription:
            'Purpose-built marriage halls with dedicated mandap zones, large dining areas, and ample parking — designed to comfortably host the full ritual sequence from baraat to vidaai under one roof.',
        startingPrice: '₹1,20,000',
        priceModel: 'Per day / Per function',
        categorySlug: 'weddings-events',
        subCategorySlug: 'wedding-venues',
        features: [
            'Dedicated mandap and stage areas',
            'Large air-conditioned dining halls',
            'On-site catering kitchens',
            'Ample guest parking',
            'Changing rooms for the couple',
        ],
        typicalTimeline: '3 to 8 months in advance',
        idealFor: 'Families wanting a traditional, ritual-first indoor venue for the full wedding sequence.',
    },
    {
        id: 'venue-cat-banquet-halls',
        slug: 'banquet-halls',
        title: 'Banquet Halls',
        shortDescription: 'Polished indoor banquet halls for receptions, sangeets, and cocktail evenings.',
        fullDescription:
            'Elegant, climate-controlled banquet halls with flexible seating layouts, in-house AV and stage setups, ideal for receptions, sangeets, and formal dinners regardless of season or weather.',
        startingPrice: '₹1,50,000',
        priceModel: 'Per day / Per event',
        categorySlug: 'weddings-events',
        subCategorySlug: 'wedding-venues',
        features: [
            'Flexible round & banquet seating layouts',
            'In-house stage, AV & lighting rig',
            'Weather-proof, fully air-conditioned',
            'Valet parking options',
            'In-house or empanelled catering',
        ],
        typicalTimeline: '2 to 6 months in advance',
        idealFor: 'Receptions, sangeets, and cocktail evenings that need a polished, weather-proof indoor space.',
    },
    {
        id: 'venue-cat-venues',
        slug: 'venues',
        title: 'Wedding Venues',
        shortDescription: 'Standalone wedding properties, farmhouses & palaces built specifically for weddings.',
        fullDescription:
            'Dedicated wedding properties — palace-style venues, private farmhouses, and destination estates — built ground-up for weddings, typically offering exclusive-use booking across an entire property.',
        startingPrice: '₹3,50,000',
        priceModel: 'Per day / Full property buyout',
        categorySlug: 'weddings-events',
        subCategorySlug: 'wedding-venues',
        features: [
            'Exclusive full-property buyout options',
            'Indoor + outdoor ceremony spaces',
            'On-site guest accommodation',
            'Heritage or destination-style architecture',
            'Dedicated venue coordinator',
        ],
        typicalTimeline: '4 to 10 months in advance',
        idealFor: 'Multi-day celebrations and destination weddings wanting a single exclusive-use property.',
    },
    {
        id: 'venue-cat-resorts',
        slug: 'resorts',
        title: 'Resorts',
        shortDescription: 'Resort properties combining wedding venues with on-site guest stays.',
        fullDescription:
            'Full-service resorts pairing wedding lawns, banquet spaces, and poolside decks with on-site rooms, spa, and dining — ideal for multi-day destination weddings where guests stay on property.',
        startingPrice: '₹4,50,000',
        priceModel: 'Per day / Room package',
        categorySlug: 'weddings-events',
        subCategorySlug: 'wedding-venues',
        features: [
            'On-site guest rooms & suites',
            'Poolside & lawn ceremony decks',
            'Multiple F&B outlets on property',
            'Spa & leisure facilities for guests',
            'Dedicated destination-wedding desk',
        ],
        typicalTimeline: '5 to 12 months in advance',
        idealFor: 'Destination weddings where the couple wants ceremony, stay, and hospitality on one property.',
    },
    {
        id: 'venue-cat-lawns',
        slug: 'lawns',
        title: 'Lawns',
        shortDescription: 'Open-air lawns and garden venues for outdoor ceremonies and sangeet nights.',
        fullDescription:
            'Sprawling open-air lawns and landscaped gardens suited to outdoor mandaps, sundowner cocktail hours, and sangeet stages, typically paired with a covered banquet area as weather backup.',
        startingPrice: '₹90,000',
        priceModel: 'Per day / Per function',
        categorySlug: 'weddings-events',
        subCategorySlug: 'wedding-venues',
        features: [
            'Landscaped open-air lawn space',
            'Covered banquet hall as weather backup',
            'Outdoor mandap & stage zones',
            'Ample vehicle parking',
            'Power backup for evening events',
        ],
        typicalTimeline: '3 to 6 months in advance',
        idealFor: 'Outdoor ceremonies, sundowner cocktails, and sangeet nights under the open sky.',
    },
    {
        id: 'venue-cat-community-halls',
        slug: 'community-halls',
        title: 'Community Halls',
        shortDescription: 'Budget-friendly community & society halls for intimate, cost-conscious celebrations.',
        fullDescription:
            'Simple, functional community and society halls offering an affordable, no-frills space for intimate weddings and functions, often bookable through local societies, trusts, or municipal bodies.',
        startingPrice: '₹35,000',
        priceModel: 'Per day / Per function',
        categorySlug: 'weddings-events',
        subCategorySlug: 'wedding-venues',
        features: [
            'Budget-friendly per-day rates',
            'Basic stage & seating included',
            'Kitchen access for outside caterers',
            'Simple, functional layouts',
            'Flexible booking through local trusts/societies',
        ],
        typicalTimeline: '3 to 8 weeks in advance',
        idealFor: 'Intimate, cost-conscious weddings and functions that don’t need a premium property.',
    },
];

/* ==========================================================================
   A6 MOCK VENUES (as Professional-shaped records)
   ========================================================================== */
export const VENUE_MOCK_PROFESSIONALS: Professional[] = [
    /* ---------------------------- MARRIAGE HALLS ---------------------------- */
    {
        id: 'venue-shubh-mangal',
        name: 'Shubh Mangal Marriage Hall',
        brandName: 'Shubh Mangal Marriage Hall',
        tagline: 'A traditional two-storey marriage hall built for full-sequence North Indian weddings.',
        businessType: 'Marriage Hall',
        avatarUrl: createAvatarPlaceholder('Shubh Mangal Marriage Hall'),
        coverImageUrl: createVenuePlaceholder('Shubh Mangal Marriage Hall', 'Marriage Hall', 1200, 500),
        location: 'Lucknow, Uttar Pradesh',
        citiesServed: ['Lucknow', 'Kanpur', 'Ayodhya'],
        rating: 4.6,
        reviewCount: 88,
        experienceYears: 16,
        eventsCompleted: 540,
        startingPrice: '₹1,20,000',
        priceRange: '₹1.2L - ₹3.5L',
        priceModel: 'Per Day (venue only)',
        servicesOffered: ['marriage-halls'],
        about:
            'Shubh Mangal Marriage Hall has hosted North Indian weddings for over 16 years, with a dedicated ground-floor mandap area, a first-floor banquet hall, and its own in-house catering kitchen. The hall accommodates the full ritual sequence — baraat entry, mandap, and reception — within one property.',
        specialties: ['Full Ritual Sequence Hosting', 'In-House Catering Kitchen', 'Ground-Floor Mandap', 'Baraat-Friendly Entrance'],
        availability: 'Booking winter 2026-27 wedding season',
        verified: true,
        venueType: 'Marriage Hall',
        minGuests: 200,
        maxGuests: 600,
        capacityLabel: '200–600 Guests',
        amenities: ['Parking', 'AC', 'Catering', 'Power Backup', 'Bridal Room', 'Groom Room', 'Indoor Space'],
        venueSpaces: [
            { name: 'Ground Floor Mandap Hall', capacity: 'Up to 400 guests', description: 'Open-plan hall with a raised mandap platform and baraat-facing entrance.' },
            { name: 'First Floor Banquet Hall', capacity: 'Up to 600 guests', description: 'Air-conditioned banquet floor used for receptions and sit-down dinners.' },
        ],
        policies: [
            'Outside catering not permitted — in-house kitchen only',
            'Venue must be vacated by 12:30 AM',
            '50% advance required to confirm booking',
            'Decor vendors must be approved by venue management',
        ],
        portfolio: [
            {
                id: 'venue-port-shubh-1',
                title: 'Ground Floor Mandap Setup',
                category: 'Marriage Hall',
                location: 'Lucknow, Uttar Pradesh',
                imageUrl: createVenuePlaceholder('Ground Floor Mandap Setup', 'Marriage Hall', 800, 500),
                description: 'Traditional floral mandap staged for a 350-guest wedding ceremony.',
                tags: ['Mandap', 'Traditional', 'Indoor'],
                type: 'image',
            },
            {
                id: 'venue-port-shubh-2',
                title: 'First Floor Reception Layout',
                category: 'Banquet Setup',
                location: 'Lucknow, Uttar Pradesh',
                imageUrl: createVenuePlaceholder('First Floor Reception Layout', 'Banquet Setup', 800, 500),
                description: 'Round-table reception layout for 500 guests with a raised stage.',
                tags: ['Reception', 'Banquet', 'Indoor'],
                type: 'image',
            },
        ],
        reviews: [
            {
                id: 'venue-rev-shubh-1',
                authorName: 'Rekha & Suresh Tiwari',
                rating: 4.6,
                date: 'February 2026',
                eventType: 'Wedding & Reception',
                location: 'Lucknow, India',
                comment:
                    'The hall comfortably fit both our families’ rituals and the reception on the same day without feeling cramped. Catering was good and the staff were experienced with the full ceremony flow.',
                verified: true,
            },
        ],
    },
    {
        id: 'venue-anandam-mandapam',
        name: 'Anandam Mandapam',
        brandName: 'Anandam Mandapam',
        tagline: 'A South Indian mandapam purpose-built for Muhurtham ceremonies and traditional weddings.',
        businessType: 'Marriage Hall',
        avatarUrl: createAvatarPlaceholder('Anandam Mandapam'),
        coverImageUrl: createVenuePlaceholder('Anandam Mandapam', 'Marriage Hall', 1200, 500),
        location: 'Chennai, Tamil Nadu',
        citiesServed: ['Chennai', 'Coimbatore', 'Madurai'],
        rating: 4.75,
        reviewCount: 64,
        experienceYears: 12,
        eventsCompleted: 410,
        startingPrice: '₹95,000',
        priceRange: '₹95K - ₹2.8L',
        priceModel: 'Per Day (venue only)',
        servicesOffered: ['marriage-halls'],
        about:
            'Anandam Mandapam is a dedicated South Indian wedding mandapam with a raised sanctum-style stage, dining hall, and adjoining guest rooms for out-of-town family. The venue is designed around Vedic Muhurtham timing requirements, with priest coordination support.',
        specialties: ['Muhurtham-Timed Ceremonies', 'Vedic Ritual Layout', 'Traditional South Indian Catering Kitchen', 'On-Site Guest Rooms'],
        availability: 'Accepting Muhurtham dates for 2026-27',
        verified: true,
        venueType: 'Marriage Hall',
        minGuests: 150,
        maxGuests: 450,
        capacityLabel: '150–450 Guests',
        amenities: ['Parking', 'AC', 'Catering', 'Rooms', 'Power Backup', 'Indoor Space'],
        venueSpaces: [
            { name: 'Main Mandapam Hall', capacity: 'Up to 350 guests', description: 'Raised sanctum-style stage with traditional pillar architecture.' },
            { name: 'Dining Annexe', capacity: 'Up to 450 guests', description: 'Adjoining hall for traditional banana-leaf seated dining.' },
        ],
        policies: [
            'Muhurtham timing must be shared at least 2 weeks in advance',
            'In-house catering kitchen mandatory for dining hall use',
            '6 guest rooms available on a first-come basis',
        ],
        portfolio: [
            {
                id: 'venue-port-anandam-1',
                title: 'Muhurtham Morning Setup',
                category: 'Marriage Hall',
                location: 'Chennai, Tamil Nadu',
                imageUrl: createVenuePlaceholder('Muhurtham Morning Setup', 'Marriage Hall', 800, 500),
                description: 'Sanctum-style stage decorated for a traditional Tamil Muhurtham ceremony.',
                tags: ['Muhurtham', 'Traditional', 'South Indian'],
                type: 'image',
            },
        ],
        reviews: [
            {
                id: 'venue-rev-anandam-1',
                authorName: 'Divya & Karthik Subramanian',
                rating: 4.8,
                date: 'December 2025',
                eventType: 'Traditional Muhurtham Wedding',
                location: 'Chennai, India',
                comment: 'The venue team coordinated perfectly with our priest on timing. Banana-leaf lunch service for 400 guests ran smoothly.',
                verified: true,
            },
        ],
    },

    /* ---------------------------- BANQUET HALLS ---------------------------- */
    {
        id: 'venue-the-regal-banquet',
        name: 'The Regal Banquet',
        brandName: 'The Regal Banquet',
        tagline: 'A five-star style banquet hall built for receptions, sangeets & corporate galas alike.',
        businessType: 'Banquet Hall',
        avatarUrl: createAvatarPlaceholder('The Regal Banquet'),
        coverImageUrl: createVenuePlaceholder('The Regal Banquet', 'Banquet Hall', 1200, 500),
        location: 'Mumbai, Maharashtra',
        citiesServed: ['Mumbai', 'Thane', 'Navi Mumbai'],
        rating: 4.85,
        reviewCount: 112,
        experienceYears: 10,
        eventsCompleted: 380,
        startingPrice: '₹1,50,000',
        priceRange: '₹1.5L - ₹5L',
        priceModel: 'Per Day (venue only)',
        servicesOffered: ['banquet-halls'],
        about:
            'The Regal Banquet is a fully air-conditioned banquet property with a pillar-less main hall, in-house AV, and a dedicated events team, popular for sangeets, receptions, and corporate galas across Mumbai. Empanelled catering and decor partners are available, or outside vendors can be brought in.',
        specialties: ['Pillar-less Main Hall', 'In-House AV & Lighting', 'Empanelled Vendor Network', 'Valet Parking'],
        availability: 'Booking weekends through 2027',
        verified: true,
        venueType: 'Banquet Hall',
        minGuests: 300,
        maxGuests: 900,
        capacityLabel: '300–900 Guests',
        amenities: ['Parking', 'AC', 'Catering', 'Decoration', 'DJ', 'Power Backup', 'Indoor Space'],
        venueSpaces: [
            { name: 'Main Banquet Hall', capacity: 'Up to 900 guests', description: 'Pillar-less hall with a 40-foot stage and rigged truss lighting.' },
            { name: 'Pre-Function Lobby', capacity: 'Up to 200 guests', description: 'Cocktail-style lobby used for welcome drinks and photo ops.' },
        ],
        policies: [
            'Outside catering allowed with a corkage fee',
            'Decor must be dismantled within 4 hours of event end',
            'Alcohol service requires venue-arranged license',
        ],
        portfolio: [
            {
                id: 'venue-port-regal-1',
                title: 'Sangeet Stage Production',
                category: 'Banquet Hall',
                location: 'Mumbai, Maharashtra',
                imageUrl: createVenuePlaceholder('Sangeet Stage Production', 'Banquet Hall', 800, 500),
                description: 'Full LED stage backdrop and truss lighting set up for a 600-guest sangeet.',
                tags: ['Sangeet', 'Stage', 'Indoor'],
                type: 'image',
            },
            {
                id: 'venue-port-regal-2',
                title: 'Reception Round-Table Layout',
                category: 'Banquet Hall',
                location: 'Mumbai, Maharashtra',
                imageUrl: createVenuePlaceholder('Reception Round-Table Layout', 'Banquet Hall', 800, 500),
                description: 'Formal reception seating for 700 guests with a central dance floor.',
                tags: ['Reception', 'Banquet'],
                type: 'image',
            },
        ],
        reviews: [
            {
                id: 'venue-rev-regal-1',
                authorName: 'Meher & Farhan Sheikh',
                rating: 4.9,
                date: 'January 2026',
                eventType: 'Sangeet & Reception',
                location: 'Mumbai, India',
                comment: 'Immaculate hall, the in-house lighting rig alone saved us a separate production vendor. The events team was extremely responsive.',
                verified: true,
            },
        ],
    },
    {
        id: 'venue-crystal-banquet-hall',
        name: 'Crystal Banquet Hall',
        brandName: 'Crystal Banquet Hall',
        tagline: 'A modern, chandelier-lit banquet space for elegant sit-down receptions.',
        businessType: 'Banquet Hall',
        avatarUrl: createAvatarPlaceholder('Crystal Banquet Hall'),
        coverImageUrl: createVenuePlaceholder('Crystal Banquet Hall', 'Banquet Hall', 1200, 500),
        location: 'Bengaluru, Karnataka',
        citiesServed: ['Bengaluru', 'Mysuru'],
        rating: 4.7,
        reviewCount: 57,
        experienceYears: 7,
        eventsCompleted: 210,
        startingPrice: '₹1,10,000',
        priceRange: '₹1.1L - ₹3.2L',
        priceModel: 'Per Day (venue only)',
        servicesOffered: ['banquet-halls'],
        about:
            'Crystal Banquet Hall is a contemporary, chandelier-lit banquet venue popular for engagement ceremonies and formal wedding receptions in Bengaluru, with a compact but elegant layout suited to mid-sized guest lists.',
        specialties: ['Chandelier-Lit Interiors', 'Compact Elegant Layouts', 'Engagement & Reception Specialists', 'In-House Sound System'],
        availability: 'Booking Q1-Q2 2027',
        verified: true,
        venueType: 'Banquet Hall',
        minGuests: 150,
        maxGuests: 400,
        capacityLabel: '150–400 Guests',
        amenities: ['Parking', 'AC', 'Catering', 'Decoration', 'Power Backup', 'Indoor Space'],
        venueSpaces: [
            { name: 'Main Hall', capacity: 'Up to 400 guests', description: 'Chandelier-lit hall with a central dance floor and raised stage.' },
        ],
        policies: [
            'In-house catering panel of 3 approved vendors',
            'Music must end by 11:00 PM per local noise regulations',
        ],
        portfolio: [
            {
                id: 'venue-port-crystal-1',
                title: 'Engagement Ceremony Setup',
                category: 'Banquet Hall',
                location: 'Bengaluru, Karnataka',
                imageUrl: createVenuePlaceholder('Engagement Ceremony Setup', 'Banquet Hall', 800, 500),
                description: 'Elegant round-table engagement layout under the hall’s signature chandeliers.',
                tags: ['Engagement', 'Banquet'],
                type: 'image',
            },
        ],
        reviews: [
            {
                id: 'venue-rev-crystal-1',
                authorName: 'Nisha & Rahul Gowda',
                rating: 4.7,
                date: 'November 2025',
                eventType: 'Engagement Ceremony',
                location: 'Bengaluru, India',
                comment: 'Beautiful hall for a 250-guest engagement. Compact but never felt crowded, and the lighting made photos look stunning.',
                verified: true,
            },
        ],
    },

    /* ------------------------------ VENUES (dedicated properties) ------------------------------ */
    {
        id: 'venue-rajmahal-estate',
        name: 'Rajmahal Wedding Estate',
        brandName: 'Rajmahal Wedding Estate',
        tagline: 'A heritage-style private estate built exclusively for multi-day wedding celebrations.',
        businessType: 'Dedicated Wedding Venue',
        avatarUrl: createAvatarPlaceholder('Rajmahal Wedding Estate'),
        coverImageUrl: createVenuePlaceholder('Rajmahal Wedding Estate', 'Dedicated Venue', 1200, 500),
        location: 'Udaipur, Rajasthan',
        citiesServed: ['Udaipur', 'Jodhpur', 'Jaipur'],
        rating: 4.95,
        reviewCount: 71,
        experienceYears: 14,
        eventsCompleted: 190,
        startingPrice: '₹3,50,000',
        priceRange: '₹3.5L - ₹15L',
        priceModel: 'Per Day / Full Estate Buyout',
        servicesOffered: ['venues'],
        about:
            'Rajmahal Wedding Estate is a private heritage-style property available on exclusive full-buyout, spanning courtyards, a lakeside lawn, and an indoor durbar hall — built specifically to host multi-day wedding celebrations from mehendi through reception.',
        specialties: ['Full-Property Exclusive Buyout', 'Multi-Day Celebration Layout', 'Heritage Architecture', 'On-Site Guest Accommodation'],
        availability: 'Booking Q4 2026 & 2027 destination weddings',
        verified: true,
        venueType: 'Dedicated Wedding Venue',
        minGuests: 200,
        maxGuests: 800,
        capacityLabel: '200–800 Guests',
        amenities: ['Parking', 'AC', 'Catering', 'Decoration', 'Rooms', 'DJ', 'Power Backup', 'Bridal Room', 'Groom Room', 'Indoor Space', 'Outdoor Space'],
        venueSpaces: [
            { name: 'Durbar Hall', capacity: 'Up to 400 guests', description: 'Indoor heritage hall with hand-painted ceilings, used for ceremonies and dinners.' },
            { name: 'Lakeside Lawn', capacity: 'Up to 800 guests', description: 'Open-air lawn facing the lake, ideal for a sundowner ceremony or sangeet stage.' },
            { name: 'Courtyard', capacity: 'Up to 250 guests', description: 'Intimate central courtyard used for mehendi and haldi functions.' },
        ],
        policies: [
            'Full-property buyout only — no partial-day bookings',
            '30 on-site guest rooms included in base package',
            'Outside decor & catering vendors permitted with venue approval',
            '60% advance required to block dates',
        ],
        portfolio: [
            {
                id: 'venue-port-rajmahal-1',
                title: 'Lakeside Lawn Sangeet',
                category: 'Dedicated Venue',
                location: 'Udaipur, Rajasthan',
                imageUrl: createVenuePlaceholder('Lakeside Lawn Sangeet', 'Dedicated Venue', 800, 500),
                description: 'Sangeet stage set up on the lakeside lawn at sunset for a 3-day destination wedding.',
                tags: ['Sangeet', 'Outdoor', 'Destination'],
                type: 'image',
            },
            {
                id: 'venue-port-rajmahal-2',
                title: 'Durbar Hall Ceremony',
                category: 'Dedicated Venue',
                location: 'Udaipur, Rajasthan',
                imageUrl: createVenuePlaceholder('Durbar Hall Ceremony', 'Dedicated Venue', 800, 500),
                description: 'Heritage durbar hall decorated for the main wedding ceremony.',
                tags: ['Ceremony', 'Heritage', 'Indoor'],
                type: 'image',
            },
        ],
        reviews: [
            {
                id: 'venue-rev-rajmahal-1',
                authorName: 'Olivia & Rahul Khanna',
                rating: 5,
                date: 'February 2026',
                eventType: '3-Day Destination Wedding',
                location: 'Udaipur, India',
                comment: 'Having the entire property to ourselves for three days made every function feel completely private. The lakeside lawn at sunset was unforgettable.',
                verified: true,
            },
        ],
    },
    {
        id: 'venue-green-acres-farmhouse',
        name: 'Green Acres Farmhouse',
        brandName: 'Green Acres Farmhouse',
        tagline: 'A private farmhouse property with landscaped lawns, ideal for boutique weddings.',
        businessType: 'Dedicated Wedding Venue',
        avatarUrl: createAvatarPlaceholder('Green Acres Farmhouse'),
        coverImageUrl: createVenuePlaceholder('Green Acres Farmhouse', 'Dedicated Venue', 1200, 500),
        location: 'Gurugram, Haryana',
        citiesServed: ['Delhi NCR', 'Gurugram', 'Faridabad'],
        rating: 4.8,
        reviewCount: 49,
        experienceYears: 8,
        eventsCompleted: 145,
        startingPrice: '₹2,80,000',
        priceRange: '₹2.8L - ₹8L',
        priceModel: 'Per Day / Full Property Buyout',
        servicesOffered: ['venues'],
        about:
            'Green Acres Farmhouse is a private landscaped property on the outskirts of Delhi NCR, offering exclusive-use booking with a main lawn, a covered pavilion, and a boutique guesthouse — popular for intimate, design-forward weddings.',
        specialties: ['Boutique Intimate Weddings', 'Landscaped Private Lawn', 'Covered Pavilion Backup', 'Design-Forward Styling Friendly'],
        availability: 'Accepting bookings for 2026-27 season',
        verified: true,
        venueType: 'Dedicated Wedding Venue',
        minGuests: 80,
        maxGuests: 350,
        capacityLabel: '80–350 Guests',
        amenities: ['Parking', 'Catering', 'Decoration', 'Rooms', 'Power Backup', 'Bridal Room', 'Outdoor Space'],
        venueSpaces: [
            { name: 'Main Lawn', capacity: 'Up to 350 guests', description: 'Landscaped open lawn with mature trees, used for ceremony and dinner.' },
            { name: 'Covered Pavilion', capacity: 'Up to 200 guests', description: 'Weather-backup pavilion adjoining the main lawn.' },
        ],
        policies: [
            'Full-property buyout only',
            'Outside vendors of the couple’s choice permitted',
            '8 boutique guest rooms on property',
        ],
        portfolio: [
            {
                id: 'venue-port-greenacres-1',
                title: 'Boutique Lawn Wedding',
                category: 'Dedicated Venue',
                location: 'Gurugram, Haryana',
                imageUrl: createVenuePlaceholder('Boutique Lawn Wedding', 'Dedicated Venue', 800, 500),
                description: 'An intimate 200-guest wedding styled on the main landscaped lawn.',
                tags: ['Intimate', 'Outdoor', 'Boutique'],
                type: 'image',
            },
        ],
        reviews: [
            {
                id: 'venue-rev-greenacres-1',
                authorName: 'Aditi & Rohan Kapoor',
                rating: 4.8,
                date: 'March 2026',
                eventType: 'Boutique Wedding',
                location: 'Gurugram, India',
                comment: 'Exactly the intimate, private feel we wanted — having the whole property to ourselves made planning so much easier.',
                verified: true,
            },
        ],
    },

    /* ------------------------------- RESORTS ------------------------------- */
    {
        id: 'venue-azure-bay-resort',
        name: 'Azure Bay Resort & Spa',
        brandName: 'Azure Bay Resort & Spa',
        tagline: 'A beachfront resort pairing wedding lawns with on-site guest stays and spa.',
        businessType: 'Resort',
        avatarUrl: createAvatarPlaceholder('Azure Bay Resort & Spa'),
        coverImageUrl: createVenuePlaceholder('Azure Bay Resort & Spa', 'Resort', 1200, 500),
        location: 'North Goa',
        citiesServed: ['North Goa', 'South Goa'],
        rating: 4.9,
        reviewCount: 96,
        experienceYears: 11,
        eventsCompleted: 230,
        startingPrice: '₹4,50,000',
        priceRange: '₹4.5L - ₹18L',
        priceModel: 'Per Day / Room Package',
        servicesOffered: ['resorts'],
        about:
            'Azure Bay Resort & Spa is a beachfront property with a dedicated wedding lawn, poolside deck, and 60 guest rooms on-site, popular for 2-4 day destination weddings where guests stay on the property throughout the celebration.',
        specialties: ['Beachfront Ceremony Deck', 'On-Site Guest Rooms', 'Destination Wedding Packages', 'Spa & Leisure for Guests'],
        availability: 'Booking peak winter destination-wedding season',
        verified: true,
        venueType: 'Resort',
        minGuests: 100,
        maxGuests: 500,
        capacityLabel: '100–500 Guests',
        amenities: ['Parking', 'AC', 'Catering', 'Decoration', 'Rooms', 'DJ', 'Power Backup', 'Outdoor Space', 'Indoor Space'],
        venueSpaces: [
            { name: 'Beachfront Lawn', capacity: 'Up to 500 guests', description: 'Open-air ceremony lawn facing the beach, best used at sunset.' },
            { name: 'Poolside Deck', capacity: 'Up to 250 guests', description: 'Used for cocktail evenings and sundowner functions.' },
            { name: 'Indoor Ballroom', capacity: 'Up to 350 guests', description: 'Weather-backup ballroom for the reception.' },
        ],
        policies: [
            'Minimum 3-night room block required for wedding bookings',
            'Outside catering not permitted — resort catering only',
            'Beach ceremony subject to tide and weather timing',
        ],
        portfolio: [
            {
                id: 'venue-port-azurebay-1',
                title: 'Beachfront Sunset Ceremony',
                category: 'Resort',
                location: 'North Goa',
                imageUrl: createVenuePlaceholder('Beachfront Sunset Ceremony', 'Resort', 800, 500),
                description: 'A sunset beachfront ceremony for 300 guests with a floral mandap facing the sea.',
                tags: ['Beach Wedding', 'Sunset', 'Destination'],
                type: 'image',
            },
            {
                id: 'venue-port-azurebay-2',
                title: 'Poolside Cocktail Evening',
                category: 'Resort',
                location: 'North Goa',
                imageUrl: createVenuePlaceholder('Poolside Cocktail Evening', 'Resort', 800, 500),
                description: 'Poolside cocktail setup with string lighting for a destination wedding welcome night.',
                tags: ['Cocktail', 'Poolside'],
                type: 'image',
            },
        ],
        reviews: [
            {
                id: 'venue-rev-azurebay-1',
                authorName: 'Ishita & Varun Bhatia',
                rating: 5,
                date: 'January 2026',
                eventType: '3-Day Destination Wedding',
                location: 'Goa, India',
                comment: 'Having 60 rooms on-site meant our entire guest list stayed together for three days — it made the whole wedding feel like one long celebration.',
                verified: true,
            },
        ],
    },
    {
        id: 'venue-pine-ridge-resort',
        name: 'Pine Ridge Hill Resort',
        brandName: 'Pine Ridge Hill Resort',
        tagline: 'A hillside resort with panoramic valley views, ideal for intimate destination weddings.',
        businessType: 'Resort',
        avatarUrl: createAvatarPlaceholder('Pine Ridge Hill Resort'),
        coverImageUrl: createVenuePlaceholder('Pine Ridge Hill Resort', 'Resort', 1200, 500),
        location: 'Lonavala, Maharashtra',
        citiesServed: ['Lonavala', 'Khandala', 'Pune'],
        rating: 4.82,
        reviewCount: 53,
        experienceYears: 9,
        eventsCompleted: 130,
        startingPrice: '₹3,80,000',
        priceRange: '₹3.8L - ₹12L',
        priceModel: 'Per Day / Room Package',
        servicesOffered: ['resorts'],
        about:
            'Pine Ridge Hill Resort sits on a hillside overlooking the Western Ghats, offering a valley-view lawn, an indoor banquet hall, and 40 rooms on-site — a popular pick for couples wanting a scenic, weekend-getaway feel for guests.',
        specialties: ['Valley-View Ceremony Deck', 'Weekend-Getaway Guest Experience', 'On-Site Rooms & Dining', 'Monsoon-Friendly Covered Spaces'],
        availability: 'Booking weekends through 2026-27',
        verified: true,
        venueType: 'Resort',
        minGuests: 80,
        maxGuests: 300,
        capacityLabel: '80–300 Guests',
        amenities: ['Parking', 'AC', 'Catering', 'Rooms', 'Power Backup', 'Outdoor Space', 'Indoor Space'],
        venueSpaces: [
            { name: 'Valley View Lawn', capacity: 'Up to 300 guests', description: 'Terraced lawn overlooking the valley, best for morning or sunset ceremonies.' },
            { name: 'Indoor Banquet Hall', capacity: 'Up to 250 guests', description: 'Monsoon-friendly covered hall for receptions.' },
        ],
        policies: [
            'Minimum 2-night room block required',
            'Outdoor lawn bookings subject to seasonal weather advisories',
        ],
        portfolio: [
            {
                id: 'venue-port-pineridge-1',
                title: 'Valley View Morning Ceremony',
                category: 'Resort',
                location: 'Lonavala, Maharashtra',
                imageUrl: createVenuePlaceholder('Valley View Morning Ceremony', 'Resort', 800, 500),
                description: 'A morning ceremony staged on the terraced lawn with the valley as backdrop.',
                tags: ['Hillside', 'Morning Ceremony', 'Scenic'],
                type: 'image',
            },
        ],
        reviews: [
            {
                id: 'venue-rev-pineridge-1',
                authorName: 'Neha & Aditya Joshi',
                rating: 4.85,
                date: 'October 2025',
                eventType: 'Weekend Destination Wedding',
                location: 'Lonavala, India',
                comment: 'Our guests treated it like a weekend getaway — the view from the lawn made for the best photos of the whole wedding.',
                verified: true,
            },
        ],
    },

    /* -------------------------------- LAWNS -------------------------------- */
    {
        id: 'venue-royal-palm-lawns',
        name: 'Royal Palm Lawns',
        brandName: 'Royal Palm Lawns',
        tagline: 'Sprawling landscaped lawns with a covered banquet backup for outdoor celebrations.',
        businessType: 'Lawn',
        avatarUrl: createAvatarPlaceholder('Royal Palm Lawns'),
        coverImageUrl: createVenuePlaceholder('Royal Palm Lawns', 'Lawn', 1200, 500),
        location: 'Jaipur, Rajasthan',
        citiesServed: ['Jaipur', 'Ajmer'],
        rating: 4.7,
        reviewCount: 66,
        experienceYears: 10,
        eventsCompleted: 260,
        startingPrice: '₹90,000',
        priceRange: '₹90K - ₹2.5L',
        priceModel: 'Per Day (venue only)',
        servicesOffered: ['lawns'],
        about:
            'Royal Palm Lawns offers a large landscaped open lawn lined with palm trees, alongside a covered banquet hall used as weather backup. Popular for outdoor mandap ceremonies, sundowner cocktails, and sangeet nights.',
        specialties: ['Open-Air Mandap Ceremonies', 'Palm-Lined Landscaping', 'Weather-Backup Banquet Hall', 'Ample On-Site Parking'],
        availability: 'Booking Q4 2026 wedding season',
        verified: true,
        venueType: 'Lawn',
        minGuests: 150,
        maxGuests: 700,
        capacityLabel: '150–700 Guests',
        amenities: ['Parking', 'Catering', 'Decoration', 'Power Backup', 'Outdoor Space', 'Indoor Space'],
        venueSpaces: [
            { name: 'Main Lawn', capacity: 'Up to 700 guests', description: 'Open landscaped lawn with a dedicated mandap zone.' },
            { name: 'Weather-Backup Hall', capacity: 'Up to 400 guests', description: 'Covered hall adjoining the lawn, used in case of rain.' },
        ],
        policies: [
            'Outside catering & decor vendors permitted',
            'Lawn bookings include weather-backup hall at no extra cost',
            'Sound curfew at 10:30 PM per local regulations',
        ],
        portfolio: [
            {
                id: 'venue-port-royalpalm-1',
                title: 'Open-Air Mandap Ceremony',
                category: 'Lawn',
                location: 'Jaipur, Rajasthan',
                imageUrl: createVenuePlaceholder('Open-Air Mandap Ceremony', 'Lawn', 800, 500),
                description: 'A 500-guest outdoor mandap ceremony staged under the open sky, palm trees lining the aisle.',
                tags: ['Outdoor', 'Mandap', 'Lawn'],
                type: 'image',
            },
        ],
        reviews: [
            {
                id: 'venue-rev-royalpalm-1',
                authorName: 'Simran & Kabir Anand',
                rating: 4.7,
                date: 'December 2025',
                eventType: 'Outdoor Wedding Ceremony',
                location: 'Jaipur, India',
                comment: 'The lawn looked stunning at golden hour, and knowing there was a covered hall as backup took the weather-worry off our minds entirely.',
                verified: true,
            },
        ],
    },
    {
        id: 'venue-greenfield-gardens',
        name: 'Greenfield Gardens',
        brandName: 'Greenfield Gardens',
        tagline: 'A budget-friendly garden lawn suited to sangeet nights and mid-sized celebrations.',
        businessType: 'Lawn',
        avatarUrl: createAvatarPlaceholder('Greenfield Gardens'),
        coverImageUrl: createVenuePlaceholder('Greenfield Gardens', 'Lawn', 1200, 500),
        location: 'Pune, Maharashtra',
        citiesServed: ['Pune', 'Pimpri-Chinchwad'],
        rating: 4.6,
        reviewCount: 41,
        experienceYears: 6,
        eventsCompleted: 150,
        startingPrice: '₹65,000',
        priceRange: '₹65K - ₹1.8L',
        priceModel: 'Per Day (venue only)',
        servicesOffered: ['lawns'],
        about:
            'Greenfield Gardens is a straightforward, well-maintained garden lawn popular for sangeet nights, haldi functions, and mid-sized wedding celebrations looking for an affordable outdoor space.',
        specialties: ['Budget-Friendly Outdoor Space', 'Sangeet & Haldi Functions', 'Simple Landscaped Garden', 'Flexible Vendor Policy'],
        availability: 'Open availability, booking fast for December',
        verified: false,
        venueType: 'Lawn',
        minGuests: 100,
        maxGuests: 350,
        capacityLabel: '100–350 Guests',
        amenities: ['Parking', 'Catering', 'Power Backup', 'Outdoor Space'],
        venueSpaces: [
            { name: 'Garden Lawn', capacity: 'Up to 350 guests', description: 'Open garden lawn with a small covered stage area.' },
        ],
        policies: [
            'Fully flexible outside vendor policy',
            'No permanent structures allowed on the lawn',
        ],
        portfolio: [
            {
                id: 'venue-port-greenfield-1',
                title: 'Sangeet Night Setup',
                category: 'Lawn',
                location: 'Pune, Maharashtra',
                imageUrl: createVenuePlaceholder('Sangeet Night Setup', 'Lawn', 800, 500),
                description: 'String-lit sangeet stage setup on the garden lawn for a 250-guest function.',
                tags: ['Sangeet', 'Outdoor', 'Budget-Friendly'],
                type: 'image',
            },
        ],
        reviews: [
            {
                id: 'venue-rev-greenfield-1',
                authorName: 'Pooja & Aniket Bhosale',
                rating: 4.6,
                date: 'November 2025',
                eventType: 'Sangeet Night',
                location: 'Pune, India',
                comment: 'Great value for a mid-sized sangeet. The venue let us bring in our own decorator and caterer with no fuss.',
                verified: false,
            },
        ],
    },

    /* --------------------------- COMMUNITY HALLS --------------------------- */
    {
        id: 'venue-sarvodaya-community-hall',
        name: 'Sarvodaya Community Hall',
        brandName: 'Sarvodaya Community Hall',
        tagline: 'An affordable society community hall for simple, intimate wedding functions.',
        businessType: 'Community Hall',
        avatarUrl: createAvatarPlaceholder('Sarvodaya Community Hall'),
        coverImageUrl: createVenuePlaceholder('Sarvodaya Community Hall', 'Community Hall', 1200, 500),
        location: 'Pune, Maharashtra',
        citiesServed: ['Pune'],
        rating: 4.4,
        reviewCount: 27,
        experienceYears: 5,
        eventsCompleted: 95,
        startingPrice: '₹35,000',
        priceRange: '₹35K - ₹80K',
        priceModel: 'Per Day (venue only)',
        servicesOffered: ['community-halls'],
        about:
            'Sarvodaya Community Hall is a society-run hall offering a simple, functional space at municipal-friendly rates, popular for intimate weddings, receptions, and family functions on a tighter budget.',
        specialties: ['Municipal-Friendly Rates', 'Basic Stage & Seating', 'Kitchen Access for Outside Caterers', 'Society Booking Process'],
        availability: 'Bookable via society office, subject to availability',
        verified: false,
        venueType: 'Community Hall',
        minGuests: 50,
        maxGuests: 200,
        capacityLabel: '50–200 Guests',
        amenities: ['Parking', 'Catering', 'Indoor Space'],
        venueSpaces: [
            { name: 'Main Hall', capacity: 'Up to 200 guests', description: 'Simple hall with a small stage and plastic/banquet chair seating.' },
        ],
        policies: [
            'Bookings made through the society office, not directly online',
            'Outside caterers welcome; kitchen access provided',
            'Hall must be vacated by 10:00 PM',
        ],
        portfolio: [
            {
                id: 'venue-port-sarvodaya-1',
                title: 'Intimate Reception Setup',
                category: 'Community Hall',
                location: 'Pune, Maharashtra',
                imageUrl: createVenuePlaceholder('Intimate Reception Setup', 'Community Hall', 800, 500),
                description: 'A simple, tastefully decorated reception for 150 guests.',
                tags: ['Budget-Friendly', 'Intimate'],
                type: 'image',
            },
        ],
        reviews: [
            {
                id: 'venue-rev-sarvodaya-1',
                authorName: 'Neel & Ira Chopra',
                rating: 4.4,
                date: 'September 2025',
                eventType: 'Wedding Reception',
                location: 'Pune, India',
                comment: 'Simple, no-frills, and very affordable for what we needed. Booking through the society took a bit longer than expected but was worth it.',
                verified: false,
            },
        ],
    },
    {
        id: 'venue-janseva-samaj-hall',
        name: 'Janseva Samaj Hall',
        brandName: 'Janseva Samaj Hall',
        tagline: 'A trust-run community hall offering a cost-effective space for wedding functions.',
        businessType: 'Community Hall',
        avatarUrl: createAvatarPlaceholder('Janseva Samaj Hall'),
        coverImageUrl: createVenuePlaceholder('Janseva Samaj Hall', 'Community Hall', 1200, 500),
        location: 'Ahmedabad, Gujarat',
        citiesServed: ['Ahmedabad', 'Gandhinagar'],
        rating: 4.5,
        reviewCount: 33,
        experienceYears: 9,
        eventsCompleted: 175,
        startingPrice: '₹40,000',
        priceRange: '₹40K - ₹1L',
        priceModel: 'Per Day (venue only)',
        servicesOffered: ['community-halls'],
        about:
            'Janseva Samaj Hall is a long-running trust-managed hall in Ahmedabad offering an affordable, functional venue for weddings, receptions, and community functions with straightforward booking terms.',
        specialties: ['Trust-Managed Booking', 'Community Function Specialists', 'Basic AV Included', 'Flexible Catering Access'],
        availability: 'Good availability on weekdays',
        verified: false,
        venueType: 'Community Hall',
        minGuests: 60,
        maxGuests: 250,
        capacityLabel: '60–250 Guests',
        amenities: ['Parking', 'Catering', 'Power Backup', 'Indoor Space'],
        venueSpaces: [
            { name: 'Main Hall', capacity: 'Up to 250 guests', description: 'Functional hall with basic sound system and stage.' },
        ],
        policies: [
            'Advance booking required through the trust office',
            'Outside catering permitted with prior notice',
        ],
        portfolio: [
            {
                id: 'venue-port-janseva-1',
                title: 'Community Wedding Function',
                category: 'Community Hall',
                location: 'Ahmedabad, Gujarat',
                imageUrl: createVenuePlaceholder('Community Wedding Function', 'Community Hall', 800, 500),
                description: 'A straightforward wedding function setup for 200 guests.',
                tags: ['Community', 'Budget-Friendly'],
                type: 'image',
            },
        ],
        reviews: [
            {
                id: 'venue-rev-janseva-1',
                authorName: 'Ritika & Sohom Basu',
                rating: 4.5,
                date: 'August 2025',
                eventType: 'Wedding Function',
                location: 'Ahmedabad, India',
                comment: 'Good value hall, clean and well-maintained. Perfect for our modest 180-guest function.',
                verified: false,
            },
        ],
    },
];

/* ==========================================================================
   HELPER FUNCTIONS
   ========================================================================== */
export const getVenuesByCategory = (categorySlug?: string): Professional[] => {
    if (!categorySlug) return VENUE_MOCK_PROFESSIONALS;
    return VENUE_MOCK_PROFESSIONALS.filter((v) => v.servicesOffered.includes(categorySlug));
};

export const getVenueById = (id: string): Professional | undefined => {
    return VENUE_MOCK_PROFESSIONALS.find((v) => v.id === id);
};

export const getVenueCategoryBySlug = (slug: string): ServiceItem | undefined => {
    return VENUE_CATEGORIES.find((c) => c.slug === slug);
};

/** Similar venues: same category, excluding itself, best-rated first. */
export const getSimilarVenues = (venue: Professional, limit = 3): Professional[] => {
    return VENUE_MOCK_PROFESSIONALS.filter(
        (v) => v.id !== venue.id && v.servicesOffered.some((s) => venue.servicesOffered.includes(s))
    )
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
};
