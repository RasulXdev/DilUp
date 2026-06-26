# DilUp — Platform Strukturu və Strategiya (Master Plan)

> Bu sənəd Preply.com-un strukturuna əsaslanaraq DilUp üçün hazırlanmış struktur, flow və komponent planını ehtiva edir.
> **Klonlanan:** struktur, flow, button yerləşməsi, komponent məntiqi.
> **Klonlanmayan:** rənglər, şəkillər, mətnlər, branding — bunlar DilUp-a unikaldır.

---

## 0. Əsas Qərarlar (Scope)

| Mövzu | Qərar |
|---|---|
| Platform növü | Yalnız **Web** (responsive) — mobile app gələcək faza |
| Əsas brand rəngi | **Mavi (Blue)** |
| UI interfeys dilləri | **English, Русский, Azərbaycanca** (saytın öz dili — selector ilə dəyişir) |
| Tədris olunan dillər | Başlanğıcda **English** aktiv; Spanish, French və s. → **"Coming Soon"** (tutor tapılana qədər) |
| For Business / Corporate training | **YOXDUR** — bu səviyyəyə hələ çatmamışıq, gələcəyin işidir |
| AppStore / PlayStore | **YOXDUR** — mobile app yoxdur |
| Tutor onboarding (Become a tutor) | Strukturu saxlanılır, lakin başlanğıcda prioritet deyil |
| Database/Backend | Supabase (MCP qoşulu, `dilup` adı ilə) |
| Deployment | Vercel + GitHub (`RasulXdev/DilUp`) |

---

## 1. Global Navigation (Header)

### Logged out:
- Logo (sol)
- Find tutors | Become a tutor | Proven Progress
- Language/Currency selector (dropdown, dil+valyuta birgə)
- Help icon (?)
- Log In (outline button)

### Logged in (student):
- Logo | Find tutors
- Refer a friend (button)
- Language/Currency selector
- Icon bar: Messages | Help (?) | Saved/Favorites (heart) | Notifications (bell) | Avatar (profil menu)

### Avatar dropdown menu:
- Home
- Messages
- My lessons
- Saved tutors
- Refer a friend
- Settings
- Help
- Log out

---

## 2. Homepage Strukturu

1. **Hero section**
   - Başlıq (value proposition)
   - CTA: "Find your tutor"
   - Hero görsəl/video

2. **Trust bar (stats)**
   - Experienced tutors sayı
   - 5-star reviews sayı
   - Subjects taught sayı
   - Tutor nationalities sayı
   - App rating

3. **Language/Subject grid**
   - Kart: dil adı + tutor sayı + ikon
   - "Show more" expand

4. **Social proof carousel**
   - Statistika kartları (dot navigation)
   - Study nəticələri ("X% of learners say...")

5. **"How it works" — 3 addım**
   - Step 1: Find your tutor (+ tutor kartı preview)
   - Step 2: Start learning (+ video call preview)
   - Step 3: Make progress every week (+ lifestyle görsəl)

6. **Guarantee banner**
   - Qısa başlıq + alt mətn

7. **Become a tutor CTA bloku**
   - Split layout: şəkil + mətn/bullet/CTA
   - CTA: "Become a tutor" + "How our platform works" link

8. **Footer**
   - Çoxsütunlu link grid: About us | For students | For tutors
   - SEO link blokları (Popular courses, Learn a language, Tutors near you)
   - Back-to-top button

---

## 3. Student Onboarding Quiz ("Get Started" Flow)

**Trigger:** Anonim istifadəçi "Find your tutor" CTA-na klikləyəndə başlayır (login tələb olunmadan).

**Layout:** Split-screen — sol illustrasiya (hər sualda dəyişir), sağ sual+cavab. Geri oxu sol yuxarı küncdə.

### Sual axını:

