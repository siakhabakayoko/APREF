-- Ensure tables exist
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    read BOOLEAN DEFAULT false
);

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

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_requests ENABLE ROW LEVEL SECURITY;

-- Grantly permissions explicitly (sometimes needed)
GRANT ALL ON contact_messages TO anon, authenticated, service_role;
GRANT ALL ON membership_requests TO anon, authenticated, service_role;

-- Fix Policies
DROP POLICY IF EXISTS "Public can send contact messages" ON contact_messages;
CREATE POLICY "Public can send contact messages" ON contact_messages FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can request membership" ON membership_requests;
CREATE POLICY "Public can request membership" ON membership_requests FOR INSERT WITH CHECK (true);
