import { NextRequest } from 'next/server';
import { createClient } from '../../../../../src/lib/supabase/server';
import { WEDDING_SUBCATEGORIES_CANONICAL } from '../../../../../src/data/categoryData';
import { jsonResponse, errorResponse, handleApiError } from '../../../../../src/lib/api-response';

export const revalidate = 3600;

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string; sub: string } }
) {
  try {
    const { slug: categorySlug, sub: subSlug } = params;
    const supabase = createClient();

    const { data, error } = await supabase
      .from('subcategories')
      .select('*, services(*)')
      .eq('category_slug', categorySlug)
      .eq('slug', subSlug)
      .single();

    if (!error && data) {
      return jsonResponse(
        {
          id: data.id,
          code: data.code,
          name: data.name,
          slug: data.slug,
          description: data.description,
          badge: data.badge,
          isActive: data.is_active,
          imageUrl: data.image_url,
          services: (data.services || []).map((srv: Record<string, unknown>) => ({
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
          })),
        },
        200,
        { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' }
      );
    }

    // Fallback to local canonical data
    const sub = WEDDING_SUBCATEGORIES_CANONICAL.find((s) => s.slug === subSlug);
    if (sub) {
      return jsonResponse(sub, 200, {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      });
    }

    return errorResponse(`Subcategory '${subSlug}' in category '${categorySlug}' not found`, 404);
  } catch (err) {
    return handleApiError(err);
  }
}
