# DilUp — Production Blueprint for Claude Code

> **DilUp** — Azərbaycan üçün online dil öyrənmə platforması (Preply modeli: marketplace, pay-per-lesson)
> Deploy: Vercel | DB: Supabase | Video: LiveKit Cloud | Payment: Payriff
> Repo: github.com/RasulXdev/DilUp

---

## 0. ƏSAS QƏRARLAR (Scope)

| Mövzu | Qərar |
|---|---|
| Platform növü | Yalnız **Web** (responsive) — mobile app gələcək faza |
| Biznes modeli | **Preply tipi marketplace** — tutor öz qiymətini təyin edir, tələbə **pay-per-lesson** ödəyir (abonəlik YOXDUR) |
| Əsas brand rəngi | **Mavi (Blue)** |
| UI interfeys dilləri | **English, Русский, Azərbaycanca** |
| Tədris olunan dillər | Başlanğıcda **English** aktiv; Spanish, French və s. → **"Coming Soon"** |
| For Business / Corporate training | **YOXDUR** |
| AppStore / PlayStore | **YOXDUR** |
| Komissiya modeli | Platform hər dərsdən komissiya alır (tutor qiymətinin müəyyən %-i), qalanı tutora ödənilir |
| Payment gateway | **Payriff** (Azərbaycan yerli provider, AZN+kart dəstəyi) |

---

## ÖNCƏDƏN HAZIRLANMALI (Claude Code-a başlamazdan əvvəl)

### Supabase
1. Mövcud `dilup` MCP server-i artıq qoşulub (project_ref: ktwuykrfctdkfyygcsox)
2. Bu dəyərləri götür:
   - `NEXT_PUBLIC_SUPABASE_URL` → Settings → API → Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Settings → API → anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY` → Settings → API → service_role key (gizli saxla)
3. Authentication → Providers → Google aktiv et
4. Authentication → Providers → Email aktiv et (magic link + password)

### LiveKit Cloud (Video Calls üçün)
1. https://cloud.livekit.io → hesab aç
2. `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`

### Vercel
1. GitHub repo `RasulXdev/DilUp` artıq qoşulu
2. Environment Variables-a bütün key-ləri əlavə et (Vercel Dashboard-da, istifadəçi özü edəcək)

### Payriff (Ödəniş)
1. https://payriff.com → biznes hesabı aç, merchant müraciəti
2. API docs-dan götür: `PAYRIFF_MERCHANT_ID`, `PAYRIFF_SECRET_KEY`, `PAYRIFF_BASE_URL`
3. Webhook URL konfiqurasiyası (ödəniş təsdiqi üçün)

### Google (OAuth)
- Google Cloud Console → OAuth 2.0 Client ID
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

### `.env.local` strukturu:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# LiveKit
LIVEKIT_URL=
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=

# Payriff
PAYRIFF_MERCHANT_ID=
PAYRIFF_SECRET_KEY=
PAYRIFF_BASE_URL=https://api.payriff.com

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=DilUp
```

---

## TEXNOLOGİYA STEKİ

| Qat | Texnologiya |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Dil | TypeScript (strict mode) |
| Styling | Tailwind CSS 3.4+ |
| UI Komponentlər | shadcn/ui |
| State | Zustand (global) + React Query (server) |
| DB | Supabase PostgreSQL |
| Auth | Supabase Auth (Email + Google) |
| Storage | Supabase Storage (avatarlar, sənədlər) |
| Realtime | Supabase Realtime (mesajlar, status) |
| Video | LiveKit (@livekit/components-react) |
| Ödəniş | **Payriff** (AZN, yerli kartlar) |
| Email | Resend (tranzaksional emaillər) |
| i18n | next-intl (AZ / EN / RU) |
| Validation | Zod |
| Forms | React Hook Form + Zod resolver |
| Deploy | Vercel |
| Analytics | Vercel Analytics |

---

## GÜN 1 — PROYEKT SETUP + DATABASE + AUTH

### 1.1 Proyekt vəziyyəti
Next.js proyekt artıq `npx create-next-app` ilə qurulub, GitHub-a push olunub (`RasulXdev/DilUp`). Supabase MCP qoşulub.

### 1.2 Paketlərin Quraşdırılması
```bash
# UI
npx shadcn@latest init
npx shadcn@latest add button card input label dialog dropdown-menu avatar badge separator sheet tabs textarea select command popover calendar toast sonner skeleton switch scroll-area slider

# Core
npm install @supabase/supabase-js @supabase/ssr zustand @tanstack/react-query zod react-hook-form @hookform/resolvers

# i18n
npm install next-intl

# Utils
npm install date-fns lucide-react clsx tailwind-merge class-variance-authority

# Video
npm install @livekit/components-react livekit-client livekit-server-sdk

# Ödəniş — Payriff üçün rəsmi SDK yoxdur, REST API ilə fetch/axios istifadə olunacaq
npm install axios
```

