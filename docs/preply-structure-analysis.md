# Preply Structure Analysis → DilUp Reference

> Bu sənəd Preply.com-un strukturunu, flow-larını və UI komponentlərini sənədləşdirir.
> Məqsəd: DilUp üçün eyni strukturu, fərqli dizayn (rəng, şəkil, mətn) ilə qurmaq.
> **QEYD:** Pink/magenta rəng paletası DilUp-da istifadə OLUNMAYACAQ.
> **QEYD:** For Business, AppStore/PlayStore linkləri DilUp-da OLMAYACAQ (yalnız web).

---

## 1. Global Navigation (Header)

**Logged out:**
- Logo (sol)
- Find tutors | For business | Become a tutor | Proven Progress
- Language/Currency selector (sağ) — dropdown (dil + valyuta birgə)
- Help (icon, "?")
- Log In (button, outline style)

**Logged in (student):**
- Logo | Find tutors ~~| Corporate training~~ (DilUp-da YOXDUR)
- Refer a friend (button)
- Language/Currency selector
- Icon bar: Messages (chat icon) | Help (?) | Saved/Favorites (heart) | Notifications (bell) | Avatar (profil menu)

**Avatar dropdown menu:**
- Home
- Messages
- My lessons
- Saved tutors
- Refer a friend
- Settings
- Help
- Log out

---

## 2. Homepage Structure (Anonim/Student)

1. **Hero section**
   - Başlıq (value proposition)
   - CTA button: "Find your tutor"
   - Hero görsəl/video (tutor-student kompozisiya)

2. **Trust bar (stats)**
   - Experienced tutors sayı
   - 5-star reviews sayı
   - Subjects taught sayı
   - Tutor nationalities sayı
   - App rating (★ 4.8)

3. **Language/Subject grid**
   - Kart şəklində dillər: ad + tutor sayı + ikon
   - "Show more" ilə genişlənmə

4. **Social proof carousel**
   - Statistika kartı (carousel, dot navigation)
   - "X% of learners say..." tipli study nəticələri

5. **"How it works" — 3 addım**
   - Step 1: Find your tutor (+ tutor kartı preview)
   - Step 2: Start learning (+ video call preview)
   - Step 3: Make progress every week (+ lifestyle görsəl)

6. **Guarantee banner**
   - Qısa başlıq + alt mətn (məs: "Try another tutor for free if you're not satisfied")

7. **Become a tutor CTA bloku**
   - Split layout: şəkil (sol) + mətn/bullet list/CTA (sağ)
   - Bullet points (məs: "Get paid securely")
   - CTA: "Become a tutor" + "How our platform works" link

8. **Footer**
   - Çoxsütunlu link grid: About us | For students | For tutors | For companies
   - SEO link blokları (Popular courses, Learn a language, Tutors near you, Global domains)
   - Back-to-top button

---

## 3. Tutor Search / Listing Page

**URL pattern:** `/online/{language}-tutors`

**Filter bar (üst, sticky):**
- "I want to learn" — dil seçimi (dropdown, silinə bilən tag)
- "Price per lesson" — range slider/dropdown
- "Country of birth" — dropdown
- "I'm available" — vaxt dropdown
- İkinci sıra: Specialties | Also speaks | Native speaker | Tutor categories (hamısı dropdown chip)
- Sort by dropdown (sağda)
- Search by name/keyword (input, sağ kənar)

**Promo banner:** Endirim bildirişi (ikon + mətn, sadə background)

**Tutor kartı (list item):**
- Avatar foto (sol, status dot — online indikatoru)
- Ad + verified badge + bayraq (ölkə)
- Tutor tipi (Professional/Community)
- Tədris etdiyi dil
- Danışdığı dillər (Native/level badge-ləri)
- Qısa bio (2-3 sətir, "Learn more" expand)
- Sosial sübut: "Popular. Booked X times recently"
- Sağ tərəf: Qiymət (endirimli + striked original), lesson müddəti, rating (★ + review sayı), tələbə sayı, dərs sayı
- CTA-lar: "Book trial lesson" (primary) + "Send message" (secondary)
- Heart/save icon (sağ yuxarı künc)
- Hover zamanı: video preview kartı + "View full schedule" + "See profile" linkləri

