-- COMPREHENSIVE FIX for Permissions (Avatars, Documents, Posts)
-- Uses explicit ::text casting to avoid "operator does not exist: uuid = text" errors

-- 1. RESET STORAGE POLICIES
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Access Avatars" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Auth Users Upload Avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Manage Own Objects" ON storage.objects;
DROP POLICY IF EXISTS "Documents are viewable by everyone (authenticated)." ON documents;

-- Ensure Buckets Exist
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true) ON CONFLICT (id) DO NOTHING;

-- Unified Public Read Access
CREATE POLICY "Public Read Access"
  ON storage.objects FOR SELECT
  USING ( bucket_id IN ('documents', 'avatars') );

-- Unified Authenticated Upload
CREATE POLICY "Authenticated Upload"
  ON storage.objects FOR INSERT
  WITH CHECK ( 
      bucket_id IN ('documents', 'avatars') 
      AND auth.role() = 'authenticated' 
  );

-- Manage Own Objects (Text Cast)
CREATE POLICY "Manage Own Objects"
  ON storage.objects FOR ALL
  USING ( 
      auth.uid()::text = owner_id::text 
  );


-- 2. FIX POSTS PERMISSIONS
DROP POLICY IF EXISTS "Authenticated users can create posts" ON posts;
DROP POLICY IF EXISTS "Users can update own posts" ON posts;
DROP POLICY IF EXISTS "Users can delete own posts" ON posts;

-- Allow INSERT
CREATE POLICY "Authenticated users can create posts" 
  ON posts FOR INSERT 
  WITH CHECK ( auth.role() = 'authenticated' );

-- Allow UPDATE (Text Cast)
CREATE POLICY "Users can update own posts" 
  ON posts FOR UPDATE 
  USING ( auth.uid()::text = author_id::text );

-- Allow DELETE (Text Cast)
CREATE POLICY "Users can delete own posts" 
  ON posts FOR DELETE 
  USING ( auth.uid()::text = author_id::text );


-- 3. ENSURE PROFILES ARE UPDATABLE
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON profiles;

-- (Text Cast)
CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING ( auth.uid()::text = id::text );