### 1.3 Proyekt Strukturu
```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx                       # Landing page
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── register/tutor/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   └── callback/route.ts
│   │   ├── (onboarding)/
│   │   │   └── get-started/page.tsx       # 13-sualllı quiz (Preply-style)
│   │   ├── (platform)/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── tutors/
│   │   │   │   ├── page.tsx               # Browse/search tutors
│   │   │   │   └── [id]/page.tsx          # Tutor profile
│   │   │   ├── checkout/[tutorId]/page.tsx # Booking + payment
│   │   │   ├── schedule/page.tsx
│   │   │   ├── lessons/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── messages/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [conversationId]/page.tsx
│   │   │   ├── room/[roomId]/page.tsx     # Video room
│   │   │   ├── settings/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── billing/page.tsx
│   │   │   │   └── notifications/page.tsx
│   │   │   └── saved-tutors/page.tsx
│   │   ├── (tutor)/
│   │   │   ├── layout.tsx
│   │   │   ├── tutor-dashboard/page.tsx
│   │   │   ├── tutor-schedule/page.tsx
│   │   │   ├── tutor-students/page.tsx
│   │   │   ├── tutor-earnings/page.tsx
│   │   │   └── tutor-settings/page.tsx
│   │   ├── (admin)/
│   │   │   ├── layout.tsx
│   │   │   ├── admin/page.tsx
│   │   │   ├── admin/users/page.tsx
│   │   │   ├── admin/tutors/page.tsx
│   │   │   ├── admin/lessons/page.tsx
│   │   │   ├── admin/payments/page.tsx
│   │   │   └── admin/settings/page.tsx
│   │   └── (public)/
│   │       ├── about/page.tsx
│   │       ├── become-tutor/page.tsx
│   │       ├── how-it-works/page.tsx
│   │       ├── faq/page.tsx
│   │       ├── privacy/page.tsx
│   │       ├── terms/page.tsx
│   │       └── contact/page.tsx
│   └── api/
│       ├── auth/callback/route.ts
│       ├── livekit/token/route.ts
│       ├── payriff/
│       │   ├── create-order/route.ts      # ödəniş sessiyası yaratmaq
│       │   ├── webhook/route.ts           # Payriff callback
│       │   └── verify/route.ts
│       ├── tutors/
│       │   ├── route.ts
│       │   └── [id]/
│       │       ├── route.ts
│       │       └── availability/route.ts
│       ├── lessons/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       ├── messages/route.ts
│       ├── upload/route.ts
│       └── admin/
│           ├── stats/route.ts
│           └── payouts/route.ts
├── components/
│   ├── ui/                         # shadcn (auto-generated)
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   └── MobileNav.tsx
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── TrustStats.tsx
│   │   ├── LanguageGrid.tsx
│   │   ├── SocialProofCarousel.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── GuaranteeBanner.tsx
│   │   ├── BecomeTutorCTA.tsx
│   │   └── FAQ.tsx
│   ├── onboarding/
│   │   ├── QuizLayout.tsx              # split-screen şablonu
│   │   ├── QuizStepGoal.tsx
│   │   ├── QuizStepSingleSelect.tsx
│   │   ├── QuizStepMultiSelectPill.tsx
│   │   ├── QuizStepRangeSlider.tsx
│   │   ├── QuizStepFreeText.tsx
│   │   ├── QuizSummary.tsx              # chip recap ekranı
│   │   ├── QuizLoadingTransition.tsx    # dəyişən sözlər animasiyası
│   │   └── RegistrationWallModal.tsx    # bulanıq nəticə + sign up
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── TutorRegisterForm.tsx
│   │   ├── SocialButtons.tsx
│   │   └── AuthGuard.tsx
│   ├── tutors/
│   │   ├── TutorCard.tsx
│   │   ├── TutorGrid.tsx
│   │   ├── TutorFilters.tsx
│   │   ├── TutorProfileHeader.tsx
│   │   ├── TutorVideoIntro.tsx
│   │   ├── TutorAbout.tsx
│   │   ├── TutorLanguagesSpoken.tsx
│   │   ├── TutorLessonRating.tsx        # Reassurance/Clarity/Progress/Preparation
│   │   ├── TutorReviews.tsx
│   │   ├── TutorReviewAISummary.tsx
│   │   ├── TutorAvailability.tsx        # weekly schedule grid
│   │   └── BookingSidebar.tsx           # sticky booking widget
│   ├── checkout/
│   │   ├── CheckoutTutorCard.tsx
│   │   ├── TrialLessonDetails.tsx
│   │   ├── PriceBreakdown.tsx
│   │   ├── PaymentMethodTabs.tsx
│   │   └── PayriffCardForm.tsx
│   ├── lessons/
│   │   ├── LessonCard.tsx
│   │   ├── LessonList.tsx
│   │   ├── LessonTimer.tsx
│   │   ├── LessonNotes.tsx
│   │   └── ReviewForm.tsx
│   ├── schedule/
│   │   ├── WeeklyCalendar.tsx
│   │   ├── TimeSlotPicker.tsx
│   │   ├── AvailabilityEditor.tsx
│   │   └── TimezoneSelector.tsx
│   ├── video/
│   │   ├── VideoRoom.tsx
│   │   ├── VideoControls.tsx
│   │   ├── ParticipantView.tsx
│   │   ├── ChatPanel.tsx
│   │   └── SharedNotes.tsx
│   ├── messages/
│   │   ├── ConversationList.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── MessageInput.tsx
│   │   └── ConversationView.tsx
│   ├── dashboard/
│   │   ├── StatsCards.tsx
│   │   ├── UpcomingLessons.tsx
│   │   ├── RecentActivity.tsx
│   │   └── RecommendedTutors.tsx
│   └── shared/
│       ├── Logo.tsx
│       ├── LanguageSwitcher.tsx
│       ├── LoadingSpinner.tsx
│       ├── EmptyState.tsx
│       ├── ErrorBoundary.tsx
│       ├── Rating.tsx
│       ├── PriceDisplay.tsx
│       └── OnlineStatus.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   ├── middleware.ts
│   │   └── admin.ts
│   ├── livekit/
│   │   └── server.ts
│   ├── payriff/
│   │   ├── client.ts                # API wrapper
│   │   └── signature.ts             # HMAC imza doğrulama
│   ├── validations/
│   │   ├── auth.ts
│   │   ├── booking.ts
│   │   ├── profile.ts
│   │   └── review.ts
│   ├── utils.ts
│   ├── constants.ts
│   └── types/
│       ├── database.ts
│       ├── index.ts
│       └── api.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useTutors.ts
│   ├── useLessons.ts
│   ├── useMessages.ts
│   ├── useSchedule.ts
│   ├── useBooking.ts
│   └── useRealtime.ts
├── stores/
│   ├── authStore.ts
│   ├── uiStore.ts
│   ├── onboardingQuizStore.ts       # quiz cavablarını saxlayır
│   └── bookingStore.ts
├── messages/
│   ├── az.json
│   ├── en.json
│   └── ru.json
├── middleware.ts
└── styles/
    └── globals.css
```

