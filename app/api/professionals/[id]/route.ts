import { NextRequest } from 'next/server';
import { createClient } from '../../../../src/lib/supabase/server';
import { updateProfessionalSchema } from '../../../../src/lib/validators';
import { getProfessionalById } from '../../../../src/data/professionalDirectory';
import { jsonResponse, errorResponse, handleApiError } from '../../../../src/lib/api-response';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const supabase = createClient();

    const { data: pro, error } = await supabase
      .from('professionals')
      .select('*, portfolio_items(*), reviews(*)')
      .eq('id', id)
      .single();

    if (!error && pro) {
      const professional = {
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
      };

      return jsonResponse(professional);
    }

    // Fallback to in-memory directory
    const fallback = getProfessionalById(id);
    if (fallback) {
      return jsonResponse(fallback);
    }

    return errorResponse(`Professional with ID '${id}' not found`, 404);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const supabase = createClient();

    // 1. Authenticate user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return errorResponse('Authentication required', 401);
    }

    // 2. Server-side role check
    const role = user.user_metadata?.role;
    if (role !== 'professional') {
      return errorResponse('Forbidden: only professional accounts can edit profiles', 403);
    }

    // 3. Ownership check: verify professional profile is owned by this user
    const { data: existingPro, error: fetchError } = await supabase
      .from('professionals')
      .select('id, user_id')
      .eq('id', id)
      .single();

    if (fetchError || !existingPro) {
      return errorResponse('Professional profile not found', 404);
    }

    // If user_id is set on the profile, it MUST match auth.uid()
    if (existingPro.user_id && existingPro.user_id !== user.id) {
      return errorResponse('Forbidden: You can only edit your own professional profile', 403);
    }

    // 4. Validate body
    const body = await req.json();
    const validated = updateProfessionalSchema.parse(body);

    const updatePayload: Record<string, unknown> = {};
    if (validated.name !== undefined) updatePayload.name = validated.name;
    if (validated.brandName !== undefined) updatePayload.brand_name = validated.brandName;
    if (validated.tagline !== undefined) updatePayload.tagline = validated.tagline;
    if (validated.businessType !== undefined) updatePayload.business_type = validated.businessType;
    if (validated.location !== undefined) updatePayload.location = validated.location;
    if (validated.citiesServed !== undefined) updatePayload.cities_served = validated.citiesServed;
    if (validated.startingPrice !== undefined) updatePayload.starting_price = validated.startingPrice;
    if (validated.priceRange !== undefined) updatePayload.price_range = validated.priceRange;
    if (validated.priceModel !== undefined) updatePayload.price_model = validated.priceModel;
    if (validated.servicesOffered !== undefined) updatePayload.services_offered = validated.servicesOffered;
    if (validated.about !== undefined) updatePayload.about = validated.about;
    if (validated.specialties !== undefined) updatePayload.specialties = validated.specialties;
    if (validated.availability !== undefined) updatePayload.availability = validated.availability;
    if (validated.avatarUrl !== undefined) updatePayload.avatar_url = validated.avatarUrl;
    if (validated.coverImageUrl !== undefined) updatePayload.cover_image_url = validated.coverImageUrl;

    // Link user_id if not linked yet
    if (!existingPro.user_id) {
      updatePayload.user_id = user.id;
    }

    const { data: updated, error: updateError } = await supabase
      .from('professionals')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      return errorResponse(updateError.message, 400);
    }

    return jsonResponse({
      message: 'Professional profile updated successfully',
      professional: updated,
    });
  } catch (err) {
    return handleApiError(err);
  }
}
