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

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

drop policy if exists "Tutors can insert own" on public.tutor_profiles;
create policy "Tutors can insert own profile"
on public.tutor_profiles
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Tutors can update own" on public.tutor_profiles;
create policy "Tutors can update own profile"
on public.tutor_profiles
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Languages visible to all" on public.user_languages;
drop policy if exists "Users manage own languages" on public.user_languages;
create policy "Users manage own languages"
on public.user_languages
for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Tutors manage own availability" on public.tutor_availability;
create policy "Tutors manage own availability"
on public.tutor_availability
for all
to authenticated
using (
  exists (
    select 1
    from public.tutor_profiles tp
    where tp.id = tutor_availability.tutor_id
      and tp.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.tutor_profiles tp
    where tp.id = tutor_availability.tutor_id
      and tp.user_id = (select auth.uid())
  )
);

drop policy if exists "Anyone can insert full onboarding response" on public.full_onboarding_responses;
create policy "Anyone can insert full onboarding response"
on public.full_onboarding_responses
for insert
to anon, authenticated
with check (user_id is null or (select auth.uid()) = user_id);

drop policy if exists "Users view own full onboarding response" on public.full_onboarding_responses;
create policy "Users view own full onboarding response"
on public.full_onboarding_responses
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Review authors can update" on public.reviews;
create policy "Review authors can update"
on public.reviews
for update
to authenticated
using ((select auth.uid()) = student_id)
with check ((select auth.uid()) = student_id);

create or replace function public.ensure_tutor_profile_for_user(p_user_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_tutor_id uuid;
  v_language_id uuid;
begin
  if p_user_id is null then
    raise exception 'Missing tutor user id' using errcode = '22023';
  end if;

  update public.profiles
  set role = 'tutor',
      updated_at = now()
  where id = p_user_id;

  insert into public.tutor_profiles (
    user_id,
    headline,
    about,
    price_per_lesson,
    trial_price_per_lesson,
    lesson_duration_minutes,
    currency,
    years_experience,
    specializations,
    education,
    certificates,
    is_professional,
    application_status,
    approved_at,
    is_featured,
    is_accepting_students,
    instant_booking
  )
  values (
    p_user_id,
    'DilUp tutor',
    'Ready to teach live language lessons on DilUp.',
    20,
    10,
    50,
    'AZN',
    0,
    array['Conversational English', 'Beginner friendly'],
    array['Teaching experience'],
    array['DilUp tutor verification'],
    false,
    'approved',
    now(),
    false,
    true,
    true
  )
  on conflict (user_id) do update set
    application_status = 'approved',
    approved_at = coalesce(public.tutor_profiles.approved_at, now()),
    is_accepting_students = true,
    instant_booking = true,
    headline = coalesce(nullif(public.tutor_profiles.headline, ''), excluded.headline),
    about = coalesce(nullif(public.tutor_profiles.about, ''), excluded.about),
    price_per_lesson = coalesce(public.tutor_profiles.price_per_lesson, excluded.price_per_lesson),
    trial_price_per_lesson = coalesce(public.tutor_profiles.trial_price_per_lesson, excluded.trial_price_per_lesson),
    updated_at = now()
  returning id into v_tutor_id;

  select id into v_language_id
  from public.languages
  where code = 'en'
  limit 1;

  if v_language_id is not null then
    insert into public.user_languages (user_id, language_id, level, is_teaching, is_learning)
    values (p_user_id, v_language_id, 'advanced', true, false)
    on conflict (user_id, language_id) do update set
      level = excluded.level,
      is_teaching = true,
      is_learning = false;
  end if;

  if not exists (
    select 1
    from public.tutor_availability
    where tutor_id = v_tutor_id
  ) then
    insert into public.tutor_availability (tutor_id, day_of_week, start_time, end_time, is_active)
    values
      (v_tutor_id, 'monday', '18:00', '21:00', true),
      (v_tutor_id, 'wednesday', '18:00', '21:00', true),
      (v_tutor_id, 'saturday', '10:00', '13:00', true);
  end if;

  return v_tutor_id;
end;
$$;

revoke all on function public.ensure_tutor_profile_for_user(uuid) from public;

create or replace function public.ensure_tutor_profile()
returns uuid
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_user_id uuid := (select auth.uid());
begin
  if v_user_id is null then
    raise exception 'Not authenticated' using errcode = '42501';
  end if;

  return public.ensure_tutor_profile_for_user(v_user_id);
end;
$$;

revoke all on function public.ensure_tutor_profile() from public;
grant execute on function public.ensure_tutor_profile() to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_role public.user_role :=
    case
      when new.raw_user_meta_data->>'intended_role' = 'tutor' then 'tutor'::public.user_role
      else 'student'::public.user_role
    end;
begin
  insert into public.profiles (id, email, full_name, avatar_url, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    v_role
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = excluded.full_name,
    avatar_url = excluded.avatar_url,
    role = excluded.role,
    updated_at = now();

  if v_role = 'tutor' then
    perform public.ensure_tutor_profile_for_user(new.id);
  end if;

  return new;
end;
$$;

revoke all on function public.handle_new_user() from public;
