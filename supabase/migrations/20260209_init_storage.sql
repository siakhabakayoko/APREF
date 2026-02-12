-- Create a table for document metadata
create table documents (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  type text not null, -- e.g. 'PDF', 'DOCX'
  size text not null, -- formatted size string e.g. '2.4 MB'
  url text not null,  -- public or signed url
  owner_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for documents table
alter table documents enable row level security;

create policy "Documents are viewable by everyone (authenticated)." on documents
  for select using (auth.role() = 'authenticated');

create policy "Users can insert their own documents." on documents
  for insert with check (auth.uid() = owner_id);

-- Storage bucket setup
-- Note: You might need to create the bucket 'documents' manually in the dashboard if this SQL fails due to permissions,
-- but typically we can insert into storage.buckets if we have admin rights.
-- For safety, we'll assume the bucket exists or is created via Dashboard, but we set up policies here.

-- Allow public access to 'documents' bucket
insert into storage.buckets (id, name, public) 
values ('documents', 'documents', true)
on conflict (id) do nothing;

create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'documents' );

create policy "Authenticated users can upload"
  on storage.objects for insert
  with check ( bucket_id = 'documents' and auth.role() = 'authenticated' );
