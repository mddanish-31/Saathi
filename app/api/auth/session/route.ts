import { NextRequest } from 'next/server';
import { createClient } from '../../../../src/lib/supabase/server';
import { jsonResponse, errorResponse, handleApiError } from '../../../../src/lib/api-response';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return errorResponse('Unauthenticated', 401);
    }

    return jsonResponse({
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email?.split('@')[0],
        phone: user.user_metadata?.phone,
        role: user.user_metadata?.role || 'customer',
        businessName: user.user_metadata?.business_name,
        avatarUrl: user.user_metadata?.avatar_url,
      },
    });
  } catch (err) {
    return handleApiError(err);
  }
}
