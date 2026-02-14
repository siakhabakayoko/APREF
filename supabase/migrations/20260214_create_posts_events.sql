-- Create Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  is_virtual BOOLEAN DEFAULT FALSE,
  meeting_link TEXT,
  organizer_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  image_url TEXT,
  is_urgent BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policies for Events
CREATE POLICY "Events are viewable by everyone" ON events FOR SELECT USING (true);
CREATE POLICY "Admins can manage events" ON events USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Policies for Posts
CREATE POLICY "Posts are viewable by everyone" ON posts FOR SELECT USING (true);
CREATE POLICY "Admins can manage posts" ON posts USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Seed Data (Insert only if table is empty)
INSERT INTO events (title, description, start_date, end_date, location, is_virtual)
SELECT 'Forum de Dakar 2025', 'Le rendez-vous annuel des hauts-fonctionnaires.', '2025-11-15 09:00:00+00', '2025-11-17 18:00:00+00', 'Centre de Conférences de Diamniadio', FALSE
WHERE NOT EXISTS (SELECT 1 FROM events);

INSERT INTO events (title, description, start_date, end_date, location, is_virtual)
SELECT 'Webinaire : IA et Service Public', 'Impact de l''IA sur les services.', '2025-06-10 14:00:00+00', '2025-06-10 15:30:00+00', 'Zoom', TRUE
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title = 'Webinaire : IA et Service Public');

-- Seed Posts (Link to a profile if one exists, otherwise leave author_id null if allowed or skip)
-- Note: author_id is nullable in creation above implicitly? No, I should make it nullable or handle it.
-- Let's make it nullable in the CREATE statement implicitly (default).
INSERT INTO posts (content, is_urgent, tags, likes_count, comments_count)
SELECT 'Lancement officiel de la plateforme APREF Connect !', FALSE, ARRAY['Annonce', 'Innovation'], 45, 12
WHERE NOT EXISTS (SELECT 1 FROM posts);

INSERT INTO posts (content, is_urgent, tags, likes_count, comments_count)
SELECT '🚨 ALERTE MÉTÉO : Vigilance rouge orages.', TRUE, ARRAY['Sécurité', 'Urgence'], 120, 5
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE is_urgent = TRUE);

-- Attempt to link seed posts to the first admin user found
DO $$
DECLARE
  admin_id UUID;
BEGIN
  SELECT id INTO admin_id FROM profiles WHERE role = 'admin' LIMIT 1;
  IF admin_id IS NOT NULL THEN
    UPDATE posts SET author_id = admin_id WHERE author_id IS NULL;
    UPDATE events SET organizer_id = admin_id WHERE organizer_id IS NULL;
  END IF;
END $$;