---

## 4. Tutor Profile Page

**URL pattern:** `/tutor/{id}`

**Layout: 2 sütun (məzmun sol, sticky booking kartı sağ)**

### Sol sütun:
1. Video intro (player, play button overlay)
2. Tutor başlığı: Ad, peşə (English tutor), mənşə ölkəsi + bayraq
3. Qısa tagline/bio
4. "Professional Tutor" badge + izah + "Learn more" link
5. "Teaches" bölməsi — dərs növləri
6. "About me" — uzun bio (expand/collapse)
7. "I speak" — dillər + səviyyə badge-ləri
8. **Lesson rating** — 4 metrik kart (Reassurance, Clarity, Progress, Preparation) + anonim review sayı
9. **"What my students say"** — overall rating + AI-generated review summary (badge: "AI generated") + individual review kartları (avatar, ad, tarix, ulduz, mətn, "Show more", "Show original" tərcümə)
10. "Show all X reviews" button
11. **Schedule** — həftəlik calendar grid (gün başlıqları + saat slotları, timezone selector), "View full schedule"

### Sağ sütun (sticky booking widget):
- Qiymət (endirimli + striked) + lesson müddəti
- Rating + review sayı, dərs sayı
- "Book trial lesson" (primary CTA, böyük)
- İkinci sıra icon button-lar: Message | Save (heart) | Share
- "Not a match?" bildirişi — pulsuz trial sayı qalığı
- "Popular" badge — son bookings statistikası

---

## 5. Checkout / Booking Flow

**URL pattern:** `/checkout/{id}?hours=N`

**Layout: 2 sütun**

### Sol sütun:
1. **Tutor kartı** — ad, rating, review sayı, avatar; statistik mini-grid (students, lessons, years teaching)
2. **Trial lesson details** — tarix/saat kartı (ay qısaldması + gün rəqəmi vizual blok), "Cancel or reschedule for free until..." bildirişi
3. **Checkout info** — Müddət seçici (tab: 25 mins / 50 mins, hər birinin qiyməti görünür)
   - Qiymət breakdown: Lesson price, Processing fee, Discount (mənfi), **Total**
   - Alt qeyd: alternativ valyutada məbləğ ("charged as $X")

### Sağ sütun:
1. **"Choose how to pay"** başlığı
2. Ödəniş metodu seçici tab-lar: Card | Apple Pay | Google Pay
3. Card forması: kart nömrəsi, MM/YY, CVC
4. "Save this card for future payments" checkbox
5. Primary CTA: "Book lesson and pay · {qiymət}"
6. Hüquqi mətn: Refund/Payment Policy link, SSL/security qeydi
7. **Social proof bloku** — "Tutor is a great choice" + review carousel (sol/sağ ox naviqasiyası)

---

## 5.5. Student Onboarding Quiz (Get Started Flow)

**URL pattern:** `/get-started?subject={lang}&source=...`

**Trigger:** Anonim istifadəçi "Find your tutor" CTA-na klikləyəndə başlayır (login tələb olunmadan).

**Layout:** Split-screen — sol tərəf illustrasiya (statik, hər sualda dəyişir), sağ tərəf sual + cavab seçimləri. Sol yuxarı küncdə "back" oxu. Progress bar göstərilmir (addım sayı qeyri-müəyyəndir), amma hər sualdan sonra avtomatik keçid var (bəzi sual tiplərində auto-advance, bəzilərində "Continue" düyməsi).

**Sual axını (real nümunə, "Career and business" qolu):**

