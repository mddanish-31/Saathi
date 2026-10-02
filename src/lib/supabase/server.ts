import { createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

/**
 * Standard server client. Uses cookies from the active Next.js request,
 * respecting Supabase Row Level Security (RLS) policies for the authenticated user.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) are missing.');
  }

  const cookieStore = cookies();

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Can be ignored if middleware is refreshing user sessions.
          }
        },
      },
    }
  );
}

/**
 * Privileged Service Role / Admin client.
 * Bypasses Row Level Security (RLS) policies.
 * ONLY use for admin operations, background seed scripts, or webhooks that require elevated privileges.
 * NEVER expose this or invoke it with untrusted client-supplied permissions.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = (process.env.SUPABASE_SECRET_KEY || '').trim();

  if (!supabaseUrl || !secretKey) {
    throw new Error('SUPABASE_SECRET_KEY or NEXT_PUBLIC_SUPABASE_URL is missing from environment variables.');
  }

  return createSupabaseClient(supabaseUrl, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
