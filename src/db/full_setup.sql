-- ============================================================================
-- SAATHI MARKETPLACE: COMPLETE DATABASE SETUP SCRIPT
-- Run this in your Supabase SQL Editor or via drizzle-kit migrate
-- ============================================================================

-- 1. ENUMS
DO $$ BEGIN
  CREATE TYPE public.enquiry_status AS ENUM('pending', 'reviewed', 'responded', 'confirmed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.media_type AS ENUM('image', 'video', 'audio');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.user_role AS ENUM('customer', 'professional');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. TABLES
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY,
  email text NOT NULL,
  name text NOT NULL,
  phone text,
  role public.user_role DEFAULT 'customer'::public.user_role NOT NULL,
  business_name text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.categories (
  id text PRIMARY KEY NOT NULL,
  code text NOT NULL,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  hero_image text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.subcategories (
  id text PRIMARY KEY NOT NULL,
  category_slug text NOT NULL REFERENCES public.categories(slug) ON DELETE CASCADE,
  code text NOT NULL,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  badge text,
  is_active boolean DEFAULT true NOT NULL,
  image_url text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.services (
  id text PRIMARY KEY NOT NULL,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  short_description text NOT NULL,
  full_description text NOT NULL,
  category_slug text NOT NULL REFERENCES public.categories(slug) ON DELETE CASCADE,
  subcategory_slug text NOT NULL REFERENCES public.subcategories(slug) ON DELETE CASCADE,
  starting_price text NOT NULL,
  price_model text NOT NULL,
  features text[] DEFAULT ARRAY[]::text[] NOT NULL,
  typical_timeline text NOT NULL,
  ideal_for text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.professionals (
  id text PRIMARY KEY NOT NULL,
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  name text NOT NULL,
  brand_name text NOT NULL,
  tagline text DEFAULT '' NOT NULL,
  business_type text DEFAULT '' NOT NULL,
  avatar_url text,
  cover_image_url text,
  location text NOT NULL,
  cities_served text[] DEFAULT ARRAY[]::text[] NOT NULL,
  rating numeric(3, 2) DEFAULT '0' NOT NULL,
  review_count integer DEFAULT 0 NOT NULL,
  experience_years integer DEFAULT 0 NOT NULL,
  events_completed integer DEFAULT 0 NOT NULL,
  starting_price text DEFAULT '' NOT NULL,
  price_range text DEFAULT '' NOT NULL,
  price_model text DEFAULT '' NOT NULL,
  services_offered text[] DEFAULT ARRAY[]::text[] NOT NULL,
  about text DEFAULT '' NOT NULL,
  specialties text[] DEFAULT ARRAY[]::text[] NOT NULL,
  availability text DEFAULT 'Available' NOT NULL,
  verified boolean DEFAULT false NOT NULL,
  category text DEFAULT 'weddings-events' NOT NULL,
  performance_type text,
  genres text[],
  event_types text[],
  performance_duration text,
  team_size text,
  equipment_provided text[],
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id text PRIMARY KEY NOT NULL,
  professional_id text NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  title text NOT NULL,
  category text DEFAULT '' NOT NULL,
  location text DEFAULT '' NOT NULL,
  image_url text,
  description text DEFAULT '' NOT NULL,
  tags text[] DEFAULT ARRAY[]::text[] NOT NULL,
  type public.media_type DEFAULT 'image'::public.media_type NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.reviews (
  id text PRIMARY KEY NOT NULL,
  professional_id text NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  author_name text NOT NULL,
  rating numeric(3, 2) NOT NULL,
  date text NOT NULL,
  event_type text DEFAULT '' NOT NULL,
  location text DEFAULT '' NOT NULL,
  comment text NOT NULL,
  verified boolean DEFAULT false NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT rating_range CHECK (rating >= 1 AND rating <= 5)
);

CREATE TABLE IF NOT EXISTS public.enquiries (
  id text PRIMARY KEY NOT NULL,
  professional_id text NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  service_id text REFERENCES public.services(slug) ON DELETE SET NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  service_name text NOT NULL,
  event_date text NOT NULL,
  event_location text NOT NULL,
  budget_range text DEFAULT '' NOT NULL,
  message text NOT NULL,
  status public.enquiry_status DEFAULT 'pending'::public.enquiry_status NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.notifications (
  id text PRIMARY KEY NOT NULL,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  payload jsonb DEFAULT '{}'::jsonb NOT NULL,
  read boolean DEFAULT false NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- 3. INDEXES
CREATE INDEX IF NOT EXISTS idx_enquiries_professional_id ON public.enquiries (professional_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_customer_id ON public.enquiries (customer_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications (user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_professional_id ON public.portfolio_items (professional_id);
CREATE INDEX IF NOT EXISTS idx_professionals_category ON public.professionals (category);
CREATE INDEX IF NOT EXISTS idx_reviews_professional_id ON public.reviews (professional_id);

-- 4. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users policies
DROP POLICY IF EXISTS "Users can read own record" ON public.users;
CREATE POLICY "Users can read own record" ON public.users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own record" ON public.users;
CREATE POLICY "Users can update own record" ON public.users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Categories & Subcategories (Public read)
DROP POLICY IF EXISTS "Public read categories" ON public.categories;
CREATE POLICY "Public read categories" ON public.categories
  FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public read subcategories" ON public.subcategories;
CREATE POLICY "Public read subcategories" ON public.subcategories
  FOR SELECT TO anon, authenticated
  USING (true);

-- Services (Public read)
DROP POLICY IF EXISTS "Public read services" ON public.services;
CREATE POLICY "Public read services" ON public.services
  FOR SELECT TO anon, authenticated
  USING (true);

-- Professionals
DROP POLICY IF EXISTS "Public read professionals" ON public.professionals;
CREATE POLICY "Public read professionals" ON public.professionals
  FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Professionals can insert own profile" ON public.professionals;
CREATE POLICY "Professionals can insert own profile" ON public.professionals
  FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid() AND users.role = 'professional'
    )
  );

DROP POLICY IF EXISTS "Professionals can update own profile" ON public.professionals;
CREATE POLICY "Professionals can update own profile" ON public.professionals
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Portfolio Items
DROP POLICY IF EXISTS "Public read portfolio items" ON public.portfolio_items;
CREATE POLICY "Public read portfolio items" ON public.portfolio_items
  FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Professional can insert own portfolio" ON public.portfolio_items;
CREATE POLICY "Professional can insert own portfolio" ON public.portfolio_items
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.professionals
      WHERE professionals.id = portfolio_items.professional_id
        AND professionals.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Professional can update own portfolio" ON public.portfolio_items;
CREATE POLICY "Professional can update own portfolio" ON public.portfolio_items
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.professionals
      WHERE professionals.id = portfolio_items.professional_id
        AND professionals.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.professionals
      WHERE professionals.id = portfolio_items.professional_id
        AND professionals.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Professional can delete own portfolio" ON public.portfolio_items;
CREATE POLICY "Professional can delete own portfolio" ON public.portfolio_items
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.professionals
      WHERE professionals.id = portfolio_items.professional_id
        AND professionals.user_id = auth.uid()
    )
  );

-- Reviews
DROP POLICY IF EXISTS "Public read reviews" ON public.reviews;
CREATE POLICY "Public read reviews" ON public.reviews
  FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Confirmed enquiry customer review insert" ON public.reviews;
CREATE POLICY "Confirmed enquiry customer review insert" ON public.reviews
  FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = customer_id
    AND EXISTS (
      SELECT 1 FROM public.enquiries
      WHERE enquiries.professional_id = reviews.professional_id
        AND enquiries.customer_id = auth.uid()
        AND enquiries.status = 'confirmed'
    )
  );

-- Enquiries
DROP POLICY IF EXISTS "Parties can read enquiry" ON public.enquiries;
CREATE POLICY "Parties can read enquiry" ON public.enquiries
  FOR SELECT TO authenticated
  USING (
    auth.uid() = customer_id
    OR EXISTS (
      SELECT 1 FROM public.professionals
      WHERE professionals.id = enquiries.professional_id
        AND professionals.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Customers can insert enquiry" ON public.enquiries;
CREATE POLICY "Customers can insert enquiry" ON public.enquiries
  FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = customer_id
  );

-- Allow anonymous visitors (guests) to submit enquiries without login
DROP POLICY IF EXISTS "Anon can insert guest enquiry" ON public.enquiries;
CREATE POLICY "Anon can insert guest enquiry" ON public.enquiries
  FOR INSERT TO anon
  WITH CHECK (
    customer_id IS NULL
    AND customer_name IS NOT NULL
    AND customer_email IS NOT NULL
    AND customer_phone IS NOT NULL
    AND message IS NOT NULL
  );

DROP POLICY IF EXISTS "Owning professional can update enquiry" ON public.enquiries;
CREATE POLICY "Owning professional can update enquiry" ON public.enquiries
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.professionals
      WHERE professionals.id = enquiries.professional_id
        AND professionals.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.professionals
      WHERE professionals.id = enquiries.professional_id
        AND professionals.user_id = auth.uid()
    )
  );

-- Notifications
DROP POLICY IF EXISTS "Users can read own notifications" ON public.notifications;
CREATE POLICY "Users can read own notifications" ON public.notifications
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;
CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5. AUTH TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, name, phone, role, business_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'phone',
    COALESCE((new.raw_user_meta_data->>'role')::public.user_role, 'customer'::public.user_role),
    new.raw_user_meta_data->>'business_name',
    new.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = COALESCE(EXCLUDED.name, public.users.name),
    phone = COALESCE(EXCLUDED.phone, public.users.phone),
    role = COALESCE(EXCLUDED.role, public.users.role),
    business_name = COALESCE(EXCLUDED.business_name, public.users.business_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.users.avatar_url);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. NOTIFICATION TRIGGERS
CREATE OR REPLACE FUNCTION public.handle_enquiry_notifications()
RETURNS trigger AS $$
DECLARE
  v_pro_user_id uuid;
BEGIN
  IF TG_OP = 'INSERT' THEN
    SELECT user_id INTO v_pro_user_id
    FROM public.professionals
    WHERE id = NEW.professional_id;

    IF v_pro_user_id IS NOT NULL THEN
      INSERT INTO public.notifications (id, user_id, type, payload, read)
      VALUES (
        'notif_' || gen_random_uuid()::text,
        v_pro_user_id,
        'new_enquiry',
        jsonb_build_object(
          'enquiry_id', NEW.id,
          'customer_name', NEW.customer_name,
          'service_name', NEW.service_name,
          'event_date', NEW.event_date,
          'event_location', NEW.event_location
        ),
        false
      );
    END IF;
  ELSIF TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status THEN
    IF NEW.customer_id IS NOT NULL THEN
      INSERT INTO public.notifications (id, user_id, type, payload, read)
      VALUES (
        'notif_' || gen_random_uuid()::text,
        NEW.customer_id,
        'enquiry_status_updated',
        jsonb_build_object(
          'enquiry_id', NEW.id,
          'status', NEW.status,
          'service_name', NEW.service_name
        ),
        false
      );
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_enquiry_event ON public.enquiries;
CREATE TRIGGER on_enquiry_event
  AFTER INSERT OR UPDATE ON public.enquiries
  FOR EACH ROW EXECUTE FUNCTION public.handle_enquiry_notifications();

-- 6b. REVIEW STATS RECALCULATION TRIGGER
CREATE OR REPLACE FUNCTION public.handle_review_stats()
RETURNS trigger AS $$
DECLARE
  v_pro_id text;
  v_avg_rating numeric(3, 2);
  v_review_count integer;
BEGIN
  IF TG_OP = 'DELETE' THEN
    v_pro_id := OLD.professional_id;
  ELSE
    v_pro_id := NEW.professional_id;
  END IF;

  SELECT 
    COALESCE(ROUND(AVG(rating::numeric), 2), 0),
    COUNT(*)
  INTO v_avg_rating, v_review_count
  FROM public.reviews
  WHERE professional_id = v_pro_id;

  UPDATE public.professionals
  SET 
    rating = v_avg_rating,
    review_count = v_review_count
  WHERE id = v_pro_id;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_review_stats_change ON public.reviews;
CREATE TRIGGER on_review_stats_change
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.handle_review_stats();

-- 7. REALTIME PUBLICATION
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'enquiries'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.enquiries;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'notifications'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
  END IF;
END $$;

-- 8. STORAGE BUCKET & STORAGE POLICIES
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'storage') THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('portfolio', 'portfolio', true)
    ON CONFLICT (id) DO UPDATE SET public = true;

    DROP POLICY IF EXISTS "Public read portfolio storage" ON storage.objects;
    CREATE POLICY "Public read portfolio storage" ON storage.objects
      FOR SELECT TO anon, authenticated
      USING (bucket_id = 'portfolio');

    DROP POLICY IF EXISTS "Professional upload to own portfolio folder" ON storage.objects;
    CREATE POLICY "Professional upload to own portfolio folder" ON storage.objects
      FOR INSERT TO authenticated
      WITH CHECK (
        bucket_id = 'portfolio'
        AND EXISTS (
          SELECT 1 FROM public.professionals
          WHERE professionals.id = split_part(name, '/', 1)
            AND professionals.user_id = auth.uid()
        )
      );

    DROP POLICY IF EXISTS "Professional delete from own portfolio folder" ON storage.objects;
    CREATE POLICY "Professional delete from own portfolio folder" ON storage.objects
      FOR DELETE TO authenticated
      USING (
        bucket_id = 'portfolio'
        AND EXISTS (
          SELECT 1 FROM public.professionals
          WHERE professionals.id = split_part(name, '/', 1)
            AND professionals.user_id = auth.uid()
        )
      );
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Storage policy notice: %', SQLERRM;
END $$;

-- 9. RELOAD POSTGREST SCHEMA CACHE
NOTIFY pgrst, 'reload schema';

