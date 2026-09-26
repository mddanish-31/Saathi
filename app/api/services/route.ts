import { NextRequest } from 'next/server';
import { createClient } from '../../../src/lib/supabase/server';
import { ALL_SERVICES } from '../../../src/data/professionalDirectory';
import { jsonResponse, handleApiError } from '../../../src/lib/api-response';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const sub = searchParams.get('sub');

    const supabase = createClient();
    let query = supabase.from('services').select('*');

    if (category) {
      query = query.eq('category_slug', category);
    }
    if (sub) {
      query = query.eq('subcategory_slug', sub);
    }

    const { data, error } = await query;

    if (!error && data && data.length > 0) {
      const services = data.map((srv) => ({
        id: srv.id,
        slug: srv.slug,
        title: srv.title,
        shortDescription: srv.short_description,
        fullDescription: srv.full_description,
        startingPrice: srv.starting_price,
        priceModel: srv.price_model,
        categorySlug: srv.category_slug,
        subcategorySlug: srv.subcategory_slug,
        features: srv.features,
        typicalTimeline: srv.typical_timeline,
        idealFor: srv.ideal_for,
      }));

      return jsonResponse(services, 200, {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      });
    }

    // Fallback filter
    let filtered = ALL_SERVICES;
    if (category) {
      filtered = filtered.filter((s) => s.categorySlug === category);
    }
    if (sub) {
      filtered = filtered.filter((s) => s.subCategorySlug === sub);
    }

    return jsonResponse(filtered, 200, {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    });
  } catch (err) {
    return handleApiError(err);
  }
}
