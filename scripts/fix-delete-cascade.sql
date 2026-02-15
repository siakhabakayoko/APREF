-- Fix User Deletion by adding ON DELETE CASCADE

-- 1. Modify Profiles (references auth.users)
-- We need to find the constraint name or just alter it if we know it. 
-- Usually checking information_schema is best, but for a script to run in editor:

ALTER TABLE profiles
DROP CONSTRAINT IF EXISTS profiles_id_fkey, -- standard name
ADD CONSTRAINT profiles_id_fkey
    FOREIGN KEY (id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE;

-- 2. Modify Posts (references profiles)
ALTER TABLE posts
DROP CONSTRAINT IF EXISTS posts_author_id_fkey,
ADD CONSTRAINT posts_author_id_fkey
    FOREIGN KEY (author_id)
    REFERENCES profiles(id)
    ON DELETE CASCADE;

-- 3. Modify Events (references profiles)
ALTER TABLE events
DROP CONSTRAINT IF EXISTS events_organizer_id_fkey,
ADD CONSTRAINT events_organizer_id_fkey
    FOREIGN KEY (organizer_id)
    REFERENCES profiles(id)
    ON DELETE CASCADE;

-- 4. Post Likes and Comments were already created with ON DELETE CASCADE in 20260214_feed_interactions.sql
-- But let's double check/enforce just in case they were created differently before.

-- Check post_likes
ALTER TABLE post_likes
DROP CONSTRAINT IF EXISTS post_likes_user_id_fkey,
ADD CONSTRAINT post_likes_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES profiles(id)
    ON DELETE CASCADE;

ALTER TABLE post_likes
DROP CONSTRAINT IF EXISTS post_likes_post_id_fkey,
ADD CONSTRAINT post_likes_post_id_fkey
    FOREIGN KEY (post_id)
    REFERENCES posts(id)
    ON DELETE CASCADE;

-- Check post_comments
ALTER TABLE post_comments
DROP CONSTRAINT IF EXISTS post_comments_user_id_fkey,
ADD CONSTRAINT post_comments_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES profiles(id)
    ON DELETE CASCADE;

ALTER TABLE post_comments
DROP CONSTRAINT IF EXISTS post_comments_post_id_fkey,
ADD CONSTRAINT post_comments_post_id_fkey
    FOREIGN KEY (post_id)
    REFERENCES posts(id)
    ON DELETE CASCADE;
