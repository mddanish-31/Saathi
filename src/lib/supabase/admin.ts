import { createClient } from '@supabase/supabase-js';

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseSecret = (process.env.SUPABASE_SECRET_KEY || '').trim();

  if (!supabaseUrl || !supabaseSecret) {
    return null;
  }

  return createClient(supabaseUrl, supabaseSecret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
