import { NextRequest } from 'next/server';
import { createClient } from '../../../../../../src/lib/supabase/server';
import { jsonResponse, errorResponse, handleApiError } from '../../../../../../src/lib/api-response';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string; itemId: string } }
) {
  try {
    const { id: professionalId, itemId } = params;
    const supabase = createClient();

    // 1. Authenticate user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return errorResponse('Authentication required', 401);
    }

    // 2. Ownership check
    const { data: pro, error: proError } = await supabase
      .from('professionals')
      .select('id, user_id')
      .eq('id', professionalId)
      .single();

    if (proError || !pro) {
      return errorResponse('Professional not found', 404);
    }

    if (pro.user_id && pro.user_id !== user.id) {
      return errorResponse('Forbidden: You can only delete from your own portfolio', 403);
    }

    // 3. Delete portfolio item
    const { error: deleteError } = await supabase
      .from('portfolio_items')
      .delete()
      .eq('id', itemId)
      .eq('professional_id', professionalId);

    if (deleteError) {
      return errorResponse(deleteError.message, 400);
    }

    return jsonResponse({ message: 'Portfolio item deleted successfully' });
  } catch (err) {
    return handleApiError(err);
  }
}
