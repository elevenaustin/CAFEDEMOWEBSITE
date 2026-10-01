CREATE TABLE public.reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  guests int NOT NULL,
  reservation_date date NOT NULL,
  reservation_time text NOT NULL,
  special_requests text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.reservations TO anon, authenticated;
GRANT ALL ON public.reservations TO service_role;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can request a reservation" ON public.reservations FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'pending' AND guests BETWEEN 1 AND 20 AND length(full_name) <= 120 AND length(email) <= 255 AND coalesce(length(special_requests),0) <= 1000);

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send a message" ON public.contact_messages FOR INSERT TO anon, authenticated
  WITH CHECK (length(name) <= 120 AND length(email) <= 255 AND length(message) <= 2000);