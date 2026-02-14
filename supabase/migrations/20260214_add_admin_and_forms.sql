-- Add role column to profiles if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'role') THEN
        ALTER TABLE profiles ADD COLUMN role text DEFAULT 'member' CHECK (role IN ('member', 'admin'));
    END IF;
END $$;

-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOTE NULL UNIQUE,
    full_name TEXT,
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

-- Create membership_requests table
CREATE TABLE IF NOT EXISTS membership_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL, -- Allow multiple requests? Probably unique is better for pending. Let's keep it simple for now and handle uniqueness in app logic or unique index if needed.
    country TEXT NOT NULL,
    current_position TEXT NOT NULL,
    motivation TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    event_name TEXT NOT NULL,
    country TEXT,
    organization TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(email, event_name)
);

-- Enable RLS
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Policies for newsletter_subscriptions
CREATE POLICY "Public can subscribe to newsletter" ON newsletter_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view newsletter subscriptions" ON newsletter_subscriptions FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);
CREATE POLICY "Admins can delete newsletter subscriptions" ON newsletter_subscriptions FOR DELETE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Policies for contact_messages
CREATE POLICY "Public can send contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view contact messages" ON contact_messages FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);
CREATE POLICY "Admins can update contact messages" ON contact_messages FOR UPDATE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);
CREATE POLICY "Admins can delete contact messages" ON contact_messages FOR DELETE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Policies for membership_requests
CREATE POLICY "Public can request membership" ON membership_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view membership requests" ON membership_requests FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);
CREATE POLICY "Admins can update membership requests" ON membership_requests FOR UPDATE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);
CREATE POLICY "Admins can delete membership requests" ON membership_requests FOR DELETE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Policies for event_registrations
CREATE POLICY "Public can register for events" ON event_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view event registrations" ON event_registrations FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);
CREATE POLICY "Admins can delete event registrations" ON event_registrations FOR DELETE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);
