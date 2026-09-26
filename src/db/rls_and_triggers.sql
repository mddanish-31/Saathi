-- ============================================================================
-- SAATHI MARKETPLACE: ROW LEVEL SECURITY & TRIGGERS
-- ============================================================================

-- 1. ENABLE ROW LEVEL SECURITY ON ALL TABLES
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 2. USERS TABLE POLICIES
-- ============================================================================
DROP POLICY IF EXISTS "Users can read own record" ON public.users;
CREATE POLICY "Users can read own record" ON public.users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own record" ON public.users;
CREATE POLICY "Users can update own record" ON public.users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================================================
-- 3. CATEGORIES & SUBCATEGORIES POLICIES (Public read)
-- ============================================================================
DROP POLICY IF EXISTS "Public read categories" ON public.categories;
CREATE POLICY "Public read categories" ON public.categories
  FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public read subcategories" ON public.subcategories;
CREATE POLICY "Public read subcategories" ON public.subcategories
  FOR SELECT TO anon, authenticated
  USING (true);

-- ============================================================================
-- 4. SERVICES POLICIES (Public read)
-- ============================================================================
DROP POLICY IF EXISTS "Public read services" ON public.services;
CREATE POLICY "Public read services" ON public.services
  FOR SELECT TO anon, authenticated
  USING (true);

-- ============================================================================
-- 5. PROFESSIONALS POLICIES
-- ============================================================================
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

-- ============================================================================
-- 6. PORTFOLIO ITEMS POLICIES
-- ============================================================================
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

-- ============================================================================
-- 7. REVIEWS POLICIES
-- ============================================================================
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

-- ============================================================================
-- 8. ENQUIRIES POLICIES
-- ============================================================================
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

-- ============================================================================
-- 9. NOTIFICATIONS POLICIES
-- ============================================================================
DROP POLICY IF EXISTS "Users can read own notifications" ON public.notifications;
CREATE POLICY "Users can read own notifications" ON public.notifications
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;
CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- 10. AUTH TRIGGER (Sync auth.users -> public.users)
-- ============================================================================
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

-- ============================================================================
-- 11. ENQUIRY NOTIFICATION TRIGGERS
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_enquiry_notifications()
RETURNS trigger AS $$
DECLARE
  v_pro_user_id uuid;
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Find professional user_id
    SELECT user_id INTO v_pro_user_id
    FROM public.professionals
    WHERE id = NEW.professional_id;

    IF v_pro_user_id IS NOT NULL THEN
      INSERT INTO public.notifications (id, user_id, type, payload, read)
      VALUES (
        'notif_' || gen_random_uuid(),
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
        'notif_' || gen_random_uuid(),
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

-- ============================================================================
-- 12. REALTIME PUBLICATION SETUP
-- ============================================================================
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