### 1.4 Supabase Database Schema

```sql
-- ============================================
-- DILUP DATABASE SCHEMA — FULL PRODUCTION (Preply-style marketplace)
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE user_role AS ENUM ('student', 'tutor', 'admin');
CREATE TYPE lesson_status AS ENUM ('scheduled', 'in_progress', 'completed', 'cancelled', 'no_show');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'expired');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE tutor_application_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE language_level AS ENUM ('beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced', 'native');
CREATE TYPE day_of_week AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
CREATE TYPE notification_type AS ENUM ('lesson_reminder', 'lesson_cancelled', 'new_booking', 'new_message', 'payment', 'review', 'system');
CREATE TYPE conversation_type AS ENUM ('direct', 'lesson');

-- ============================================
-- PROFILES (extends Supabase Auth)
-- ============================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'student',
    date_of_birth DATE,
    country TEXT DEFAULT 'AZ',
    city TEXT DEFAULT 'Bakı',
    timezone TEXT DEFAULT 'Asia/Baku',
    preferred_language TEXT DEFAULT 'az', -- interfeys dili
    bio TEXT,
    is_active BOOLEAN DEFAULT true,
    is_online BOOLEAN DEFAULT false,
    last_seen_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LANGUAGES
-- ============================================
CREATE TABLE languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    name_az TEXT NOT NULL,
    name_en TEXT NOT NULL,
    name_ru TEXT NOT NULL,
    flag_emoji TEXT,
    is_active BOOLEAN DEFAULT true,   -- false = "Coming Soon"
    sort_order INT DEFAULT 0
);

INSERT INTO languages (code, name_az, name_en, name_ru, flag_emoji, is_active, sort_order) VALUES
('en', 'İngilis dili', 'English', 'Английский', '🇬🇧', true, 1),
('ru', 'Rus dili', 'Russian', 'Русский', '🇷🇺', false, 2),
('tr', 'Türk dili', 'Turkish', 'Турецкий', '🇹🇷', false, 3),
('de', 'Alman dili', 'German', 'Немецкий', '🇩🇪', false, 4),
('fr', 'Fransız dili', 'French', 'Французский', '🇫🇷', false, 5),
('es', 'İspan dili', 'Spanish', 'Испанский', '🇪🇸', false, 6),
('ar', 'Ərəb dili', 'Arabic', 'Арабский', '🇸🇦', false, 7),
('it', 'İtalyan dili', 'Italian', 'Итальянский', '🇮🇹', false, 8),
('zh', 'Çin dili', 'Chinese', 'Китайский', '🇨🇳', false, 9);

-- ============================================
-- USER LANGUAGES
-- ============================================
CREATE TABLE user_languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    language_id UUID NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    level language_level NOT NULL,
    is_teaching BOOLEAN DEFAULT false,
    is_learning BOOLEAN DEFAULT false,
    UNIQUE(user_id, language_id)
);

-- ============================================
-- TUTOR PROFILES (Preply-style: tutor öz qiymətini təyin edir)
-- ============================================
CREATE TABLE tutor_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    headline TEXT,
    about TEXT,
    video_intro_url TEXT,
    price_per_lesson DECIMAL(10,2) NOT NULL,    -- TUTOR ÖZÜ TƏYİN EDİR
    trial_price_per_lesson DECIMAL(10,2),       -- trial dərs üçün endirimli qiymət (optional)
    lesson_duration_minutes INT NOT NULL DEFAULT 50, -- 25 / 50 (checkout-da seçim)
    currency TEXT DEFAULT 'AZN',
    years_experience INT DEFAULT 0,
    total_lessons INT DEFAULT 0,
    total_students INT DEFAULT 0,
    total_hours DECIMAL(10,2) DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0,
    total_reviews INT DEFAULT 0,
    response_time_minutes INT,
    completion_rate DECIMAL(5,2) DEFAULT 100,
    specializations TEXT[],
    education TEXT[],
    certificates TEXT[],
    is_professional BOOLEAN DEFAULT false,       -- "Professional Tutor" badge
    application_status tutor_application_status DEFAULT 'pending',
    approved_at TIMESTAMPTZ,
    is_featured BOOLEAN DEFAULT false,
    is_accepting_students BOOLEAN DEFAULT true,
    instant_booking BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TUTOR AVAILABILITY
-- ============================================
CREATE TABLE tutor_availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tutor_id UUID NOT NULL REFERENCES tutor_profiles(id) ON DELETE CASCADE,
    day_of_week day_of_week NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_active BOOLEAN DEFAULT true,
    CONSTRAINT valid_time_range CHECK (start_time < end_time)
);

CREATE TABLE tutor_unavailability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tutor_id UUID NOT NULL REFERENCES tutor_profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BOOKINGS
-- ============================================
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    tutor_id UUID NOT NULL REFERENCES tutor_profiles(id) ON DELETE CASCADE,
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 50,
    status booking_status DEFAULT 'pending',
    is_trial BOOLEAN DEFAULT false,
    price DECIMAL(10,2) NOT NULL,              -- booking anındaki qiymət (snapshot)
    platform_commission_rate DECIMAL(5,2) NOT NULL DEFAULT 25.00, -- platform %-i
    currency TEXT DEFAULT 'AZN',
    student_note TEXT,
    tutor_note TEXT,
    cancelled_by UUID REFERENCES profiles(id),
    cancelled_reason TEXT,
    cancelled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LESSONS
-- ============================================
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID UNIQUE REFERENCES bookings(id) ON DELETE SET NULL,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    tutor_id UUID NOT NULL REFERENCES tutor_profiles(id) ON DELETE CASCADE,
    room_id TEXT UNIQUE,
    status lesson_status DEFAULT 'scheduled',
    scheduled_at TIMESTAMPTZ NOT NULL,
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    duration_minutes INT NOT NULL DEFAULT 50,
    actual_duration_minutes INT,
    price DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'AZN',
    language_id UUID REFERENCES languages(id),
    topic TEXT,
    tutor_notes TEXT,
    student_notes TEXT,
    shared_notes TEXT,
    homework TEXT,
    recording_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- REVIEWS
-- ============================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID UNIQUE NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    tutor_id UUID NOT NULL REFERENCES tutor_profiles(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    -- Preply-style 4 metrik (Reassurance, Clarity, Progress, Preparation)
    rating_reassurance INT CHECK (rating_reassurance BETWEEN 1 AND 5),
    rating_clarity INT CHECK (rating_clarity BETWEEN 1 AND 5),
    rating_progress INT CHECK (rating_progress BETWEEN 1 AND 5),
    rating_preparation INT CHECK (rating_preparation BETWEEN 1 AND 5),
    comment TEXT,
    tutor_response TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CONVERSATIONS / MESSAGES
-- ============================================
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type conversation_type DEFAULT 'direct',
    lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE conversation_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    last_read_at TIMESTAMPTZ DEFAULT NOW(),
    is_muted BOOLEAN DEFAULT false,
    UNIQUE(conversation_id, user_id)
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    is_edited BOOLEAN DEFAULT false,
    attachment_url TEXT,
    attachment_type TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PAYMENTS (Payriff — pay-per-lesson, abonəlik YOXDUR)
-- ============================================
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'AZN',
    status payment_status DEFAULT 'pending',
    payriff_order_id TEXT UNIQUE,          -- Payriff sifariş ID-si
    payriff_transaction_id TEXT,
    payriff_payment_url TEXT,
    payment_method TEXT,                   -- 'card', 'apple_pay', 'google_pay'
    failure_reason TEXT,
    paid_at TIMESTAMPTZ,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TUTOR PAYOUTS (komissiya çıxıldıqdan sonra tutora ödəniş)
-- ============================================
CREATE TABLE tutor_payouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tutor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id),
    gross_amount DECIMAL(10,2) NOT NULL,    -- tələbənin ödədiyi məbləğ
    commission_amount DECIMAL(10,2) NOT NULL, -- platform komissiyası
    net_amount DECIMAL(10,2) NOT NULL,      -- tutora çatan məbləğ
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'cancelled'
    paid_at TIMESTAMPTZ,
    admin_note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- FAVORITES
-- ============================================
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    tutor_id UUID NOT NULL REFERENCES tutor_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, tutor_id)
);

-- ============================================
-- NOTIFICATIONS
-- ============================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    data JSONB,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ONBOARDING QUIZ RESPONSES (analitika + matching üçün)
-- ============================================
CREATE TABLE onboarding_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE, -- qeydiyyatdan əvvəl null ola bilər
    session_id TEXT NOT NULL,         -- anonim sessiya izləmə üçün
    goal TEXT,
    goal_achievement_period TEXT,
    career_industry TEXT,
    career_role TEXT,
    career_skills TEXT[],
    specialties TEXT[],
    level TEXT,
    tutor_style TEXT[],
    country_of_birth TEXT,
    also_speaks TEXT[],
    available_days TEXT[],
    available_times TEXT[],
    budget_min DECIMAL(10,2),
    budget_max DECIMAL(10,2),
    future_subjects TEXT[],
    free_text TEXT,
    converted_to_signup BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- REPORTS
-- ============================================
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    reported_user_id UUID REFERENCES profiles(id),
    lesson_id UUID REFERENCES lessons(id),
    reason TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending',
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_is_online ON profiles(is_online);
CREATE INDEX idx_tutor_profiles_user_id ON tutor_profiles(user_id);
CREATE INDEX idx_tutor_profiles_status ON tutor_profiles(application_status);
CREATE INDEX idx_tutor_profiles_rating ON tutor_profiles(average_rating DESC);
CREATE INDEX idx_tutor_profiles_price ON tutor_profiles(price_per_lesson);
CREATE INDEX idx_tutor_profiles_featured ON tutor_profiles(is_featured) WHERE is_featured = true;
CREATE INDEX idx_tutor_availability_tutor ON tutor_availability(tutor_id);
CREATE INDEX idx_bookings_student ON bookings(student_id);
CREATE INDEX idx_bookings_tutor ON bookings(tutor_id);
CREATE INDEX idx_bookings_scheduled ON bookings(scheduled_at);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_lessons_student ON lessons(student_id);
CREATE INDEX idx_lessons_tutor ON lessons(tutor_id);
CREATE INDEX idx_lessons_status ON lessons(status);
CREATE INDEX idx_lessons_scheduled ON lessons(scheduled_at);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_created ON messages(created_at DESC);
CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id) WHERE is_read = false;
CREATE INDEX idx_favorites_student ON favorites(student_id);
CREATE INDEX idx_reviews_tutor ON reviews(tutor_id);
CREATE INDEX idx_onboarding_session ON onboarding_responses(session_id);

CREATE INDEX idx_tutor_search ON tutor_profiles USING gin(
    to_tsvector('english', coalesce(headline, '') || ' ' || coalesce(about, '') || ' ' || array_to_string(specializations, ' '))
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_unavailability ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles visible to all" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Approved tutors visible" ON tutor_profiles FOR SELECT USING (application_status = 'approved' OR user_id = auth.uid());
CREATE POLICY "Tutors can update own" ON tutor_profiles FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Tutors can insert own" ON tutor_profiles FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Availability visible" ON tutor_availability FOR SELECT USING (true);
CREATE POLICY "Tutors manage own availability" ON tutor_availability FOR ALL USING (
    tutor_id IN (SELECT id FROM tutor_profiles WHERE user_id = auth.uid())
);

CREATE POLICY "Booking parties can view" ON bookings FOR SELECT USING (
    student_id = auth.uid() OR tutor_id IN (SELECT id FROM tutor_profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Students can create bookings" ON bookings FOR INSERT WITH CHECK (student_id = auth.uid());
CREATE POLICY "Booking parties can update" ON bookings FOR UPDATE USING (
    student_id = auth.uid() OR tutor_id IN (SELECT id FROM tutor_profiles WHERE user_id = auth.uid())
);

CREATE POLICY "Lesson participants can view" ON lessons FOR SELECT USING (
    student_id = auth.uid() OR tutor_id IN (SELECT id FROM tutor_profiles WHERE user_id = auth.uid())
);

CREATE POLICY "Reviews visible to all" ON reviews FOR SELECT USING (is_visible = true);
CREATE POLICY "Students can create reviews" ON reviews FOR INSERT WITH CHECK (student_id = auth.uid());
CREATE POLICY "Review authors can update" ON reviews FOR UPDATE USING (student_id = auth.uid());

CREATE POLICY "Participants can view messages" ON messages FOR SELECT USING (
    conversation_id IN (SELECT conversation_id FROM conversation_participants WHERE user_id = auth.uid())
);
CREATE POLICY "Participants can send messages" ON messages FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND conversation_id IN (
        SELECT conversation_id FROM conversation_participants WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Users manage own favorites" ON favorites FOR ALL USING (student_id = auth.uid());

CREATE POLICY "Users view own notifications" ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users update own notifications" ON notifications FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Languages visible to all" ON user_languages FOR SELECT USING (true);
CREATE POLICY "Users manage own languages" ON user_languages FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Participants can view" ON conversation_participants FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Participants can view conversations" ON conversations FOR SELECT USING (
    id IN (SELECT conversation_id FROM conversation_participants WHERE user_id = auth.uid())
);

CREATE POLICY "Anyone can insert onboarding response" ON onboarding_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Users view own onboarding response" ON onboarding_responses FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can create reports" ON reports FOR INSERT WITH CHECK (reporter_id = auth.uid());
CREATE POLICY "Users can view own reports" ON reports FOR SELECT USING (reporter_id = auth.uid());

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO profiles (id, email, full_name, avatar_url)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        new.raw_user_meta_data->>'avatar_url'
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

CREATE OR REPLACE FUNCTION update_tutor_rating()
RETURNS trigger AS $$
BEGIN
    UPDATE tutor_profiles SET
        average_rating = (SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE tutor_id = NEW.tutor_id AND is_visible = true),
        total_reviews = (SELECT COUNT(*) FROM reviews WHERE tutor_id = NEW.tutor_id AND is_visible = true),
        updated_at = NOW()
    WHERE id = NEW.tutor_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_review_change
    AFTER INSERT OR UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_tutor_rating();

-- Lesson completed olanda tutor_payouts avtomatik yaransın
CREATE OR REPLACE FUNCTION create_tutor_payout()
RETURNS trigger AS $$
DECLARE
    v_commission_rate DECIMAL(5,2);
    v_commission DECIMAL(10,2);
    v_net DECIMAL(10,2);
    v_tutor_user_id UUID;
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        SELECT b.platform_commission_rate INTO v_commission_rate
        FROM bookings b WHERE b.id = NEW.booking_id;

        SELECT tp.user_id INTO v_tutor_user_id
        FROM tutor_profiles tp WHERE tp.id = NEW.tutor_id;

        v_commission := ROUND(NEW.price * v_commission_rate / 100, 2);
        v_net := NEW.price - v_commission;

        INSERT INTO tutor_payouts (tutor_id, lesson_id, gross_amount, commission_amount, net_amount)
        VALUES (v_tutor_user_id, NEW.id, NEW.price, v_commission, v_net);

        UPDATE tutor_profiles SET
            total_lessons = total_lessons + 1,
            total_hours = total_hours + (NEW.actual_duration_minutes / 60.0)
        WHERE id = NEW.tutor_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_lesson_completed
    AFTER UPDATE ON lessons
    FOR EACH ROW EXECUTE FUNCTION create_tutor_payout();

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_tutor_profiles_updated_at BEFORE UPDATE ON tutor_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- STORAGE BUCKETS
-- ============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('lesson-attachments', 'lesson-attachments', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('chat-attachments', 'chat-attachments', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('tutor-videos', 'tutor-videos', true);

CREATE POLICY "Avatar images are public" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update own avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own avatar" ON storage.objects FOR DELETE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload documents" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can view own documents" ON storage.objects FOR SELECT USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Tutor videos are public" ON storage.objects FOR SELECT USING (bucket_id = 'tutor-videos');
CREATE POLICY "Tutors can upload own video" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'tutor-videos' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### 1.5 Auth Implementation
- Supabase Auth: email/password + Google OAuth + magic link
- Middleware: session refresh, locale detection, protected routes redirect
- Auth pages: Login, Register (student), Register (tutor — multi-step), Forgot Password
- Role-based redirects: student → /dashboard, tutor → /tutor-dashboard, admin → /admin

### 1.6 i18n Setup (next-intl)
- Routing: `/az/...`, `/en/...`, `/ru/...`
- Default locale: `az`
- Translation files: `messages/az.json`, `messages/en.json`, `messages/ru.json`
- LanguageSwitcher component in navbar

### 1.7 Gün 1 Gözlənilən Nəticə
- [ ] Supabase DB schema deploy olunub (yuxarıdaki SQL)
- [ ] Auth tam işləyir (register, login, logout, Google, magic link)
- [ ] i18n 3 dildə işləyir
- [ ] Middleware: auth redirect + locale detection
- [ ] Supabase types generate olunub
- [ ] shadcn/ui komponentlər quraşdırılıb
- [ ] Bazal layout: Navbar (logo, language switcher, auth buttons)

---

## GÜN 2 — ONBOARDING QUİZ + LANDİNG PAGE

### 2.1 Onboarding Quiz (Preply-style, `/get-started`)
- Split-screen layout (sol illustrasiya, sağ sual)
- 13 sual axını (bax: Component bölməsi, `dilup-master-plan.md`-də ətraflı sənədləşdirilib)
- Adaptiv branching (goal=career → industry sualı görünür)
- Geo-lokalizasiya (ölkə/dil sualları istifadəçinin IP-sinə görə)
- Multi-select pill, single-select, range slider, free-text sual tipləri
- Summary/recap ekranı (chip-lər)
- Loading transition animasiyası
- Registration wall modal (Google/Facebook/Email)
- Quiz cavabları `onboarding_responses` table-a yazılır (anonim session_id ilə, sonra user_id ilə bağlanır)

### 2.2 Landing Page
- Hero, Trust stats, Language grid, Social proof carousel, How it works, Guarantee banner, Become a tutor CTA, Footer
- (Detallı struktur: `dilup-master-plan.md` bölmə 2)

### 2.3 Public Pages
- `/about`, `/become-tutor`, `/how-it-works`, `/faq`, `/privacy`, `/terms`, `/contact`
- **YOXDUR:** `/for-business`, `/pricing` (abonəlik plan səhifəsi lazım deyil — qiymət hər tutorda fərqli)

### 2.4 SEO & Meta
- Dynamic metadata, JSON-LD, sitemap.xml, robots.txt, OG images

### 2.5 Gün 2 Gözlənilən Nəticə
- [ ] Onboarding quiz tam işləyir (13 sual + summary + registration wall)
- [ ] Landing page responsive
- [ ] Public pages hazır
- [ ] SEO meta tags
- [ ] Lighthouse 90+

---

## GÜN 3 — TUTOR SEARCH + PROFILE PAGE

### 3.1 Platform Layout
- Sidebar, TopBar (search, notifications, avatar dropdown), MobileNav

### 3.2 Student Dashboard (`/dashboard`)
- Stats Cards, Upcoming Lessons, Recent Activity, Recommended Tutors, Quick actions

### 3.3 Browse Tutors (`/tutors`)
- Filter bar: dil, qiymət range, ölkə, mövcudluq, specialties, native speaker
- TutorCard: avatar+status dot, ad+badge+bayraq, tutor tipi, dil, bio, social proof, qiymət+rating+stats, CTA-lar
- Sort, search, infinite scroll/pagination

### 3.4 Tutor Profile (`/tutors/[id]`)
- Video intro, başlıq, "Professional Tutor" badge, about, "I speak", **Lesson rating (4 metrik)**, **AI review summary**, reviews, **weekly schedule grid**, sticky booking sidebar
- (Detallı struktur: `dilup-master-plan.md` bölmə 5)

### 3.5 Gün 3 Gözlənilən Nəticə
- [ ] Tutors browse page (filter+search+sort)
- [ ] Tutor profile page tam
- [ ] Favorites
- [ ] React Query hooks
- [ ] Loading/empty/error states

---

## GÜN 4 — TUTOR ONBOARDING + TUTOR DASHBOARD

### 4.1 Tutor Registration (Multi-step)
1. Əsas məlumatlar
2. Dillər (nə öyrədir + səviyyə)
3. Təhsil & Sertifikatlar (file upload)
4. Haqqında + İxtisaslar
5. Video intro
6. **Qiymət təyini** — tutor `price_per_lesson` daxil edir (Preply-style, platform məsləhət range göstərir)
7. Cədvəl (iş saatları)
8. Nəzərdən keçir + Göndər → "Müraciətiniz nəzərdən keçirilir"

### 4.2 Tutor Dashboard (`/tutor-dashboard`)
- Stats: bu ayın dərsləri, qazanc, reytinq, yeni tələbələr
- Bu günün dərsləri, gözləyən booking-lər, son rəylər, qazanc qrafiki

### 4.3 Tutor Schedule, Students, Earnings, Settings
- (Detallı: NATIVLY formatına bənzər, lakin qiymət dəyişdirmə **AKTİV** — tutor öz qiymətini istənilən vaxt dəyişə bilər)

### 4.4 Gün 4 Gözlənilən Nəticə
- [ ] Tutor registration (qiymət təyini daxil) tam işləyir
- [ ] Tutor dashboard
- [ ] Cədvəl redaktoru
- [ ] Tələbə siyahısı, qazanc səhifəsi

---

## GÜN 5 — BOOKING SYSTEM + SCHEDULING

### 5.1 Booking Flow (Preply-style)
1. Student tutor profilindən vaxt seçir
2. Müddət seçir (25/50 dəq — `tutor_profiles.lesson_duration_minutes`-a əsasən)
3. Checkout səhifəsinə yönləndirilir (`/checkout/[tutorId]?hours=N`)
4. Qiymət breakdown göstərilir: lesson price, processing fee, discount, **Total**
5. Payriff ilə ödəniş (kart formu və ya Apple/Google Pay)
6. Ödəniş təsdiqlənəndə: booking confirmed, lesson record yaranır
7. Hər iki tərəf bildiriş alır
8. Xatırlatma: 1 saat / 15 dəq əvvəl

### 5.2 Availability Engine
- `GET /api/tutors/[id]/availability?date=...`
- Cədvəl + booking-lər + unavailability nəzərə alınır
- Timezone conversion

### 5.3 Cancellation Policy
- 24+ saat: pulsuz ləğv
- 12-24 saat: 50% tutulur
- <12 saat / no-show: tam ödəniş tutulur

### 5.4 Gün 5 Gözlənilən Nəticə
- [ ] Booking flow start-to-finish
- [ ] Availability engine
- [ ] Schedule views
- [ ] Cancellation policy
- [ ] Notifications (realtime)

---

## GÜN 6 — VIDEO CALLING (LiveKit)

(NATIVLY.md-dəki Gün 6 strukturu ilə eyni — LiveKit token API, VideoRoom, pre/post-call screens, lesson lifecycle)

### 6.1 Gün 6 Gözlənilən Nəticə
- [ ] LiveKit token generation
- [ ] Video room (1-on-1) tam işləyir
- [ ] Pre/post-call screens
- [ ] Lesson timer, shared notes, in-call chat
- [ ] Lesson lifecycle (scheduled→in_progress→completed)

---

## GÜN 7 — MESSAGING SYSTEM

(NATIVLY.md-dəki Gün 7 strukturu ilə eyni — Supabase Realtime chat, conversation list, message bubbles, typing indicator, attachments)

### 7.1 Gün 7 Gözlənilən Nəticə
- [ ] Realtime messaging
- [ ] Conversation list + message view
- [ ] Attachments, typing indicator, online status
- [ ] Mobile responsive chat

---

## GÜN 8 — PAYMENT SYSTEM (Payriff, pay-per-lesson)

### 8.1 Payriff Integration
- `/api/payriff/create-order` — sifariş yaratmaq, Payriff-ə redirect URL al
- `/api/payriff/webhook` — ödəniş statusu callback (HMAC imza doğrulama)
- `/api/payriff/verify` — ödəniş statusunu sorğulamaq (polling fallback)

### 8.2 Payment Flow (hər dərs üçün ayrıca)
1. Student checkout səhifəsində kart məlumatı daxil edir / Payriff hosted page-ə yönləndirilir
2. `payments` table-da `pending` status ilə record yaranır
3. Payriff ödənişi emal edir → webhook gəlir
4. Webhook: `payments.status = 'completed'`, `bookings.status = 'confirmed'`
5. Lesson record yaranır, hər iki tərəfə bildiriş

### 8.3 Tutora Ödəniş (komissiya modeli)
- Dərs `completed` olanda: trigger avtomatik `tutor_payouts` yaradır (gross/commission/net)
- Admin panel → Pending Payouts → "Ödə" (bank transfer, manual)
- `tutor_payouts.status = 'paid'`

### 8.4 Checkout Page Strukturu (Preply-clone)
- Sol: tutor kartı, trial lesson details, price breakdown
- Sağ: "Choose how to pay" (Card/Apple Pay/Google Pay tabs), Payriff card forması, "Book lesson and pay" CTA
- (Detallı: `dilup-master-plan.md` bölmə 6)

### 8.5 Gün 8 Gözlənilən Nəticə
- [ ] Payriff create-order + webhook tam işləyir
- [ ] Checkout page (Preply-clone struktur)
- [ ] Ödəniş təsdiqindən sonra booking/lesson yaranması
- [ ] tutor_payouts avtomatik trigger
- [ ] Admin payout idarəetməsi
- [ ] Error handling: failed payments

---

## GÜN 9 — ADMIN PANEL

(NATIVLY.md-dəki Gün 9 strukturu ilə demək olar eyni, fərq: abonəlik plan idarəetməsi YOXDUR, əvəzinə **komissiya faizi** idarəetməsi)

### 9.1 Admin Dashboard
- Stats, charts, pending tutor applications, active lessons

### 9.2-9.4 User/Tutor/Lesson Management
- (NATIVLY.md ilə eyni)

### 9.5 Payment Management (`/admin/payments`)
- Bütün payments tarixçəsi (Payriff)
- **Pending Tutor Payouts** siyahısı + "Ödə" button
- Komissiya gəliri analitikası (gross vs net)
- Refund management

### 9.6 Admin Settings
- **Platform komissiya faizi** dəyişdir (default 25%, tutor-a görə fərqli ola bilər)
- Cancellation policy settings
- Featured tutors
- Dil aktivləşdirmə (`languages.is_active` — "Coming Soon" idarəetməsi)

### 9.7 Gün 9 Gözlənilən Nəticə
- [ ] Admin dashboard, user/tutor/lesson management
- [ ] Payment/payout management
- [ ] Komissiya faizi tənzimləməsi
- [ ] Dil aktivləşdirmə paneli

---

## GÜN 10 — POLISH + SEO + TESTING + DEPLOY

(NATIVLY.md-dəki Gün 10 strukturu ilə eyni: performance, SEO, accessibility, security, testing, Vercel deploy)

### 10.1 Vercel Deploy
```bash
vercel --prod
# Domain: dilup.az (və ya seçilmiş domain)
```

### 10.2 Gün 10 Gözlənilən Nəticə
- [ ] Lighthouse 90+
- [ ] SEO tam optimized
- [ ] WCAG AA
- [ ] Security audit
- [ ] Production deploy (Vercel)
- [ ] Payriff webhook production URL yenilənib
- [ ] Supabase/Google OAuth redirect URLs yenilənib
- [ ] Full flow production-da test olunub

---

## CLAUDE CODE ÜÇÜN QAYDALAR

1. **Dil:** Kod/comments/variable adları İngiliscə. UI text-lər i18n (AZ/EN/RU).
2. **Type Safety:** Strict TypeScript, `any` yox.
3. **Error Handling:** Hər API call try/catch, toast ilə user-facing error.
4. **Loading/Empty States:** Hər data fetch üçün.
5. **Responsive:** Mobile-first (sm/md/lg/xl).
6. **Komponentlər:** Kiçik, təkrar istifadə edilən, typed props.
7. **API Routes:** Zod validation + auth check.
8. **Rəng:** Tailwind config-də **blue** əsas brand rəngi kimi təyin olunmalı (pink/magenta İSTİFADƏ OLUNMUR).
9. **Scope qadağaları:** For Business, Corporate training, AppStore/PlayStore səhifələri/komponentləri YARADILMASIN.
10. **Biznes modeli:** Abonəlik (subscription) MƏNTİQİ yaradılmasın — yalnız pay-per-lesson, tutor öz qiymətini təyin edir.
11. **Commits:** Hər gün sonunda working state.
12. **No shortcuts:** Production-ready kod, placeholder data yox.

---

## QEYD: Bu sənəd Claude Code-a veriləcək. Hər gün üçün belə de:

> "Bu gün Gün 1-dir. dilup-blueprint.md faylını oxu və Gün 1-in bütün tapşırıqlarını yerinə yetir."

Növbəti gün üçün:
> "Bu gün Gün 2-dir. dilup-blueprint.md → Gün 2 bölməsini oxu və tam yerinə yetir."

Tamamlayıcı sənəd: [dilup-master-plan.md](dilup-master-plan.md) — UI/UX struktur detalları, onboarding quiz tam sualları, komponent inventory.
