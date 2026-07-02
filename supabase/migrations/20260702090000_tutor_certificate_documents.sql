-- Tutor certificate uploads are private verification documents.
-- Objects live under tutor-certificates/{user_id}/...

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'tutor-certificates',
  'tutor-certificates',
  false,
  20971520,
  array['image/jpeg', 'image/png']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create table if not exists public.tutor_certificates (
  id uuid primary key default extensions.uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  tutor_id uuid not null references public.tutor_profiles(id) on delete cascade,
  subject text,
  certificate_name text not null,
  description text,
  issued_by text,
  start_year integer,
  end_year integer,
  is_current boolean not null default false,
  not_listed boolean not null default false,
  storage_bucket text not null default 'tutor-certificates',
  storage_path text not null,
  original_file_name text not null,
  mime_type text not null,
  file_size_bytes integer not null,
  verification_status text not null default 'pending',
  reviewer_notes text,
  verified_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint tutor_certificates_storage_path_key unique (storage_path),
  constraint tutor_certificates_bucket_check check (storage_bucket = 'tutor-certificates'),
  constraint tutor_certificates_mime_type_check check (mime_type in ('image/jpeg', 'image/png')),
  constraint tutor_certificates_file_size_check check (file_size_bytes > 0 and file_size_bytes <= 20971520),
  constraint tutor_certificates_year_check check (
    (start_year is null or (start_year between 1920 and 2100))
    and (end_year is null or (end_year between 1920 and 2100))
    and (start_year is null or end_year is null or start_year <= end_year)
  ),
  constraint tutor_certificates_verification_status_check check (verification_status in ('pending', 'verified', 'rejected'))
);

create index if not exists idx_tutor_certificates_user_id on public.tutor_certificates(user_id);
create index if not exists idx_tutor_certificates_tutor_id on public.tutor_certificates(tutor_id);
create index if not exists idx_tutor_certificates_status on public.tutor_certificates(verification_status);

alter table public.tutor_certificates enable row level security;

grant select, insert, update, delete on public.tutor_certificates to authenticated;

drop policy if exists "Tutors can read own certificates" on public.tutor_certificates;
create policy "Tutors can read own certificates"
on public.tutor_certificates
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Tutors can insert own certificates" on public.tutor_certificates;
create policy "Tutors can insert own certificates"
on public.tutor_certificates
for insert
to authenticated
with check (
  (select auth.uid()) = user_id
  and exists (
    select 1
    from public.tutor_profiles tp
    where tp.id = tutor_certificates.tutor_id
      and tp.user_id = (select auth.uid())
  )
);

drop policy if exists "Tutors can update own certificates" on public.tutor_certificates;
create policy "Tutors can update own certificates"
on public.tutor_certificates
for update
to authenticated
using ((select auth.uid()) = user_id)
with check (
  (select auth.uid()) = user_id
  and exists (
    select 1
    from public.tutor_profiles tp
    where tp.id = tutor_certificates.tutor_id
      and tp.user_id = (select auth.uid())
  )
);

drop policy if exists "Tutors can delete own certificates" on public.tutor_certificates;
create policy "Tutors can delete own certificates"
on public.tutor_certificates
for delete
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Tutors can read own certificate files" on storage.objects;
create policy "Tutors can read own certificate files"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'tutor-certificates'
  and (select auth.uid())::text = (storage.foldername(name))[1]
);

drop policy if exists "Tutors can upload own certificate files" on storage.objects;
create policy "Tutors can upload own certificate files"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'tutor-certificates'
  and (select auth.uid())::text = (storage.foldername(name))[1]
);

drop policy if exists "Tutors can update own certificate files" on storage.objects;
create policy "Tutors can update own certificate files"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'tutor-certificates'
  and (select auth.uid())::text = (storage.foldername(name))[1]
)
with check (
  bucket_id = 'tutor-certificates'
  and (select auth.uid())::text = (storage.foldername(name))[1]
);

drop policy if exists "Tutors can delete own certificate files" on storage.objects;
create policy "Tutors can delete own certificate files"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'tutor-certificates'
  and (select auth.uid())::text = (storage.foldername(name))[1]
);
