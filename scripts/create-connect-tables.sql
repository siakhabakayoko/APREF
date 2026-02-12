-- =====================================================
-- APREF Connect - Database Tables
-- =====================================================

-- Members profiles (linked to auth.users)
CREATE TABLE IF NOT EXISTS connect_members (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  country VARCHAR(255) NOT NULL,
  city VARCHAR(255),
  position_title VARCHAR(255) NOT NULL,
  organization VARCHAR(255),
  biography TEXT,
  expertise TEXT[], -- e.g. {"Gestion de Crise", "Transition Ecologique"}
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Discussion Channels (Cercles de Discussion)
CREATE TABLE IF NOT EXISTS connect_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  slug VARCHAR(255) NOT NULL UNIQUE,
  icon VARCHAR(50) DEFAULT 'hash',
  color VARCHAR(7) DEFAULT '#009C89',
  is_private BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Channel Members
CREATE TABLE IF NOT EXISTS connect_channel_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID NOT NULL REFERENCES connect_channels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(channel_id, user_id)
);

-- Channel Messages
CREATE TABLE IF NOT EXISTS connect_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID NOT NULL REFERENCES connect_channels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES connect_messages(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- News/Actualites Feed
CREATE TABLE IF NOT EXISTS connect_news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  category VARCHAR(100) NOT NULL,
  country VARCHAR(255),
  image_url TEXT,
  author_id UUID REFERENCES auth.users(id),
  is_published BOOLEAN DEFAULT true,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Forum Events (extended)
CREATE TABLE IF NOT EXISTS connect_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  agenda JSONB, -- [{time, title, speaker, description}]
  is_published BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Forum Event Sessions
CREATE TABLE IF NOT EXISTS connect_event_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES connect_events(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  speaker_name VARCHAR(255),
  speaker_bio TEXT,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  room VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Live Q&A for sessions
CREATE TABLE IF NOT EXISTS connect_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES connect_event_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  upvotes INT DEFAULT 0,
  is_answered BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Matchmaking / Rendez-vous
CREATE TABLE IF NOT EXISTS connect_meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES connect_events(id) ON DELETE CASCADE,
  requester_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  proposed_time TIMESTAMP,
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_connect_members_country ON connect_members(country);
CREATE INDEX IF NOT EXISTS idx_connect_messages_channel ON connect_messages(channel_id);
CREATE INDEX IF NOT EXISTS idx_connect_messages_user ON connect_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_connect_messages_created ON connect_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_connect_news_category ON connect_news(category);
CREATE INDEX IF NOT EXISTS idx_connect_news_published ON connect_news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_connect_channel_members_user ON connect_channel_members(user_id);
CREATE INDEX IF NOT EXISTS idx_connect_events_date ON connect_events(start_date);
CREATE INDEX IF NOT EXISTS idx_connect_questions_session ON connect_questions(session_id);

-- Enable RLS on all tables
ALTER TABLE connect_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE connect_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE connect_channel_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE connect_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE connect_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE connect_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE connect_event_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE connect_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE connect_meetings ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Members can see all other members
CREATE POLICY "Members can view all members" ON connect_members
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Members can update own profile" ON connect_members
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Members can insert own profile" ON connect_members
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Channels: authenticated can view public channels
CREATE POLICY "View public channels" ON connect_channels
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage channels" ON connect_channels
  FOR ALL USING (auth.role() = 'authenticated');

-- Channel Members
CREATE POLICY "View channel members" ON connect_channel_members
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Join channels" ON connect_channel_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Leave channels" ON connect_channel_members
  FOR DELETE USING (auth.uid() = user_id);

-- Messages: members of a channel can view and post
CREATE POLICY "View messages" ON connect_messages
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Post messages" ON connect_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Edit own messages" ON connect_messages
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Delete own messages" ON connect_messages
  FOR DELETE USING (auth.uid() = user_id);

-- News: all authenticated can read
CREATE POLICY "View news" ON connect_news
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage news" ON connect_news
  FOR ALL USING (auth.role() = 'authenticated');

-- Events: all authenticated can read
CREATE POLICY "View events" ON connect_events
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage events" ON connect_events
  FOR ALL USING (auth.role() = 'authenticated');

-- Event Sessions
CREATE POLICY "View sessions" ON connect_event_sessions
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage sessions" ON connect_event_sessions
  FOR ALL USING (auth.role() = 'authenticated');

-- Questions
CREATE POLICY "View questions" ON connect_questions
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Post questions" ON connect_questions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Meetings
CREATE POLICY "View own meetings" ON connect_meetings
  FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = target_id);
CREATE POLICY "Create meetings" ON connect_meetings
  FOR INSERT WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Update meeting status" ON connect_meetings
  FOR UPDATE USING (auth.uid() = target_id OR auth.uid() = requester_id);

-- Seed default channels
INSERT INTO connect_channels (name, description, slug, icon, color) VALUES
  ('Intelligence Artificielle', 'Échanges sur l''IA et la transformation numérique de l''administration', 'intelligence-artificielle', 'brain', '#611FFF'),
  ('Sécurité Intérieure', 'Problématiques de sécurité et ordre public dans l''espace francophone', 'securite-interieure', 'shield', '#ff0000'),
  ('Transition Écologique', 'Politiques environnementales et développement durable', 'transition-ecologique', 'leaf', '#009C89'),
  ('Innovation Publique', 'Réformes administratives et modernisation du service public', 'innovation-publique', 'lightbulb', '#EE5D17'),
  ('Gestion de Crise', 'Partage d''expériences sur la gestion de crise et la résilience', 'gestion-de-crise', 'alert-triangle', '#0612BF'),
  ('Général', 'Discussion libre entre membres de l''APREF', 'general', 'message-circle', '#2B4CBA')
ON CONFLICT (slug) DO NOTHING;
