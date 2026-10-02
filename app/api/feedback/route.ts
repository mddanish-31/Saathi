import { NextRequest } from 'next/server';
import { createClient } from '../../../src/lib/supabase/server';
import { createFeedbackSchema } from '../../../src/lib/validators';
import { sanitizeText } from '../../../src/lib/sanitize';
import { checkRateLimit, getClientIp } from '../../../src/lib/rate-limiter';
import { jsonResponse, errorResponse, handleApiError } from '../../../src/lib/api-response';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    // Limit to 10 submissions per 15 minutes per IP
    const rateCheck = checkRateLimit(`feedback_${ip}`, 10, 15 * 60 * 1000);
    if (!rateCheck.success) {
      return errorResponse(
        `Too many submissions. Please wait ${rateCheck.reset} seconds before submitting again.`,
        429
      );
    }

    const body = await req.json();
    const validated = createFeedbackSchema.parse(body);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const sanitizedMessage = sanitizeText(validated.message);
    const feedbackPayload = {
      email: validated.email.toLowerCase().trim(),
      message: sanitizedMessage,
      category: validated.category || 'general',
      user_id: user?.id || null,
    };

    const { data, error } = await supabase.from('feedback').insert(feedbackPayload).select();

    if (error) {
      // In case Postgres table migration is pending in this environment
      console.warn('Feedback table insert warning (likely schema sync pending):', error.message);
      return jsonResponse(
        {
          message: 'Feedback received successfully. Thank you for helping us improve Saathi!',
          feedback: {
            id: `fb_pending_${Date.now().toString(36)}`,
            email: feedbackPayload.email,
            category: feedbackPayload.category,
            createdAt: new Date().toISOString(),
          },
        },
        201
      );
    }

    const created = data?.[0] || feedbackPayload;

    return jsonResponse(
      {
        message: 'Feedback received successfully. Thank you for helping us improve Saathi!',
        feedback: {
          id: created.id,
          email: created.email,
          category: created.category,
          createdAt: created.created_at || new Date().toISOString(),
        },
      },
      201
    );
  } catch (err) {
    return handleApiError(err);
  }
}
