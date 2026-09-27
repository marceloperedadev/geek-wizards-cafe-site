insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'catalog-images',
  'catalog-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']::text[]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read catalog images" on storage.objects;
create policy "Public can read catalog images"
on storage.objects for select
to public
using (bucket_id = 'catalog-images');

drop policy if exists "Admins can upload catalog images" on storage.objects;
create policy "Admins can upload catalog images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'catalog-images'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);
