import { NextRequest } from 'next/server';
import { createClient } from '../../../src/lib/supabase/server';
import { ALL_MARKETPLACE_CATEGORIES } from '../../../src/data/categoryData';
import { jsonResponse, handleApiError } from '../../../src/lib/api-response';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour (ISR)

export async function GET(_req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: dbCategories, error } = await supabase
      .from('categories')
      .select('*, subcategories(*)')
      .order('code', { ascending: true });

    if (!error && dbCategories && dbCategories.length > 0) {
      // Map to MarketplaceCategory shape
      const categories = dbCategories.map((c) => ({
        id: c.id,
        code: c.code,
        name: c.name,
        slug: c.slug,
        description: c.description,
        isActive: c.is_active,
        heroImage: c.hero_image,
        subCategories: (c.subcategories || []).map((s: Record<string, unknown>) => ({
          id: s.id,
          code: s.code,
          name: s.name,
          slug: s.slug,
          description: s.description,
          badge: s.badge,
          isActive: s.is_active,
          imageUrl: s.image_url,
        })),
      }));

      return jsonResponse(categories, 200, {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      });
    }

    // Fallback to static canonical data if database has not yet been seeded
    return jsonResponse(ALL_MARKETPLACE_CATEGORIES, 200, {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    });
  } catch (err) {
    return handleApiError(err);
  }
}
