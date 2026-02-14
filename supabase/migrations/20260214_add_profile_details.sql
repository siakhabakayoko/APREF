-- Add missing columns to profiles table

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS region TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS expertise TEXT[]; -- Array of strings

-- Update RLS policies to allow users to update these fields
-- (Existing policy "Users can update own profile." should cover this if it uses USING(auth.uid() = id) with correct permissions)

-- Example: Set default values for existing users if needed (optional)
-- UPDATE profiles SET country = 'Sénégal' WHERE country IS NULL;
