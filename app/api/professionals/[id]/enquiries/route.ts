import { NextRequest } from 'next/server';
import { createClient } from '../../../../../src/lib/supabase/server';
import { jsonResponse, errorResponse, handleApiError } from '../../../../../src/lib/api-response';

export async function GET(
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
      return errorResponse('Authentication required', 401);
    }

    // 2. Ownership verification: ensure requesting user owns this professional profile
    const { data: pro, error: proError } = await supabase
      .from('professionals')
      .select('id, user_id')
      .eq('id', professionalId)
      .single();

    if (proError || !pro) {
      return errorResponse('Professional not found', 404);
    }

    if (pro.user_id && pro.user_id !== user.id) {
      return errorResponse('Forbidden: You can only view enquiries for your own business', 403);
    }

    // 3. Pagination parameters
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const offset = (page - 1) * limit;

    const { data, count, error } = await supabase
      .from('enquiries')
      .select('*', { count: 'exact' })
      .eq('professional_id', professionalId)
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) {
      return errorResponse(error.message, 400);
    }

    const enquiries = (data || []).map((e) => ({
      id: e.id,
      professionalId: e.professional_id,
      customerId: e.customer_id,
      customerName: e.customer_name,
      customerEmail: e.customer_email,
      customerPhone: e.customer_phone,
      serviceId: e.service_id,
      serviceName: e.service_name,
      eventDate: e.event_date,
      eventLocation: e.event_location,
      budgetRange: e.budget_range,
      message: e.message,
      status: e.status,
      createdAt: e.created_at,
    }));

    const total = count || enquiries.length;

    return jsonResponse({
      enquiries,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    return handleApiError(err);
  }
}