| # | Sual | Tip | Seçimlər |
|---|---|---|---|
| 1 | What's your goal? | Single-select kart (ikonlu) | Career and business / Lessons for kids / Exams and course work / Culture, travel and hobby |
| 2 | By when do you want to achieve this goal? | Single-select siyahı | 1-4 weeks / 1-3 months / 3-6 months / As long as it takes / I just need one lesson |
| 3 | Which industry do you work in? *(yalnız goal=career-da görünür — adaptiv)* | Single-select + "Show all industries" | Finance/Banking, Technology/IT, Healthcare, Education, ... |
| 4 | What's your job title or role? | Açıq mətn (textarea, placeholder nümunələri ilə) | Free text |
| 5 | Which career-related skills do you most want to improve? | Multi-select pill | No preference / Workplace communication / Interview preparation / Presentations / Professional writing / Building relationships / Industry-specific language |
| 6 | Any other topics you would like to focus on? | Multi-select pill (öncədən seçilmiş variant var) | Business English (preselect) / Conversational English / Intensive English / English for beginners / American English / "Show all" |
| 7 | What's your English level? | Single-select siyahı (sadələşdirilmiş CEFR) | I'm just starting / I know the basics / I'm conversational / I'm fluent |
| 8 | What kind of teaching style works best for you? | Multi-select pill, **max 3** | Adaptable / Approachable / Encouraging / Engaging / Goal-Focused / Patient / Structured / No preference |
| 9 | What country would you like your tutor to be from? | Toggle ("Only native speakers") + ölkə pill-ləri | Any country + **geo-detected** ölkə (istifadəçinin IP-sinə görə, məs. Azerbaijan birinci göstərilir) + populyar ölkələr |
| 10 | Are there any other languages you'd like your tutor to speak? | Multi-select pill | No preference + **geo-lokalizə olunmuş dillər** (məs. Azerbaijani, Russian, Turkish) |
| 11 | When can you take lessons? | İki qrup multi-select pill | Days: Mon-Sun. Times: Morning / Afternoon / Evening / Night (ikonlu) |
| 12 | What's your budget? | Dual-handle range slider | Min-Max qiymət (lokal valyutada, 50-min lesson üzrə) |
| 13 | Are you interested in learning another subject in the future? | Multi-select pill + "Skip for now" | Spanish, French, German, Japanese, Italian, Korean, Arabic, Chinese... + "Show all" |
| 14 (yekun) | **Summary ekranı**: bütün cavablar pill/chip şəklində sol paneldə göstərilir + son açıq sual: "Is there anything else that could help us find your perfect tutor?" | Açıq mətn + "Skip and finish" | Free text (optional) |

**Keçid ekranı:** Quiz bitdikdən sonra qısa loading animasiyası — fon rəngli, ortada dəyişən sözlər (məs. "Finding tutors who will **motivate** you" → "**support**" → ...) — şəxsiləşdirilmiş hiss yaradır.

**Konversiya nöqtəsi (paywall):**
- Quiz nəticəsində istifadəçi avtomatik **tutor search səhifəsinə** yönləndirilir, lakin nəticələr **bulanıq/gizli** göstərilir
- Başlıq **dinamik şəkildə** quiz cavablarına görə dəyişir (məs: "English tutors that help you develop professionally" — goal=career cavabına görə)
- Filtrlər avtomatik tutor axtarış URL-inə inteqrasiya olunur (vaxt, mövzu tag-ları və s.)
- Üzərində **modal** açılır: "Almost there! Sign up and see {dil} tutors that {şəxsiləşdirilmiş fayda}"
  - Continue with Google (icon button)
  - Continue with Facebook (icon button)
  - "or sign up with email" ayırıcısı
  - Email input + "Continue" button (primary)
  - Hüquqi mətn: Terms of Use, Subscription Terms, Privacy Policy linkləri
  - "Already have a Preply account? Log in" (alt seçim)

**Strateji məna:** Bu, klassik **"value-first, sonra registration wall"** funnel-idir — istifadəçi əvvəlcə şəxsi sərmayə qoyur (13 sual cavablandırır, nəticə görür), sonra "itirmə qorxusu" (loss aversion) ilə qeydiyyatdan keçməyə təhrik olunur.

---

## 6. Become a Tutor (Onboarding Landing)

**URL pattern:** `/teach`

1. **Hero**
   - Başlıq (value prop tutor üçün)
   - 3 addımlı progress indicator: Sign up → Get approved → Start earning (hər addımda nömrə + qısa izah)
   - CTA: "Create a tutor profile now"
   - Hero görsəl (tutor video-call görüntüsü)

