-- Tutor profile photos are public assets, but writes are scoped to the
-- authenticated user's own folder: tutor-photos/{user_id}/...

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'tutor-photos',
  'tutor-photos',
  true,
  5242880,
  array['image/jpeg', 'image/png']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Tutor photos are publicly readable" on storage.objects;
create policy "Tutor photos are publicly readable"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'tutor-photos');

drop policy if exists "Tutors can upload own profile photos" on storage.objects;
create policy "Tutors can upload own profile photos"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'tutor-photos'
  and (select auth.uid())::text = (storage.foldername(name))[1]
);

drop policy if exists "Tutors can update own profile photos" on storage.objects;
create policy "Tutors can update own profile photos"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'tutor-photos'
  and (select auth.uid())::text = (storage.foldername(name))[1]
)
with check (
  bucket_id = 'tutor-photos'
  and (select auth.uid())::text = (storage.foldername(name))[1]
);

drop policy if exists "Tutors can delete own profile photos" on storage.objects;
create policy "Tutors can delete own profile photos"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'tutor-photos'
  and (select auth.uid())::text = (storage.foldername(name))[1]
);
