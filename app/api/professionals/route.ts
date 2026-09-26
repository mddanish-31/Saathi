import { NextRequest } from 'next/server';
import { createClient } from '../../../src/lib/supabase/server';
import { queryProfessionalsSchema } from '../../../src/lib/validators';
import { ALL_PROFESSIONALS } from '../../../src/data/professionalDirectory';
import { jsonResponse, handleApiError } from '../../../src/lib/api-response';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

interface CacheEntry {
  data: unknown;
  timestamp: number;
}
const CACHE_TTL_MS = 60 * 1000;
const professionalsCache = new Map<string, CacheEntry>();

export async function GET(req: NextRequest) {
  try {
    const cacheKey = req.url;
    const cached = professionalsCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return jsonResponse(cached.data, 200, {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        'X-Cache': 'HIT',
      });
    }

    const { searchParams } = new URL(req.url);
    const parsedQuery = queryProfessionalsSchema.parse({
      category: searchParams.get('category') || undefined,
      city: searchParams.get('city') || undefined,
      search: searchParams.get('search') || undefined,
      page: searchParams.get('page') || 1,
      limit: searchParams.get('limit') || 20,
    });

    // Enforce server-side limit ceiling at 50
    const limit = Math.min(parsedQuery.limit, 50);
    const page = parsedQuery.page;
    const offset = (page - 1) * limit;

    const supabase = createClient();
    let query = supabase
      .from('professionals')
      .select('*, portfolio_items(*), reviews(*)', { count: 'exact' });

    if (parsedQuery.category) {
      query = query.eq('category', parsedQuery.category);
    }
    if (parsedQuery.city) {
      query = query.contains('cities_served', [parsedQuery.city]);
    }
    if (parsedQuery.search) {
      const term = `%${parsedQuery.search}%`;
      query = query.or(`name.ilike.${term},brand_name.ilike.${term},about.ilike.${term}`);
    }

    query = query.range(offset, offset + limit - 1).order('rating', { ascending: false });

    const { data, count, error } = await query;

    if (!error && data) {
      const professionals = data.map((pro) => ({
        id: pro.id,
        name: pro.name,
        brandName: pro.brand_name,
        tagline: pro.tagline,
        businessType: pro.business_type,
        avatarUrl: pro.avatar_url,
        coverImageUrl: pro.cover_image_url,
        location: pro.location,
        citiesServed: pro.cities_served || [],
        rating: parseFloat(pro.rating) || 0,
        reviewCount: pro.review_count,
        experienceYears: pro.experience_years,
        eventsCompleted: pro.events_completed,
        startingPrice: pro.starting_price,
        priceRange: pro.price_range,
        priceModel: pro.price_model,
        servicesOffered: pro.services_offered || [],
        about: pro.about,
        specialties: pro.specialties || [],
        availability: pro.availability,
        verified: pro.verified,
        portfolio: (pro.portfolio_items || []).map((item: Record<string, unknown>) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          location: item.location,
          imageUrl: item.image_url,
          description: item.description,
          tags: item.tags || [],
          type: item.type || 'image',
        })),
        reviews: (pro.reviews || []).map((rev: Record<string, unknown>) => ({
          id: rev.id,
          authorName: rev.author_name,
          rating: parseFloat(rev.rating as string) || 0,
          date: rev.date,
          eventType: rev.event_type,
          location: rev.location,
          comment: rev.comment,
          verified: rev.verified,
        })),
        performanceType: pro.performance_type,
        genres: pro.genres,
        eventTypes: pro.event_types,
        performanceDuration: pro.performance_duration,
        teamSize: pro.team_size,
        equipmentProvided: pro.equipment_provided,
      }));

      const total = count ?? professionals.length;
      const responseData = {
        professionals,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
      professionalsCache.set(cacheKey, { data: responseData, timestamp: Date.now() });

      return jsonResponse(responseData, 200, {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        'X-Cache': 'MISS',
      });
    }

    // Fallback to in-memory mock data (only on DB error)
    let filtered = ALL_PROFESSIONALS;
    if (parsedQuery.category) {
      if (parsedQuery.category === 'music-entertainment') {
        filtered = filtered.filter((p) =>
          ['pro-beatbox-collective', 'pro-avantika-anchors', 'pro-taal-live', 'pro-nrityadhara-troupe'].includes(p.id)
        );
      } else if (parsedQuery.category === 'weddings-events') {
        filtered = filtered.filter(
          (p) =>
            !['pro-beatbox-collective', 'pro-avantika-anchors', 'pro-taal-live', 'pro-nrityadhara-troupe'].includes(p.id)
        );
      }
    }
    if (parsedQuery.city) {
      filtered = filtered.filter((p) =>
        p.citiesServed.some((c) => c.toLowerCase() === parsedQuery.city?.toLowerCase())
      );
    }
    if (parsedQuery.search) {
      const q = parsedQuery.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brandName.toLowerCase().includes(q) ||
          p.about.toLowerCase().includes(q)
      );
    }

    const total = filtered.length;
    const paginated = filtered.slice(offset, offset + limit);

    return jsonResponse({
      professionals: paginated,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    return handleApiError(err);
  }
}
