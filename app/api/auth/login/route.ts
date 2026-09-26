import { NextRequest } from 'next/server';
import { createClient } from '../../../../src/lib/supabase/server';
import { loginSchema } from '../../../../src/lib/validators';
import { jsonResponse, errorResponse, handleApiError } from '../../../../src/lib/api-response';
import { checkRateLimit, getClientIp } from '../../../../src/lib/rate-limiter';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`login_${ip}`, 15, 15 * 60 * 1000);
    if (!rateCheck.success) {
      return errorResponse(`Too many login attempts. Please wait ${rateCheck.reset}s.`, 429);
    }

    const body = await req.json();
    const validated = loginSchema.parse(body);

    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: validated.email,
      password: validated.password,
    });

    if (error) {
      return errorResponse(error.message, 401);
    }

    return jsonResponse({
      message: 'Login successful',
      user: data.user,
      session: data.session,
    });
  } catch (err) {
    return handleApiError(err);
  }
}
