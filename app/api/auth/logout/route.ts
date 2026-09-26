import { NextRequest } from 'next/server';
import { createClient } from '../../../../src/lib/supabase/server';
import { jsonResponse, handleApiError } from '../../../../src/lib/api-response';

export async function POST(_req: NextRequest) {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
    return jsonResponse({ message: 'Logged out successfully' });
  } catch (err) {
    return handleApiError(err);
  }
}
