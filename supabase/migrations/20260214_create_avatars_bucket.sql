-- Create 'avatars' bucket
insert into storage.buckets (id, name, public) 
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Pollcies for 'avatars' bucket
create policy "Public Access Avatars"
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Authenticated users can upload avatars"
  on storage.objects for insert
  with check ( bucket_id = 'avatars' and auth.role() = 'authenticated' );

-- Fix: Cast owner_id to uuid for comparison with auth.uid()
create policy "Users can update their own avatars"
  on storage.objects for update
  using ( bucket_id = 'avatars' and auth.uid() = owner_id::uuid );

create policy "Users can delete their own avatars"
  on storage.objects for delete
  using ( bucket_id = 'avatars' and auth.uid() = owner_id::uuid );
