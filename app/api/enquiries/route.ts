import { NextRequest } from 'next/server';
import { createClient } from '../../../src/lib/supabase/server';
import { createEnquirySchema } from '../../../src/lib/validators';
import { sanitizeText } from '../../../src/lib/sanitize';
import { checkRateLimit, getClientIp } from '../../../src/lib/rate-limiter';
import { jsonResponse, errorResponse, handleApiError } from '../../../src/lib/api-response';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`enquiry_${ip}`, 15, 15 * 60 * 1000);
    if (!rateCheck.success) {
      return errorResponse(`Too many enquiries submitted. Please wait ${rateCheck.reset}s.`, 429);
    }

    const body = await req.json();
    const validated = createEnquirySchema.parse(body);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Sanitize user inputs
    const sanitizedMessage = sanitizeText(validated.message);
    const sanitizedCustomerName = sanitizeText(validated.customerName);
    const sanitizedLocation = sanitizeText(validated.eventLocation);

    const enquiryId = `enq_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;

    const { data: created, error } = await supabase
      .from('enquiries')
      .insert({
        id: enquiryId,
        professional_id: validated.professionalId,
        customer_id: user?.id || null,
        service_id: validated.serviceId || null,
        customer_name: sanitizedCustomerName,
        customer_email: validated.customerEmail,
        customer_phone: validated.customerPhone,
        service_name: validated.serviceName,
        event_date: validated.eventDate,
        event_location: sanitizedLocation,
        budget_range: validated.budgetRange || '',
        message: sanitizedMessage,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      return errorResponse(error.message, 400);
    }

    return jsonResponse(
      {
        message: 'Enquiry submitted successfully',
        enquiry: {
          id: created.id,
          professionalId: created.professional_id,
          customerId: created.customer_id,
          customerName: created.customer_name,
          customerEmail: created.customer_email,
          customerPhone: created.customer_phone,
          serviceId: created.service_id,
          serviceName: created.service_name,
          eventDate: created.event_date,
          eventLocation: created.event_location,
          budgetRange: created.budget_range,
          message: created.message,
          status: created.status,
          createdAt: created.created_at,
        },
      },
      201
    );
  } catch (err) {
    return handleApiError(err);
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return errorResponse('Authentication required to view enquiries', 401);
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const offset = (page - 1) * limit;

    // RLS policy on enquiries ensures users can only read their own records
    const { data, count, error } = await supabase
      .from('enquiries')
      .select('*, professionals(name, brand_name, avatar_url)', { count: 'exact' })
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) {
      return errorResponse(error.message, 400);
    }

    const enquiries = (data || []).map((e) => ({
      id: e.id,
      professionalId: e.professional_id,
      professionalName: e.professionals?.name || '',
      professionalBrand: e.professionals?.brand_name || '',
      professionalAvatar: e.professionals?.avatar_url || undefined,
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
