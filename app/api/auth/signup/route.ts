import { NextRequest } from 'next/server';
import { createClient } from '../../../../src/lib/supabase/server';
import { signupSchema } from '../../../../src/lib/validators';
import { jsonResponse, errorResponse, handleApiError } from '../../../../src/lib/api-response';
import { checkRateLimit, getClientIp } from '../../../../src/lib/rate-limiter';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`signup_${ip}`, 10, 15 * 60 * 1000);
    if (!rateCheck.success) {
      return errorResponse(`Too many signup attempts. Try again in ${rateCheck.reset}s.`, 429);
    }

    const body = await req.json();
    const validated = signupSchema.parse(body);

    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email: validated.email,
      password: validated.password,
      options: {
        data: {
          name: validated.name,
          phone: validated.phone || null,
          role: validated.role,
          business_name: validated.businessName || null,
        },
      },
    });

    if (error) {
      return errorResponse(error.message, 400);
    }

    // Auto-confirm user in dev/test environment if admin client is available
    if (data.user?.id) {
      const admin = (await import('../../../../src/lib/supabase/admin')).createAdminClient();
      if (admin) {
        await admin.auth.admin.updateUserById(data.user.id, { email_confirm: true });
      }
    }

    return jsonResponse(
      {
        message: 'Signup successful',
        user: data.user,
        session: data.session,
      },
      201
    );
  } catch (err) {
    return handleApiError(err);
  }
}
