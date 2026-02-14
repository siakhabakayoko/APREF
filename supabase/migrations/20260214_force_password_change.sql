ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS must_change_password BOOLEAN DEFAULT FALSE;

-- Ensure RLS allows users to update their own profile (usually already covered, but checking)
-- If you need a specific policy for this column update, you might add it here, 
-- but usually the "Users can update own profile" policy covers it.
