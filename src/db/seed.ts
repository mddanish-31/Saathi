import { createClient } from '@supabase/supabase-js';
import { ALL_MARKETPLACE_CATEGORIES, WEDDING_SUBCATEGORIES_CANONICAL } from '../data/categoryData';
import { A1_SERVICES, MOCK_PROFESSIONALS as A1_PROFESSIONALS } from '../data/weddingPlanningData';
import { A3_SERVICES, A3_MOCK_PROFESSIONALS } from '../data/musicEntertainmentData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseSecret = (process.env.SUPABASE_SECRET_KEY || '').trim();

if (!supabaseUrl || !supabaseSecret) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in environment');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseSecret, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export async function seed() {
  console.log('--- Starting Saathi Database Seeding ---');

  // 1. Seed Categories
  console.log('Seeding categories...');
  for (const cat of ALL_MARKETPLACE_CATEGORIES) {
    const { error } = await supabase.from('categories').upsert(
      {
        id: cat.id,
        code: cat.code,
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        is_active: cat.isActive,
        hero_image: cat.heroImage || null,
      },
      { onConflict: 'slug' }
    );
    if (error) console.error(`Error inserting category ${cat.slug}:`, error.message);
  }

  // 2. Seed Subcategories
  console.log('Seeding subcategories...');
  for (const sub of WEDDING_SUBCATEGORIES_CANONICAL) {
    const { error } = await supabase.from('subcategories').upsert(
      {
        id: sub.id,
        category_slug: 'weddings-events',
        code: sub.code,
        slug: sub.slug,
        name: sub.name,
        description: sub.description,
        badge: sub.badge || null,
        is_active: sub.isActive,
        image_url: sub.imageUrl || null,
      },
      { onConflict: 'slug' }
    );
    if (error) console.error(`Error inserting subcategory ${sub.slug}:`, error.message);
  }

  // 3. Seed Services
  console.log('Seeding services...');
  const allServices = [...A1_SERVICES, ...A3_SERVICES];
  for (const srv of allServices) {
    const { error } = await supabase.from('services').upsert(
      {
        id: srv.id,
        slug: srv.slug,
        title: srv.title,
        short_description: srv.shortDescription,
        full_description: srv.fullDescription,
        category_slug: srv.categorySlug,
        subcategory_slug: srv.subCategorySlug,
        starting_price: srv.startingPrice,
        price_model: srv.priceModel,
        features: srv.features,
        typical_timeline: srv.typicalTimeline,
        ideal_for: srv.idealFor,
      },
      { onConflict: 'slug' }
    );
    if (error) console.error(`Error inserting service ${srv.slug}:`, error.message);
  }

  // 4. Seed Professionals, Portfolios, and Reviews
  console.log('Seeding professionals, portfolios, and reviews...');
  const allPros = [...A1_PROFESSIONALS, ...A3_MOCK_PROFESSIONALS];
  for (const pro of allPros) {
    const { error: proError } = await supabase.from('professionals').upsert(
      {
        id: pro.id,
        name: pro.name,
        brand_name: pro.brandName,
        tagline: pro.tagline,
        business_type: pro.businessType,
        avatar_url: pro.avatarUrl || null,
        cover_image_url: pro.coverImageUrl || null,
        location: pro.location,
        cities_served: pro.citiesServed,
        rating: pro.rating.toString(),
        review_count: pro.reviewCount,
        experience_years: pro.experienceYears,
        events_completed: pro.eventsCompleted,
        starting_price: pro.startingPrice,
        price_range: pro.priceRange,
        price_model: pro.priceModel,
        services_offered: pro.servicesOffered,
        about: pro.about,
        specialties: pro.specialties,
        availability: pro.availability,
        verified: pro.verified,
        category: A3_MOCK_PROFESSIONALS.some((m) => m.id === pro.id)
          ? 'music-entertainment'
          : 'weddings-events',
        performance_type: pro.performanceType || null,
        genres: pro.genres || null,
        event_types: pro.eventTypes || null,
        performance_duration: pro.performanceDuration || null,
        team_size: pro.teamSize || null,
        equipment_provided: pro.equipmentProvided || null,
      },
      { onConflict: 'id' }
    );
    if (proError) {
      console.error(`Error inserting professional ${pro.id}:`, proError.message);
      continue;
    }

    // Seed Portfolio items
    if (pro.portfolio && pro.portfolio.length > 0) {
      for (const item of pro.portfolio) {
        const { error: portError } = await supabase.from('portfolio_items').upsert(
          {
            id: `${pro.id}-${item.id}`,
            professional_id: pro.id,
            title: item.title,
            category: item.category,
            location: item.location,
            image_url: item.imageUrl || null,
            description: item.description,
            tags: item.tags,
            type: item.type || 'image',
          },
          { onConflict: 'id' }
        );
        if (portError) console.error(`Error inserting portfolio item for ${pro.id}:`, portError.message);
      }
    }

    // Seed Reviews
    if (pro.reviews && pro.reviews.length > 0) {
      for (const rev of pro.reviews) {
        const { error: revError } = await supabase.from('reviews').upsert(
          {
            id: `${pro.id}-${rev.id}`,
            professional_id: pro.id,
            author_name: rev.authorName,
            rating: rev.rating.toString(),
            date: rev.date,
            event_type: rev.eventType,
            location: rev.location,
            comment: rev.comment,
            verified: rev.verified,
          },
          { onConflict: 'id' }
        );
        if (revError) console.error(`Error inserting review for ${pro.id}:`, revError.message);
      }
    }
  }

  // 5. Seed Demo Enquiries
  console.log('Seeding initial demo enquiries...');
  const demoEnquiries = [
    {
      id: 'enq-101',
      professional_id: 'pro-aura-weddings',
      customer_name: 'Aanya Sharma',
      customer_email: 'aanya.sharma@example.com',
      customer_phone: '+91 98201 54321',
      service_id: 'wedding-planning',
      service_name: 'Full-Service Wedding Planning',
      event_date: '2026-11-20',
      event_location: 'Udaipur, Rajasthan',
      budget_range: '₹15L - ₹25L',
      message:
        'We are planning a 3-day royal palace wedding in Udaipur for approx 250 guests. We need comprehensive planning, vendor curation, and hospitality logistics management.',
      status: 'reviewed',
    },
    {
      id: 'enq-102',
      professional_id: 'pro-vedic-heritage',
      customer_name: 'Aanya Sharma',
      customer_email: 'aanya.sharma@example.com',
      customer_phone: '+91 98201 54321',
      service_id: 'wedding-coordination',
      service_name: 'Day-of & Ritual Coordination',
      event_date: '2026-10-12',
      event_location: 'South Mumbai, Maharashtra',
      budget_range: '₹3L - ₹5L',
      message:
        'Need on-ground coordination for ritual timelines, sangeet cue management, and guest ushering for our Mumbai reception.',
      status: 'pending',
    },
  ];

  for (const enq of demoEnquiries) {
    const { error: enqError } = await supabase.from('enquiries').upsert(
      enq,
      { onConflict: 'id' }
    );
    if (enqError) console.error(`Error inserting enquiry ${enq.id}:`, enqError.message);
  }

  console.log('--- Database Seeding Complete ---');
}

// Allow direct execution via tsx / node
if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seed failed:', err);
      process.exit(1);
    });
}
