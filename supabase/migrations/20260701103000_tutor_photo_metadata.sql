create table if not exists public.tutor_photos (
  id uuid primary key default extensions.uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  storage_bucket text not null default 'tutor-photos',
  storage_path text not null,
  public_url text not null,
  mime_type text not null,
  file_size_bytes integer not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint tutor_photos_user_id_key unique (user_id),
  constraint tutor_photos_storage_path_key unique (storage_path),
  constraint tutor_photos_bucket_check check (storage_bucket = 'tutor-photos'),
  constraint tutor_photos_mime_type_check check (mime_type in ('image/jpeg', 'image/png')),
  constraint tutor_photos_file_size_check check (file_size_bytes > 0 and file_size_bytes <= 5242880)
);

alter table public.tutor_photos enable row level security;

drop policy if exists "Tutors can read own photo metadata" on public.tutor_photos;
create policy "Tutors can read own photo metadata"
on public.tutor_photos
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Tutors can insert own photo metadata" on public.tutor_photos;
create policy "Tutors can insert own photo metadata"
on public.tutor_photos
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Tutors can update own photo metadata" on public.tutor_photos;
create policy "Tutors can update own photo metadata"
on public.tutor_photos
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Tutors can delete own photo metadata" on public.tutor_photos;
create policy "Tutors can delete own photo metadata"
on public.tutor_photos
for delete
to authenticated
using ((select auth.uid()) = user_id);
