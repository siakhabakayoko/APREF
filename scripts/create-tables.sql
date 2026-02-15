-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create membership_requests table
CREATE TABLE IF NOT EXISTS membership_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL,
  current_position TEXT NOT NULL,
  motivation TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  read BOOLEAN DEFAULT false
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  country VARCHAR(255),
  event_name VARCHAR(255) NOT NULL,
  organization VARCHAR(255),
  dietary_restrictions VARCHAR(255),
  status VARCHAR(50) DEFAULT 'registered',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_membership_email ON membership_requests(email);
CREATE INDEX idx_membership_status ON membership_requests(status);
CREATE INDEX idx_contact_email ON contact_messages(email);
CREATE INDEX idx_contact_status ON contact_messages(status);
CREATE INDEX idx_event_email ON event_registrations(email);
CREATE INDEX idx_event_name ON event_registrations(event_name);

-- Enable RLS (Row Level Security)
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for forms
CREATE POLICY "Allow public inserts" ON newsletter_subscriptions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public inserts" ON membership_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public inserts" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public inserts" ON event_registrations
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users (admin) to view all data
CREATE POLICY "Allow admins to view" ON newsletter_subscriptions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admins to view" ON membership_requests
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admins to view" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admins to view" ON event_registrations
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow admins to update status
CREATE POLICY "Allow admins to update" ON membership_requests
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admins to update" ON contact_messages
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admins to update" ON event_registrations
  FOR UPDATE USING (auth.role() = 'authenticated');
