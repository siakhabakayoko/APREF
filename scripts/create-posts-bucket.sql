-- Create posts bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('posts', 'posts', true)
on conflict (id) do nothing;

-- Policy: Anyone can view images in posts bucket
create policy "Public Access to Posts"
  on storage.objects for select
  using ( bucket_id = 'posts' );

-- Policy: Authenticated users can upload images to posts bucket
create policy "Authenticated users can upload to posts"
  on storage.objects for insert
  with check ( bucket_id = 'posts' and auth.role() = 'authenticated' );