| # | Sual | Tip | Qeyd |
|---|---|---|---|
| 1 | What's your goal? | Single-select kart (ikonlu) | Career and business / Lessons for kids / Exams and course work / Culture, travel and hobby |
| 2 | By when do you want to achieve this goal? | Single-select siyahı | 1-4 weeks / 1-3 months / 3-6 months / As long as it takes / I just need one lesson |
| 3 | (adaptiv, goal=career-da) Which industry do you work in? | Single-select + "Show all" | Finance/Banking, Tech/IT, Healthcare, Education... |
| 4 | What's your job title or role? | Açıq mətn | Free text input |
| 5 | Which career-related skills do you most want to improve? | Multi-select pill | No preference / Workplace communication / Interview prep / Presentations / Professional writing / Building relationships / Industry-specific language |
| 6 | Any other topics you would like to focus on? | Multi-select pill (preselect var) | Business English / Conversational / Intensive / Beginners / American English |
| 7 | What's your level? | Single-select (sadə CEFR) | I'm just starting / I know the basics / I'm conversational / I'm fluent |
| 8 | What kind of teaching style works best for you? | Multi-select pill, **max 3** | Adaptable / Approachable / Encouraging / Engaging / Goal-Focused / Patient / Structured |
| 9 | What country would you like your tutor to be from? | Toggle (native speakers) + ölkə pill | **Geo-detected** — istifadəçinin ölkəsi birinci göstərilir |
| 10 | Other languages tutor should speak? | Multi-select pill | **Geo-lokalizə** olunmuş dil siyahısı |
| 11 | When can you take lessons? | 2 qrup multi-select | Days (Mon-Sun) + Times (Morning/Afternoon/Evening/Night, ikonlu) |
| 12 | What's your budget? | Dual-handle range slider | Min-Max, lokal valyuta |
| 13 | Interested in another language in the future? | Multi-select pill + "Skip for now" | Cross-sell sual — DilUp-da "Coming Soon" dillərlə əlaqəli istifadə oluna bilər |
| 14 | **Summary ekranı** — bütün cavablar chip şəklində + son açıq sual | Açıq mətn + "Skip and finish" | "Is there anything else..." |

**Keçid ekranı:** Quiz bitdikdən sonra loading animasiyası — fon rəngli, ortada dəyişən sözlər (şəxsiləşdirilmiş hiss).

**Konversiya nöqtəsi (registration wall):**
- Nəticələr **bulanıq** göstərilir tutor search səhifəsində
- Başlıq **dinamik** — quiz cavablarına görə generasiya olunur
- Modal: "Almost there! Sign up and see {dil} tutors that {fayda}"
  - Continue with Google
  - Continue with Facebook
  - "or sign up with email" + email input + Continue
  - Terms/Privacy linkləri
  - "Already have an account? Log in"

**Strateji məna:** "Value-first, sonra registration wall" funnel — istifadəçi əvvəlcə sərmayə qoyur (13 sual), sonra loss-aversion ilə qeydiyyata təhrik olunur.

---

## 4. Tutor Search / Listing Page

**Filter bar (sticky):**
- "I want to learn" — dil seçimi (silinə bilən tag)
- "Price per lesson" — range
- "Country of birth" — dropdown
- "I'm available" — vaxt dropdown
- 2-ci sıra: Specialties | Also speaks | Native speaker | Tutor categories (chip dropdown)
- Sort by dropdown
- Search by name/keyword input

**Promo banner:** Endirim bildirişi

**Tutor kartı:**
- Avatar (status dot — online indikatoru)
- Ad + verified badge + bayraq
- Tutor tipi (Professional/Community)
- Tədris dili
- Danışdığı dillər (level badge)
- Qısa bio (expand)
- Sosial sübut: "Popular. Booked X times recently"
- Sağda: qiymət (endirimli+striked), müddət, rating, tələbə/dərs sayı
- CTA: "Book trial lesson" (primary) + "Send message" (secondary)
- Heart/save icon
- Hover: video preview + "View full schedule" + "See profile"

---

## 5. Tutor Profile Page

**2 sütun: sol məzmun, sağ sticky booking kartı**

### Sol sütun:
1. Video intro
2. Başlıq: ad, peşə, ölkə+bayraq
3. Tagline/bio
4. "Professional Tutor" badge + izah
5. "Teaches" bölməsi
6. "About me" (expand/collapse)
7. "I speak" — dillər + level badge
8. **Lesson rating** — 4 metrik (Reassurance, Clarity, Progress, Preparation)
9. **"What my students say"** — overall rating + AI-generated summary badge + review kartları (avatar, ad, tarix, ulduz, mətn, "Show more", "Show original" tərcümə)
10. "Show all X reviews"
11. **Schedule** — həftəlik calendar grid, timezone selector, "View full schedule"

### Sağ sütun (sticky):
- Qiymət + müddət
- Rating + review sayı, dərs sayı
- "Book trial lesson" (primary)
- Icon button-lar: Message | Save | Share
- "Not a match?" — pulsuz trial qalığı
- "Popular" badge

---

## 6. Checkout / Booking Flow

**2 sütun**

