-- ============================================================================
-- SAATHI FEEDBACK & REPORT TABLE + RLS POLICIES
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.feedback (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text NOT NULL,
  message text NOT NULL,
  category text DEFAULT 'general',
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Index for temporal queries and admin auditing
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON public.feedback (created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- 1. Public / Anonymous INSERT Policy:
-- Anyone (guest or authenticated) can submit feedback/bug reports.
DROP POLICY IF EXISTS "Anyone can insert feedback" ON public.feedback;
CREATE POLICY "Anyone can insert feedback" ON public.feedback
  FOR INSERT
  WITH CHECK (true);

-- 2. Strict SELECT Isolation:
-- Public reads are explicitly blocked. Only service_role or admin contexts can read feedback.
DROP POLICY IF EXISTS "Deny public select on feedback" ON public.feedback;
-- By enabling RLS and not defining a public SELECT policy, all anon and authenticated
-- clients receive 0 rows on SELECT, maintaining strict privacy of submissions.