2. **Feature 3 sütun**
   - "Set your own rate" + izah
   - "Teach anytime, anywhere" + izah
   - "Grow professionally" + izah

3. (Davamında, görülməyib amma tipik Preply strukturu): FAQ, testimonials, tutor uğur hekayələri, son CTA

---

## 7. Əsas UI Pattern-lər (Component Inventory)

| Komponent | İstifadə yeri | Qeyd |
|---|---|---|
| Primary button (solid, dark) | Hero CTA, "Find your tutor" | Əsas aksiya |
| Primary button (accent color) | "Book trial lesson", "Book lesson and pay" | Pulsuz/ödənişli konversiya nöqtələri |
| Secondary button (outline) | "Send message", "Log In" | İkinci dərəcəli aksiya |
| Filter dropdown/chip | Tutor search bar | Çoxsaylı filter, bağlana bilən tag |
| Rating badge | Tutor kartı, profil | ★ + rəqəm |
| Status dot | Avatar üzərində | Online/offline indikator |
| Stat mini-grid | Tutor kartı, profil, checkout | İkon + rəqəm + label, 3-4 sütun |
| Review kartı | Profil, checkout | Avatar/inisial, ad, tarix, ulduz, mətn, "Show more" |
| AI summary badge | Review bölməsi | "AI generated" etiketi ilə şəffaflıq |
| Weekly schedule grid | Profil | Gün sütunları + saat slot linkləri, timezone dropdown |
| Sticky booking sidebar | Profil, checkout | Scroll zamanı sabit qalır |
| Progress stepper (1-2-3) | Onboarding | Nömrəli kvadrat + başlıq + izah |
| Promo/discount banner | Search page, hero | İkon + qısa mətn, fərqli background |
| Carousel (dot/arrow nav) | Social proof, reviews | Horizontal sürüşmə |
| Avatar dropdown menu | Header | Profil aksiyaları siyahısı |
| Onboarding split-screen | Get-started quiz | Sol illustrasiya (statik) + sağ sual/cavab, geri oxu |
| Single/multi-select pill | Quiz sualları | Dəyişən say (1, 3, sərhədsiz), bəzən "Show all" expand |
| Geo-adaptiv seçim | Quiz (ölkə/dil sualları) | İstifadəçinin IP-sinə görə avtomatik uyğun seçim irəli çıxır |
| Adaptiv sual axını | Quiz | Əvvəlki cavaba görə sonrakı sualın məzmunu dəyişir (branching logic) |
| Summary/recap ekranı | Quiz son addımı | Bütün cavablar chip şəklində vizual yekun |
| Personalized headline | Quiz sonu, paywall modal | Dinamik mətn, quiz cavablarına görə generasiya olunur |
| Registration wall modal | Quiz sonu | Bulanıq nəticə fonu + sosial login/email sign-up |

---

## 8. DilUp üçün Uyğunlaşdırma Qeydləri

- ✅ Struktur, flow, button yerləşməsi → **eyni**
- ❌ Pink/magenta rəng → **istifadə olunmayacaq**, yeni rəng paletası seçiləcək
- ❌ Şəkillər, mətnlər, branding → **unikal**, DilUp-a məxsus
- ❌ For Business, Corporate training, AppStore/PlayStore bölmələri → **yoxdur**
- ✅ Dil interfeysi: English / Русский / Azərbaycanca (UI səviyyəsində)
- ⏳ Tutoring languages (Spanish, French, etc.) → "Coming Soon" (tutor tapılana qədər)
- ✅ Sayt yalnız **web** (responsive), mobile app yoxdur (gələcək faza)
- ✅ **Əsas brand rəngi: Mavi** (qərar verildi — Preply-nin pink/magenta-sından fərqli, etibar/peşəkarlıq hissi)
- ✅ Onboarding quiz strukturu **eyni məntiqlə** qurulacaq (13 sual, adaptiv axın, geo-lokalizasiya, summary + registration wall) — DilUp-a uyğun sual mətnləri ilə
