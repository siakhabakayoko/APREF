-- Promote siakha.bakayoko@gmail.com to admin
UPDATE profiles
SET role = 'admin'
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'siakha.bakayoko@gmail.com'
);

-- Verify the update
SELECT * FROM profiles 
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'siakha.bakayoko@gmail.com'
);
