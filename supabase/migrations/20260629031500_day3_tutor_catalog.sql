-- Day 3 tutor catalog hardening.
-- Keeps browsing/profile data public, while writes remain owner-scoped.

alter table public.profiles enable row level security;
alter table public.tutor_profiles enable row level security;
alter table public.user_languages enable row level security;
alter table public.tutor_availability enable row level security;
alter table public.reviews enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.profiles to anon, authenticated;
grant select on public.tutor_profiles to anon, authenticated;
grant select on public.languages to anon, authenticated;
grant select on public.user_languages to anon, authenticated;
grant select on public.tutor_availability to anon, authenticated;
grant select on public.reviews to anon, authenticated;

drop policy if exists "Profiles visible to all" on public.profiles;
drop policy if exists "Public tutor profile identities are visible" on public.profiles;
create policy "Public tutor profile identities are visible"
on public.profiles
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.tutor_profiles tp
    where tp.user_id = profiles.id
      and tp.application_status = 'approved'
      and tp.is_accepting_students = true
  )
  or exists (
    select 1
    from public.reviews r
    join public.tutor_profiles tp on tp.id = r.tutor_id
    where r.student_id = profiles.id
      and r.is_visible = true
      and tp.application_status = 'approved'
      and tp.is_accepting_students = true
  )
  or (select auth.uid()) = id
);

drop policy if exists "Approved tutors visible" on public.tutor_profiles;
drop policy if exists "Approved tutors are visible" on public.tutor_profiles;
create policy "Approved tutors are visible"
on public.tutor_profiles
for select
to anon, authenticated
using (
  (application_status = 'approved' and is_accepting_students = true)
  or (select auth.uid()) = user_id
);

drop policy if exists "User languages for visible tutors are visible" on public.user_languages;
create policy "User languages for visible tutors are visible"
on public.user_languages
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.tutor_profiles tp
    where tp.user_id = user_languages.user_id
      and tp.application_status = 'approved'
      and tp.is_accepting_students = true
  )
  or (select auth.uid()) = user_id
);

drop policy if exists "Availability visible" on public.tutor_availability;
drop policy if exists "Visible tutor availability is visible" on public.tutor_availability;
create policy "Visible tutor availability is visible"
on public.tutor_availability
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.tutor_profiles tp
    where tp.id = tutor_availability.tutor_id
      and tp.application_status = 'approved'
      and tp.is_accepting_students = true
  )
);

drop policy if exists "Reviews visible to all" on public.reviews;
drop policy if exists "Visible tutor reviews are visible" on public.reviews;
create policy "Visible tutor reviews are visible"
on public.reviews
for select
to anon, authenticated
using (
  is_visible = true
  and exists (
    select 1
    from public.tutor_profiles tp
    where tp.id = reviews.tutor_id
      and tp.application_status = 'approved'
      and tp.is_accepting_students = true
  )
);

create index if not exists idx_user_languages_user_id on public.user_languages(user_id);
create index if not exists idx_reviews_tutor_visible on public.reviews(tutor_id) where is_visible = true;
