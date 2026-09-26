import { NextRequest } from 'next/server';
import { createClient } from '../../../../../src/lib/supabase/server';
import { createReviewSchema } from '../../../../../src/lib/validators';
import { sanitizeText } from '../../../../../src/lib/sanitize';
import { jsonResponse, errorResponse, handleApiError } from '../../../../../src/lib/api-response';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: professionalId } = params;
    const supabase = createClient();

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('professional_id', professionalId)
      .order('created_at', { ascending: false });

    if (error) {
      return errorResponse(error.message, 400);
    }

    const reviews = (data || []).map((r) => ({
      id: r.id,
      authorName: r.author_name,
      rating: parseFloat(r.rating) || 0,
      date: r.date,
      eventType: r.event_type,
      location: r.location,
      comment: r.comment,
      verified: r.verified,
    }));

    return jsonResponse(reviews);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: professionalId } = params;
    const supabase = createClient();

    // 1. Authenticate user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return errorResponse('Authentication required to submit a review', 401);
    }

    // 2. Validate review body
    const body = await req.json();
    const validated = createReviewSchema.parse(body);

    // 3. Review Eligibility Check: Must have a confirmed enquiry with this professional
    const { data: confirmedEnquiry, error: enquiryError } = await supabase
      .from('enquiries')
      .select('id')
      .eq('professional_id', professionalId)
      .eq('customer_id', user.id)
      .eq('status', 'confirmed')
      .limit(1)
      .maybeSingle();

    if (enquiryError) {
      return errorResponse(enquiryError.message, 400);
    }

    if (!confirmedEnquiry) {
      return errorResponse(
        'Eligibility required: You can only review professionals with whom you have a confirmed event booking.',
        403
      );
    }

    // 4. Sanitize text
    const sanitizedComment = sanitizeText(validated.comment);
    const sanitizedAuthor = sanitizeText(validated.authorName);
    const sanitizedLocation = sanitizeText(validated.location);
    const sanitizedEventType = sanitizeText(validated.eventType);

    const reviewId = `rev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    const { data: created, error: insertError } = await supabase
      .from('reviews')
      .insert({
        id: reviewId,
        professional_id: professionalId,
        customer_id: user.id,
        author_name: sanitizedAuthor,
        rating: validated.rating.toString(),
        date: formattedDate,
        event_type: sanitizedEventType,
        location: sanitizedLocation,
        comment: sanitizedComment,
        verified: true,
      })
      .select()
      .single();

    if (insertError) {
      return errorResponse(insertError.message, 400);
    }

    return jsonResponse(
      {
        message: 'Review posted successfully',
        review: created,
      },
      201
    );
  } catch (err) {
    return handleApiError(err);
  }
}