### Sol sütun:
1. Tutor kartı (ad, rating, mini-stat grid: students/lessons/years)
2. Trial lesson details — tarix/saat, "Cancel/reschedule for free until..." bildirişi
3. Checkout info — müddət tab (25/50 min), qiymət breakdown (lesson price, processing fee, discount, **Total**), alt valyuta qeydi

### Sağ sütun:
1. "Choose how to pay" başlığı
2. Ödəniş tab: Card | Apple Pay | Google Pay
3. Card forması: nömrə, MM/YY, CVC
4. "Save this card" checkbox
5. CTA: "Book lesson and pay · {qiymət}"
6. Hüquqi mətn (Refund/Payment Policy, SSL qeydi)
7. Social proof bloku — review carousel

---

## 7. Become a Tutor (Onboarding Landing)

1. **Hero**
   - Başlıq + 3 addımlı stepper: Sign up → Get approved → Start earning
   - CTA: "Create a tutor profile now"
   - Hero görsəl

2. **Feature 3 sütun**
   - "Set your own rate"
   - "Teach anytime, anywhere"
   - "Grow professionally"

---

## 8. Component Inventory

| Komponent | İstifadə yeri | Qeyd |
|---|---|---|
| Primary button (solid, dark) | Hero CTA | Əsas aksiya |
| Primary button (accent color) | "Book trial lesson", checkout CTA | Konversiya nöqtələri |
| Secondary button (outline) | "Send message", "Log In" | İkinci dərəcəli |
| Filter dropdown/chip | Search bar | Bağlana bilən tag |
| Rating badge | Tutor kartı, profil | ★ + rəqəm |
| Status dot | Avatar üzərində | Online indikator |
| Stat mini-grid | Tutor kartı, profil, checkout | İkon+rəqəm+label |
| Review kartı | Profil, checkout | Avatar, ad, tarix, ulduz, mətn |
| AI summary badge | Review bölməsi | Şəffaflıq etiketi |
| Weekly schedule grid | Profil | Gün sütunu + saat slot, timezone dropdown |
| Sticky booking sidebar | Profil, checkout | Scroll zamanı sabit |
| Progress stepper (1-2-3) | Onboarding (tutor) | Nömrəli kvadrat+başlıq |
| Promo/discount banner | Search, hero | İkon+mətn |
| Carousel (dot/arrow nav) | Social proof, reviews | Horizontal sürüşmə |
| Avatar dropdown menu | Header | Profil aksiyaları |
| Onboarding split-screen | Get-started quiz | Sol illustrasiya + sağ sual |
| Single/multi-select pill | Quiz sualları | "Show all" expand variantı |
| Geo-adaptiv seçim | Quiz | IP-yə görə avtomatik uyğunlaşma |
| Adaptiv sual axını | Quiz | Branching logic |
| Summary/recap ekranı | Quiz sonu | Chip şəklində vizual yekun |
| Personalized headline | Paywall modal | Dinamik mətn |
| Registration wall modal | Quiz sonu | Bulanıq fon + social/email signup |

---

## 9. Texniki Stack (Hazır Qurulmuş)

- **Frontend:** Next.js (TypeScript, Tailwind CSS, App Router)
- **Backend/DB:** Supabase (MCP server: `dilup`)
- **Hosting:** Vercel
- **Repo:** GitHub — `RasulXdev/DilUp`
- **Env vars:** Vercel Dashboard-da idarə olunur (Supabase inteqrasiyası daxil)

---

## 10. Növbəti Addımlar

1. Rəng paletası tam müəyyənləşdirmə (mavi tonları, accent rəng)
2. Tipografiya seçimi (font ailəsi)
3. Icon set seçimi (aşağıda tövsiyələr)
4. Database schema dizaynı (users, tutors, lessons, bookings, reviews)
5. Səhifə-səhifə komponent qurulması (homepage → search → profile → checkout)
6. i18n (3 dil) strukturunun qurulması

---

## 11. Icon/Illustration Mənbələri (Tövsiyə)

Preply-nin öz icon/illustration sisteminə girişim yoxdur (yalnız ekran görüntüləri analiz olunub). DilUp üçün açıq mənbə alternativləri:

- **İkonlar:** Lucide Icons, Phosphor Icons, Tabler Icons, Heroicons (hamısı pulsuz, React/Next.js ilə asan inteqrasiya)
- **İllüstrasiyalar:** unDraw, Storyset, Humaaans, ouch.pics (pulsuz, rəng tənzimlənə bilən SVG-lər)
- **Bayraqlar:** flag-icons (npm paketi, ölkə bayraqları üçün)
