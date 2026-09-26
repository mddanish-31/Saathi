import { NextRequest } from 'next/server';
import { createClient } from '../../../../src/lib/supabase/server';
import { updateEnquiryStatusSchema } from '../../../../src/lib/validators';
import { jsonResponse, errorResponse, handleApiError } from '../../../../src/lib/api-response';

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

    // 2. Validate status payload
    const body = await req.json();
    const validated = updateEnquiryStatusSchema.parse(body);

    // 3. Verify enquiry exists and that current user owns the professional profile
    const { data: existingEnq, error: fetchError } = await supabase
      .from('enquiries')
      .select('id, professional_id, professionals(user_id)')
      .eq('id', id)
      .single();

    if (fetchError || !existingEnq) {
      return errorResponse('Enquiry not found', 404);
    }

    // Type casting for joined relation
    const proUserId = (existingEnq.professionals as unknown as { user_id?: string })?.user_id;

    if (proUserId && proUserId !== user.id) {
      return errorResponse('Forbidden: Only the assigned professional can update enquiry status', 403);
    }

    // 4. Update enquiry status
    const { data: updated, error: updateError } = await supabase
      .from('enquiries')
      .update({ status: validated.status })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      return errorResponse(updateError.message, 400);
    }

    return jsonResponse({
      message: 'Enquiry status updated successfully',
      enquiry: updated,
    });
  } catch (err) {
    return handleApiError(err);
  }
}
