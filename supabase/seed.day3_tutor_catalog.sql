-- Optional Day 3 catalog seed for preview/dev.
-- This creates non-customer demo tutor/student accounts so the public tutor
-- list and profile pages use Supabase data instead of local mocks.

create extension if not exists pgcrypto with schema extensions;

insert into public.languages (code, name_az, name_en, name_ru, flag_emoji, is_active, sort_order)
values
  ('az', 'Azərbaycan dili', 'Azerbaijani', 'Азербайджанский', '🇦🇿', true, 0),
  ('en', 'İngilis dili', 'English', 'Английский', '🇬🇧', true, 1),
  ('ru', 'Rus dili', 'Russian', 'Русский', '🇷🇺', false, 2),
  ('tr', 'Türk dili', 'Turkish', 'Турецкий', '🇹🇷', false, 3)
on conflict (code) do update set
  name_az = excluded.name_az,
  name_en = excluded.name_en,
  name_ru = excluded.name_ru,
  flag_emoji = excluded.flag_emoji,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order;

insert into auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
values
  (
    '11111111-1111-4111-8111-111111111111',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'leyla.day3@dilup.local',
    extensions.crypt('DilUp-day3-demo-only', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Leyla Karimova","intended_role":"tutor"}'::jsonb,
    now(),
    now()
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'emil.day3@dilup.local',
    extensions.crypt('DilUp-day3-demo-only', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Emil Hasanli","intended_role":"tutor"}'::jsonb,
    now(),
    now()
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'nigar.day3@dilup.local',
    extensions.crypt('DilUp-day3-demo-only', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Nigar Aliyeva","intended_role":"tutor"}'::jsonb,
    now(),
    now()
  ),
  (
    'aaaaaaa1-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'student.one.day3@dilup.local',
    extensions.crypt('DilUp-day3-demo-only', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Aysel Mammadova","intended_role":"student"}'::jsonb,
    now(),
    now()
  ),
  (
    'aaaaaaa2-aaaa-4aaa-8aaa-aaaaaaaaaaa2',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'student.two.day3@dilup.local',
    extensions.crypt('DilUp-day3-demo-only', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Murad Rahimli","intended_role":"student"}'::jsonb,
    now(),
    now()
  ),
  (
    'aaaaaaa3-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'student.three.day3@dilup.local',
    extensions.crypt('DilUp-day3-demo-only', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Kamran Safarli","intended_role":"student"}'::jsonb,
    now(),
    now()
  )
on conflict (id) do nothing;

insert into public.profiles (
  id,
  email,
  full_name,
  avatar_url,
  role,
  country,
  city,
  timezone,
  preferred_language,
  bio,
  is_active,
  is_online,
  last_seen_at
)
values
  (
    '11111111-1111-4111-8111-111111111111',
    'leyla.day3@dilup.local',
    'Leyla Karimova',
    '/images/footer/dilup-tutor-profile.jpg',
    'tutor',
    'AZ',
    'Baku',
    'Asia/Baku',
    'az',
    'IELTS speaking and business English coach for Azerbaijani learners.',
    true,
    true,
    now()
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'emil.day3@dilup.local',
    'Emil Hasanli',
    '/images/footer/dilup-tutor-profile.jpg',
    'tutor',
    'GB',
    'London',
    'Europe/London',
    'az',
    'Conversation-first English tutor focused on confident, practical speaking.',
    true,
    false,
    now() - interval '18 minutes'
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    'nigar.day3@dilup.local',
    'Nigar Aliyeva',
    '/images/footer/dilup-tutor-profile.jpg',
    'tutor',
    'TR',
    'Istanbul',
    'Europe/Istanbul',
    'az',
    'Patient grammar and exam tutor with structured weekly plans.',
    true,
    false,
    now() - interval '2 hours'
  ),
  (
    'aaaaaaa1-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
    'student.one.day3@dilup.local',
    'Aysel Mammadova',
    null,
    'student',
    'AZ',
    'Baku',
    'Asia/Baku',
    'az',
    null,
    true,
    false,
    null
  ),
  (
    'aaaaaaa2-aaaa-4aaa-8aaa-aaaaaaaaaaa2',
    'student.two.day3@dilup.local',
    'Murad Rahimli',
    null,
    'student',
    'AZ',
    'Ganja',
    'Asia/Baku',
    'az',
    null,
    true,
    false,
    null
  ),
  (
    'aaaaaaa3-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
    'student.three.day3@dilup.local',
    'Kamran Safarli',
    null,
    'student',
    'AZ',
    'Sumqayit',
    'Asia/Baku',
    'az',
    null,
    true,
    false,
    null
  )
on conflict (id) do update set
  full_name = excluded.full_name,
  avatar_url = excluded.avatar_url,
  role = excluded.role,
  country = excluded.country,
  city = excluded.city,
  timezone = excluded.timezone,
  preferred_language = excluded.preferred_language,
  bio = excluded.bio,
  is_active = excluded.is_active,
  is_online = excluded.is_online,
  last_seen_at = excluded.last_seen_at,
  updated_at = now();

insert into public.tutor_profiles (
  id,
  user_id,
  headline,
  about,
  price_per_lesson,
  trial_price_per_lesson,
  lesson_duration_minutes,
  currency,
  years_experience,
  total_lessons,
  total_students,
  total_hours,
  average_rating,
  total_reviews,
  response_time_minutes,
  completion_rate,
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
values
  (
    '91111111-1111-4111-8111-111111111111',
    '11111111-1111-4111-8111-111111111111',
    'IELTS speaking and business English with a clear weekly plan',
    'I help learners move from hesitant answers to fluent, structured speaking. Lessons include warm-up conversation, targeted correction, vocabulary you can reuse, and a simple plan for the next session.',
    27,
    12,
    50,
    'AZN',
    7,
    1840,
    310,
    1510,
    4.98,
    86,
    18,
    98,
    array['Business English','IELTS preparation','Speaking practice','Azerbaijani learners'],
    array['BA in English Language Teaching','IELTS trainer certificate'],
    array['Certified IELTS Speaking Coach','Business English Methodology'],
    true,
    'approved',
    now(),
    true,
    true,
    true
  ),
  (
    '92222222-2222-4222-8222-222222222222',
    '22222222-2222-4222-8222-222222222222',
    'Practical English conversations for work, travel, and interviews',
    'My classes are calm, direct, and conversation-heavy. We pick real situations from your week, fix recurring mistakes, and build phrases that sound natural without memorising long scripts.',
    22,
    10,
    50,
    'AZN',
    5,
    960,
    188,
    790,
    4.91,
    44,
    35,
    96,
    array['Conversational English','Interview preparation','Travel English'],
    array['MA Applied Linguistics'],
    array['CELTA'],
    false,
    'approved',
    now(),
    false,
    true,
    true
  ),
  (
    '93333333-3333-4333-8333-333333333333',
    '33333333-3333-4333-8333-333333333333',
    'Grammar, exam prep, and confident speaking for steady progress',
    'I teach with short explanations, lots of examples, and practical homework. You will always know what we practiced, what improved, and what to focus on before the next lesson.',
    19,
    9,
    50,
    'AZN',
    6,
    1225,
    240,
    1015,
    4.95,
    61,
    24,
    97,
    array['Grammar','Exam preparation','General English','Beginner friendly'],
    array['BA in Translation Studies'],
    array['Teaching Young Learners','Advanced Grammar Teaching'],
    true,
    'approved',
    now(),
    false,
    true,
    true
  )
on conflict (id) do update set
  headline = excluded.headline,
  about = excluded.about,
  price_per_lesson = excluded.price_per_lesson,
  trial_price_per_lesson = excluded.trial_price_per_lesson,
  lesson_duration_minutes = excluded.lesson_duration_minutes,
  currency = excluded.currency,
  years_experience = excluded.years_experience,
  total_lessons = excluded.total_lessons,
  total_students = excluded.total_students,
  total_hours = excluded.total_hours,
  average_rating = excluded.average_rating,
  total_reviews = excluded.total_reviews,
  response_time_minutes = excluded.response_time_minutes,
  completion_rate = excluded.completion_rate,
  specializations = excluded.specializations,
  education = excluded.education,
  certificates = excluded.certificates,
  is_professional = excluded.is_professional,
  application_status = excluded.application_status,
  approved_at = excluded.approved_at,
  is_featured = excluded.is_featured,
  is_accepting_students = excluded.is_accepting_students,
  instant_booking = excluded.instant_booking,
  updated_at = now();

insert into public.user_languages (user_id, language_id, level, is_teaching, is_learning)
select seed.user_id, languages.id, seed.level::language_level, seed.is_teaching, seed.is_learning
from (
  values
    ('11111111-1111-4111-8111-111111111111'::uuid, 'en', 'native', true, false),
    ('11111111-1111-4111-8111-111111111111'::uuid, 'az', 'native', false, false),
    ('11111111-1111-4111-8111-111111111111'::uuid, 'tr', 'advanced', false, false),
    ('22222222-2222-4222-8222-222222222222'::uuid, 'en', 'native', true, false),
    ('22222222-2222-4222-8222-222222222222'::uuid, 'az', 'advanced', false, false),
    ('33333333-3333-4333-8333-333333333333'::uuid, 'en', 'advanced', true, false),
    ('33333333-3333-4333-8333-333333333333'::uuid, 'az', 'native', false, false),
    ('33333333-3333-4333-8333-333333333333'::uuid, 'ru', 'intermediate', false, false)
) as seed(user_id, code, level, is_teaching, is_learning)
join public.languages on languages.code = seed.code
on conflict (user_id, language_id) do update set
  level = excluded.level,
  is_teaching = excluded.is_teaching,
  is_learning = excluded.is_learning;

delete from public.tutor_availability
where tutor_id in (
  '91111111-1111-4111-8111-111111111111',
  '92222222-2222-4222-8222-222222222222',
  '93333333-3333-4333-8333-333333333333'
);

insert into public.tutor_availability (tutor_id, day_of_week, start_time, end_time, is_active)
values
  ('91111111-1111-4111-8111-111111111111', 'monday', '09:00', '12:00', true),
  ('91111111-1111-4111-8111-111111111111', 'tuesday', '14:00', '18:00', true),
  ('91111111-1111-4111-8111-111111111111', 'wednesday', '10:00', '13:00', true),
  ('91111111-1111-4111-8111-111111111111', 'thursday', '15:00', '19:00', true),
  ('91111111-1111-4111-8111-111111111111', 'saturday', '11:00', '15:00', true),
  ('92222222-2222-4222-8222-222222222222', 'monday', '18:00', '21:00', true),
  ('92222222-2222-4222-8222-222222222222', 'wednesday', '17:00', '20:00', true),
  ('92222222-2222-4222-8222-222222222222', 'friday', '12:00', '16:00', true),
  ('92222222-2222-4222-8222-222222222222', 'sunday', '10:00', '13:00', true),
  ('93333333-3333-4333-8333-333333333333', 'tuesday', '09:00', '12:30', true),
  ('93333333-3333-4333-8333-333333333333', 'thursday', '09:00', '12:30', true),
  ('93333333-3333-4333-8333-333333333333', 'friday', '15:00', '18:00', true),
  ('93333333-3333-4333-8333-333333333333', 'saturday', '16:00', '19:00', true);

delete from public.reviews
where id in (
  '81111111-1111-4111-8111-111111111111',
  '82222222-2222-4222-8222-222222222222',
  '83333333-3333-4333-8333-333333333333'
);

insert into public.lessons (
  id,
  student_id,
  tutor_id,
  status,
  scheduled_at,
  duration_minutes,
  price,
  currency,
  topic
)
values
  (
    '71111111-1111-4111-8111-111111111111',
    'aaaaaaa1-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
    '91111111-1111-4111-8111-111111111111',
    'completed',
    now() - interval '12 days',
    50,
    27,
    'AZN',
    'IELTS speaking practice'
  ),
  (
    '72222222-2222-4222-8222-222222222222',
    'aaaaaaa2-aaaa-4aaa-8aaa-aaaaaaaaaaa2',
    '92222222-2222-4222-8222-222222222222',
    'completed',
    now() - interval '8 days',
    50,
    22,
    'AZN',
    'Interview English'
  ),
  (
    '73333333-3333-4333-8333-333333333333',
    'aaaaaaa3-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
    '93333333-3333-4333-8333-333333333333',
    'completed',
    now() - interval '5 days',
    50,
    19,
    'AZN',
    'Grammar review'
  )
on conflict (id) do update set
  status = excluded.status,
  scheduled_at = excluded.scheduled_at,
  topic = excluded.topic,
  updated_at = now();

insert into public.reviews (
  id,
  lesson_id,
  student_id,
  tutor_id,
  rating,
  rating_reassurance,
  rating_clarity,
  rating_progress,
  rating_preparation,
  comment,
  is_visible,
  created_at
)
values
  (
    '81111111-1111-4111-8111-111111111111',
    '71111111-1111-4111-8111-111111111111',
    'aaaaaaa1-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
    '91111111-1111-4111-8111-111111111111',
    5,
    5,
    5,
    5,
    5,
    'Leyla explains corrections clearly and keeps every lesson focused. I finally know how to structure IELTS answers.',
    true,
    now() - interval '11 days'
  ),
  (
    '82222222-2222-4222-8222-222222222222',
    '72222222-2222-4222-8222-222222222222',
    'aaaaaaa2-aaaa-4aaa-8aaa-aaaaaaaaaaa2',
    '92222222-2222-4222-8222-222222222222',
    5,
    5,
    5,
    4,
    5,
    'Emil helped me practice real interview answers without making the class stressful.',
    true,
    now() - interval '7 days'
  ),
  (
    '83333333-3333-4333-8333-333333333333',
    '73333333-3333-4333-8333-333333333333',
    'aaaaaaa3-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
    '93333333-3333-4333-8333-333333333333',
    5,
    5,
    5,
    5,
    4,
    'Nigar gives simple grammar rules and useful homework. The lessons feel organized.',
    true,
    now() - interval '4 days'
  )
on conflict (id) do update set
  rating = excluded.rating,
  rating_reassurance = excluded.rating_reassurance,
  rating_clarity = excluded.rating_clarity,
  rating_progress = excluded.rating_progress,
  rating_preparation = excluded.rating_preparation,
  comment = excluded.comment,
  is_visible = excluded.is_visible,
  updated_at = now();
