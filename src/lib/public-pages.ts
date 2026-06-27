import type { IconKey } from "@/components/public/sections/icons";

export type PublicPageSlug =
  | "about"
  | "how-it-works"
  | "faq"
  | "privacy"
  | "terms"
  | "contact";

type Stat = { value: string; label: string };
type ValueItem = { icon: IconKey; title: string; body: string };
type StoryRow = {
  eyebrow?: string;
  title: string;
  body: string;
  bullets?: string[];
  image: string;
};
type Step = { title: string; body: string };
type FaqItem = { q: string; a: string };
type FaqGroup = { title?: string; items: FaqItem[] };
type LegalSection = { id: string; title: string; body: string[] };
type ContactMethod = {
  icon: IconKey;
  title: string;
  value: string;
  href?: string;
};

export type AboutContent = {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  stats: Stat[];
  story: StoryRow[];
  valuesEyebrow: string;
  valuesTitle: string;
  values: ValueItem[];
};

export type HowItWorksContent = {
  eyebrow: string;
  title: string;
  description: string;
  tutorEyebrow: string;
  tutorTitle: string;
  tutorDescription: string;
  studentStepsEyebrow: string;
  studentStepsTitle: string;
  studentSteps: Step[];
  tutorStepsEyebrow: string;
  tutorStepsTitle: string;
  tutorSteps: Step[];
  valuesEyebrow: string;
  valuesTitle: string;
  values: ValueItem[];
  tutorValuesEyebrow: string;
  tutorValuesTitle: string;
  tutorValues: ValueItem[];
  faq: FaqItem[];
  tutorFaq: FaqItem[];
};

export type FaqContent = {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  groups: FaqGroup[];
};

export type ContactContent = {
  eyebrow: string;
  title: string;
  description: string;
  email: string;
  methods: ContactMethod[];
  formTitle: string;
};

export type LegalContent = {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
};

type SiteContent = {
  about: AboutContent;
  "how-it-works": HowItWorksContent;
  faq: FaqContent;
  contact: ContactContent;
  privacy: LegalContent;
  terms: LegalContent;
};

const ABOUT_HERO = "/images/footer/dilup-about-hero.jpg";
const ABOUT_STORY_1 = "/images/footer/dilup-about-story-focus.jpg";
const ABOUT_STORY_2 = "/images/footer/dilup-about-story-marketplace.jpg";
const FAQ_HERO = "/images/footer/dilup-about-hero.jpg";

const content: Record<string, SiteContent> = {
  az: {
    about: {
      eyebrow: "DilUp haqqında",
      title: "Dil öyrənmək üçün yerli, sadə və etibarlı yol.",
      description:
        "DilUp Azərbaycan üçün qurulmuş online dil marketplace-idir. Burada tələbə abunəlik almır — məqsədinə, səviyyəsinə və büdcəsinə uyğun müəllimi özü seçir, yalnız keçdiyi dərsə görə ödəyir və ilk dərsdən danışmağa başlayır.",
      heroImage: ABOUT_HERO,
      stats: [
        { value: "1:1", label: "Canlı video dərslər" },
        { value: "0", label: "Abunəlik — yalnız dərsə görə ödəniş" },
        { value: "3", label: "İnterfeys dili (AZ · EN · RU)" },
      ],
      story: [
        {
          eyebrow: "Missiyamız",
          title: "Dil öyrənməyi əlçatan və şəffaf etmək.",
          body: "Çoxlu kurs bahalı paketlər satır, amma nəticəyə zəmanət vermir. Biz əksini edirik: qiymət açıqdır, müəllimi sən seçirsən və hər dərsin dəyərini öncədən görürsən.",
          bullets: [
            "Gizli ödəniş yoxdur — qiyməti müəllim açıq göstərir",
            "Bəyənmədiyin trial dərsi pulsuz dəyiş",
            "Bütün ödənişlər manatla, yerli kartlarla",
          ],
          image: ABOUT_STORY_1,
        },
        {
          eyebrow: "Necə fərqlənirik",
          title: "Marketplace — kurs deyil.",
          body: "DilUp tələbə ilə müəllimi birbaşa birləşdirir. Müəllim öz qiymətini təyin edir, sən isə profilini, rəylərini və videosunu görüb qərar verirsən. Aradakı vasitəçi yox, real insan var.",
          bullets: [
            "Müəllim profilləri: video, rəylər, cədvəl",
            "Səviyyənə uyğun şəxsi plan",
            "İstədiyin vaxt dərs — sənin saat qurşağına görə",
          ],
          image: ABOUT_STORY_2,
        },
      ],
      valuesEyebrow: "Dəyərlərimiz",
      valuesTitle: "Hər qərarımızın arxasında duran prinsiplər.",
      values: [
        {
          icon: "wallet",
          title: "Şəffaf qiymət",
          body: "Hər dərsin qiyməti öncədən görünür. Abunəlik tələsi yoxdur.",
        },
        {
          icon: "users",
          title: "Real müəllimlər",
          body: "Hər profil video, rəy və cədvəllə təsdiqlənir.",
        },
        {
          icon: "mapPin",
          title: "Azərbaycan üçün",
          body: "Manatla ödəniş, yerli kartlar və tanış interfeys.",
        },
        {
          icon: "target",
          title: "Nəticə yönümlü",
          body: "Hər dərs sənin konkret məqsədinə doğru bir addımdır.",
        },
      ],
    },
    "how-it-works": {
      eyebrow: "Necə işləyir",
      title: "Müəllimini seç, vaxtını planla, danışmağa başla.",
      description:
        "DilUp-da uyğun müəllim tapmaq üç sadə addımdır. Heç bir uzun qeydiyyat və ya abunəlik tələb olunmur — birbaşa trial dərslə başlaya bilərsən.",
      tutorEyebrow: "Müəllimlər üçün",
      tutorTitle: "Profilini qur, tələbələrə görün, dərs keçərək qazan.",
      tutorDescription:
        "DilUp-da müəllim kimi proses sadədir: profilini hazırlayırsan, təsdiqdən keçirsən və tələbələr səni bron etdikcə canlı dərslərdən qazanc əldə edirsən.",
      studentStepsEyebrow: "Tələbə üçün üç addım",
      studentStepsTitle: "Öyrənmə yolun",
      studentSteps: [
        {
          title: "1. Məqsədini seç",
          body: "Qısa onboarding suallarına cavab ver — sənin üçün ən uyğun müəllim siyahısı formalaşsın.",
        },
        {
          title: "2. Müəllimləri müqayisə et",
          body: "Qiymət, təcrübə, danışdığı dillər və boş vaxtlara baxıb əminliklə seç.",
        },
        {
          title: "3. Dərsə başla",
          body: "Trial dərs bron et, məqsədini bölüş və davam etmək istədiyin müəllimlə plan qur.",
        },
      ],
      tutorStepsEyebrow: "Müəllim üçün üç addım",
      tutorStepsTitle: "Qazanc yolunuz",
      tutorSteps: [
        {
          title: "1. Profil yarat",
          body: "Haqqında, dillər, təcrübə, video təqdimat və qiymət — profilin sənin tədris üslubunu göstərsin.",
        },
        {
          title: "2. Tələbə tap",
          body: "Profilini nəzərdən keçiririk və təsdiqləyirik — sonra tələbələr səni görüb seçir.",
        },
        {
          title: "3. Qazanc et",
          body: "Hər dərs bitdikdə haqqını al — heç bir abunəlik yoxdur, yalnız real dərslər.",
        },
      ],
      valuesEyebrow: "Nə əldə edirsən",
      valuesTitle: "Hər dərslə birlikdə.",
      values: [
        {
          icon: "video",
          title: "Canlı video dərs",
          body: "Birbaşa brauzerdə, 1:1 müəllimlə real söhbət.",
        },
        {
          icon: "calendar",
          title: "Çevik cədvəl",
          body: "Vaxtı özün seçirsən, istənilən vaxt yenidən planla.",
        },
        {
          icon: "message",
          title: "Müəllimlə əlaqə",
          body: "Dərsdən əvvəl və sonra mesajla razılaş.",
        },
        {
          icon: "shield",
          title: "Risksiz başlanğıc",
          body: "Bəyənmədiyin trial dərsi pulsuz dəyiş.",
        },
      ],
      tutorValuesEyebrow: "Müəllim kimi nə əldə edirsən",
      tutorValuesTitle: "Hər dərsdə nəzarət və şəffaf qazanc.",
      tutorValues: [
        {
          icon: "wallet",
          title: "Qiymət sənin əlində",
          body: "Dərs qiymətini özün təyin edirsən və profilində açıq göstərirsən.",
        },
        {
          icon: "calendar",
          title: "Cədvəli sən seçirsən",
          body: "Uyğun saatlarını əlavə et, dərsləri öz ritminə görə planla.",
        },
        {
          icon: "users",
          title: "Uyğun tələbələr",
          body: "Tələbələr məqsəd, büdcə və vaxtına görə səni tapıb bron edir.",
        },
        {
          icon: "shield",
          title: "Təhlükəsiz proses",
          body: "Profil təsdiqi, bron axını və ödəniş qaydaları platforma daxilində idarə olunur.",
        },
      ],
      faq: [
        {
          q: "Trial dərs nədir?",
          a: "Müəllimin üslubunu yoxlamaq və məqsədlərini bölüşmək üçün ilk, çox vaxt endirimli dərsdir.",
        },
        {
          q: "Abunəlik almalıyam?",
          a: "Xeyr. DilUp pay-per-lesson modelidir — yalnız keçdiyin dərsə görə ödəyirsən.",
        },
        {
          q: "Müəllimi dəyişə bilərəm?",
          a: "Bəli. İstənilən vaxt başqa müəllimlə trial dərs bron edə bilərsən.",
        },
      ],
      tutorFaq: [
        {
          q: "Müəllim kimi necə qoşuluram?",
          a: "Müəllim profili yaradırsan, təcrübəni, dillərini, video təqdimatını və qiymətini əlavə edirsən. Komanda profili təsdiqlədikdən sonra tələbələr səni görə bilir.",
        },
        {
          q: "Dərs qiymətini kim təyin edir?",
          a: "Qiyməti sən təyin edirsən. Platforma hər dərsdən komissiya tutur, qalan məbləğ sənə çatır.",
        },
        {
          q: "Nə vaxt dərs verə bilərəm?",
          a: "Cədvəl tam sənin əlindədir. Uyğun saatlarını açırsan, tələbələr həmin vaxtlara bron edir.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Ən çox verilən suallar.",
      description:
        "Dərs modeli, ödəniş, müəllim seçimi və hesab haqqında qısa və aydın cavablar. Sualına cavab tapmasan, bizə yaz.",
      heroImage: FAQ_HERO,
      groups: [
        {
          title: "Dərslər",
          items: [
            {
              q: "Dərslər necə keçirilir?",
              a: "Bütün dərslər canlı, 1:1 video zəng formatında, birbaşa brauzerdə keçirilir. Əlavə proqram quraşdırmaq lazım deyil.",
            },
            {
              q: "Dərs nə qədər davam edir?",
              a: "Müəllimdən asılı olaraq adətən 25 və ya 50 dəqiqə. Bron edərkən müddəti seçirsən.",
            },
            {
              q: "Trial dərs nə üçündür?",
              a: "Trial dərs müəllimin üslubunu yoxlamaq və öyrənmə məqsədlərini bölüşmək üçündür. Bəyənməsən, pulsuz başqa müəllimə keç.",
            },
          ],
        },
        {
          title: "Ödəniş",
          items: [
            {
              q: "Abunəlik varmı?",
              a: "Xeyr. DilUp pay-per-lesson modelidir — yalnız keçdiyin dərsə görə ödəyirsən. Aylıq paket yoxdur.",
            },
            {
              q: "Qiyməti kim təyin edir?",
              a: "Hər müəllim öz dərs qiymətini özü təyin edir və profilində açıq göstərir.",
            },
            {
              q: "Hansı valyuta və kartlar?",
              a: "Ödənişlər manatla (AZN), yerli kartlarla aparılır.",
            },
          ],
        },
        {
          title: "Müəllimlər",
          items: [
            {
              q: "Müəllimləri necə seçim?",
              a: "Qiymət, təcrübə, danışdığı dillər, rəylər və boş vaxtlara görə filtr edə bilərsən.",
            },
            {
              q: "Müəllim kimi qoşula bilərəm?",
              a: "Bəli. “Müəllim ol” səhifəsindən müraciət et, profilini qur və qiymətini özün təyin et.",
            },
          ],
        },
        {
          title: "Hesab və dillər",
          items: [
            {
              q: "Hansı dillər var?",
              a: "İlk mərhələdə İngilis dili aktivdir. Digər dillər müəllimlər qoşuldukca mərhələli əlavə olunur.",
            },
            {
              q: "İnterfeys dilini dəyişə bilərəm?",
              a: "Bəli — sayt Azərbaycan, İngilis və Rus dillərində işləyir, yuxarıdakı seçicidən dəyiş.",
            },
          ],
        },
      ],
    },
    contact: {
      eyebrow: "Əlaqə",
      title: "DilUp komandası ilə danış.",
      description:
        "Sualın, təklifin və ya müəllim kimi qoşulmaq istəyin var? Formu doldur və ya birbaşa yaz — iş günlərində tez cavab veririk.",
      email: "hello@dilup.az",
      methods: [
        {
          icon: "mail",
          title: "Email",
          value: "hello@dilup.az",
          href: "mailto:hello@dilup.az",
        },
        {
          icon: "clock",
          title: "Cavab müddəti",
          value: "İş günlərində mümkün qədər tez",
        },
        {
          icon: "graduation",
          title: "Müəllim olmaq",
          value: "Müraciət üçün “Müəllim ol” səhifəsi",
          href: "/become-tutor",
        },
      ],
      formTitle: "Bizə mesaj yaz",
    },
    privacy: {
      eyebrow: "Məxfilik",
      title: "Məlumatlarınla məsuliyyətli davranırıq.",
      description:
        "Bu siyasət DilUp-un hansı məlumatları topladığını, niyə topladığını və onları necə qoruduğunu izah edir.",
      updated: "Son yenilənmə: 2026",
      sections: [
        {
          id: "collect",
          title: "Topladığımız məlumatlar",
          body: [
            "Hesab məlumatları (ad, email), onboarding cavabları, dərs bronları və platformadan istifadə ilə bağlı texniki məlumatlar saxlanıla bilər.",
            "Ödəniş kart məlumatlarını biz saxlamırıq — onlar ödəniş provayderi tərəfindən təhlükəsiz emal olunur.",
          ],
        },
        {
          id: "use",
          title: "Məlumatlardan istifadə",
          body: [
            "Məlumatlar uyğun müəllimləri göstərmək, hesabını qorumaq, dərsləri planlaşdırmaq və xidmət keyfiyyətini artırmaq üçün istifadə olunur.",
            "Sənin razılığın olmadan məlumatlarını reklam məqsədilə üçüncü tərəflərə satmırıq.",
          ],
        },
        {
          id: "rights",
          title: "Hüquqların",
          body: [
            "İstənilən vaxt hesab məlumatlarını görmək, düzəltmək və ya silinməsini tələb etmək hüququn var.",
            "Bunun üçün hello@dilup.az ünvanına yaza bilərsən.",
          ],
        },
        {
          id: "contact",
          title: "Əlaqə",
          body: [
            "Məxfiliklə bağlı suallar üçün hello@dilup.az ünvanına müraciət et.",
          ],
        },
      ],
    },
    terms: {
      eyebrow: "Şərtlər",
      title: "DilUp istifadə şərtləri.",
      description:
        "Platformadan istifadə edərkən tələbə və müəllimlərin qəbul etdiyi əsas qaydalar.",
      updated: "Son yenilənmə: 2026",
      sections: [
        {
          id: "model",
          title: "Marketplace modeli",
          body: [
            "DilUp müəllim və tələbələri birləşdirən platformadır. Dərs qiymətini müəllim özü təyin edir; platforma hər dərsdən komissiya alır.",
            "Dərslər müəllim və tələbə arasında birbaşa razılaşma əsasında keçirilir.",
          ],
        },
        {
          id: "bookings",
          title: "Bron və ödəniş",
          body: [
            "Dərs bron edildikdə ödəniş tutulur və müvafiq dərs yaradılır.",
            "Ləğv və geri ödəniş qaydaları ləğvin dərsə neçə saat qalmış edilməsindən asılıdır.",
          ],
        },
        {
          id: "conduct",
          title: "İstifadəçi davranışı",
          body: [
            "İstifadəçilər bir-birinə hörmətlə yanaşmalı və platformadan qanuni məqsədlərlə istifadə etməlidir.",
            "Qaydaların pozulması hesabın dayandırılması ilə nəticələnə bilər.",
          ],
        },
        {
          id: "changes",
          title: "Dəyişikliklər",
          body: [
            "Məhsul inkişaf etdikcə bu şərtlər yenilənə bilər. Əhəmiyyətli dəyişikliklər barədə məlumatlandırılacaqsan.",
          ],
        },
      ],
    },
  },
  en: {
    about: {
      eyebrow: "About DilUp",
      title: "A local, simple and trusted way to learn languages.",
      description:
        "DilUp is an online language marketplace built for Azerbaijan. Instead of buying a subscription, students choose a tutor who fits their goal, level and budget, pay only for the lessons they take, and start speaking from the very first one.",
      heroImage: ABOUT_HERO,
      stats: [
        { value: "1:1", label: "Live video lessons" },
        { value: "0", label: "Subscriptions — pay per lesson" },
        { value: "3", label: "Interface languages (AZ · EN · RU)" },
      ],
      story: [
        {
          eyebrow: "Our mission",
          title: "Make language learning accessible and transparent.",
          body: "Most courses sell expensive bundles with no promise of results. We do the opposite: pricing is open, you pick your tutor, and you see the value of every lesson before you book it.",
          bullets: [
            "No hidden fees — tutors show their price openly",
            "Swap a trial lesson you didn't love, for free",
            "All payments in manat, with local cards",
          ],
          image: ABOUT_STORY_1,
        },
        {
          eyebrow: "How we differ",
          title: "A marketplace, not a course.",
          body: "DilUp connects students and tutors directly. Tutors set their own price, and you decide based on their profile, reviews and intro video. No middleman — a real person on the other side.",
          bullets: [
            "Tutor profiles: video, reviews, schedule",
            "A personal plan for your level",
            "Lessons whenever you want — in your timezone",
          ],
          image: ABOUT_STORY_2,
        },
      ],
      valuesEyebrow: "Our values",
      valuesTitle: "The principles behind every decision.",
      values: [
        {
          icon: "wallet",
          title: "Transparent pricing",
          body: "Every lesson price is visible up front. No subscription traps.",
        },
        {
          icon: "users",
          title: "Real tutors",
          body: "Every profile is backed by video, reviews and a schedule.",
        },
        {
          icon: "mapPin",
          title: "Built for Azerbaijan",
          body: "Payments in manat, local cards and a familiar interface.",
        },
        {
          icon: "target",
          title: "Outcome-focused",
          body: "Each lesson is a step toward your specific goal.",
        },
      ],
    },
    "how-it-works": {
      eyebrow: "How it works",
      title: "Choose a tutor, plan a time, start speaking.",
      description:
        "Finding the right tutor on DilUp takes three simple steps. No long sign-up or subscription required — you can start with a trial lesson right away.",
      tutorEyebrow: "For tutors",
      tutorTitle: "Build your profile, get discovered, earn from lessons.",
      tutorDescription:
        "Teaching on DilUp is straightforward: create your profile, get approved, and earn as students book live lessons with you.",
      studentStepsEyebrow: "For students",
      studentStepsTitle: "Your learning path",
      studentSteps: [
        {
          title: "1. Choose your goal",
          body: "Answer a few short onboarding questions so we can shape a tutor shortlist around your needs.",
        },
        {
          title: "2. Compare tutors",
          body: "Use price, experience, languages spoken and availability to choose with confidence.",
        },
        {
          title: "3. Start your lesson",
          body: "Book a trial lesson, share your goal and build a plan with the tutor you want to continue with.",
        },
      ],
      tutorStepsEyebrow: "For tutors",
      tutorStepsTitle: "Your earning path",
      tutorSteps: [
        {
          title: "1. Create your profile",
          body: "Set your about, languages, experience, intro video and price — your style, your rate.",
        },
        {
          title: "2. Get verified",
          body: "We review your profile and verify it — then students can find and book with you.",
        },
        {
          title: "3. Start earning",
          body: "After each lesson, get paid — no subscriptions, just real lessons with real students.",
        },
      ],
      valuesEyebrow: "What you get",
      valuesTitle: "With every lesson.",
      values: [
        {
          icon: "video",
          title: "Live video lessons",
          body: "Real 1:1 conversation, right in your browser.",
        },
        {
          icon: "calendar",
          title: "Flexible schedule",
          body: "Pick your time and reschedule whenever you need.",
        },
        {
          icon: "message",
          title: "Message your tutor",
          body: "Agree on details before and after each lesson.",
        },
        {
          icon: "shield",
          title: "Risk-free start",
          body: "Swap a trial lesson you didn't love, for free.",
        },
      ],
      tutorValuesEyebrow: "What you get as a tutor",
      tutorValuesTitle: "Control, visibility and clear earnings.",
      tutorValues: [
        {
          icon: "wallet",
          title: "Set your own rate",
          body: "Choose your lesson price and show it openly on your profile.",
        },
        {
          icon: "calendar",
          title: "Own your schedule",
          body: "Open the hours that work for you and teach at your own rhythm.",
        },
        {
          icon: "users",
          title: "Matched students",
          body: "Students find and book you based on goals, budget and availability.",
        },
        {
          icon: "shield",
          title: "A safer workflow",
          body: "Profile review, bookings and payment rules are handled inside the platform.",
        },
      ],
      faq: [
        {
          q: "What is a trial lesson?",
          a: "It's a first, often discounted lesson to test the tutor's style and share your goals.",
        },
        {
          q: "Do I need a subscription?",
          a: "No. DilUp is pay-per-lesson — you only pay for the lessons you take.",
        },
        {
          q: "Can I change tutors?",
          a: "Yes. You can book a trial lesson with another tutor at any time.",
        },
      ],
      tutorFaq: [
        {
          q: "How do I join as a tutor?",
          a: "Create a tutor profile, add your experience, languages, intro video and rate. Once approved, students can discover and book you.",
        },
        {
          q: "Who sets my lesson price?",
          a: "You do. The platform takes a commission per lesson and the rest goes to you.",
        },
        {
          q: "When can I teach?",
          a: "Your schedule is yours. Open the hours that work for you and students book those slots.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked questions.",
      description:
        "Short, clear answers about lessons, payments, choosing a tutor and your account. Can't find your answer? Just write to us.",
      heroImage: FAQ_HERO,
      groups: [
        {
          title: "Lessons",
          items: [
            {
              q: "How are lessons held?",
              a: "All lessons are live 1:1 video calls, right in your browser. No extra software to install.",
            },
            {
              q: "How long is a lesson?",
              a: "Usually 25 or 50 minutes, depending on the tutor. You choose the duration when booking.",
            },
            {
              q: "What is a trial lesson for?",
              a: "A trial lesson lets you test the tutor's style and share your goals. If it's not a match, switch tutors for free.",
            },
          ],
        },
        {
          title: "Payments",
          items: [
            {
              q: "Is there a subscription?",
              a: "No. DilUp is pay-per-lesson — you only pay for the lessons you take. There is no monthly plan.",
            },
            {
              q: "Who sets the price?",
              a: "Each tutor sets their own lesson price and shows it openly on their profile.",
            },
            {
              q: "Which currency and cards?",
              a: "Payments are made in manat (AZN) with local cards.",
            },
          ],
        },
        {
          title: "Tutors",
          items: [
            {
              q: "How do I choose a tutor?",
              a: "Filter by price, experience, languages spoken, reviews and availability.",
            },
            {
              q: "Can I join as a tutor?",
              a: "Yes. Apply from the “Become a tutor” page, build your profile and set your own price.",
            },
          ],
        },
        {
          title: "Account & languages",
          items: [
            {
              q: "Which languages are available?",
              a: "English is active first. Other languages are added step by step as tutors join.",
            },
            {
              q: "Can I change the interface language?",
              a: "Yes — the site works in Azerbaijani, English and Russian. Switch from the selector at the top.",
            },
          ],
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Talk to the DilUp team.",
      description:
        "Have a question, an idea, or want to join as a tutor? Fill in the form or write to us directly — we reply quickly on business days.",
      email: "hello@dilup.az",
      methods: [
        {
          icon: "mail",
          title: "Email",
          value: "hello@dilup.az",
          href: "mailto:hello@dilup.az",
        },
        {
          icon: "clock",
          title: "Response time",
          value: "As fast as possible on business days",
        },
        {
          icon: "graduation",
          title: "Become a tutor",
          value: "Apply on the “Become a tutor” page",
          href: "/become-tutor",
        },
      ],
      formTitle: "Send us a message",
    },
    privacy: {
      eyebrow: "Privacy",
      title: "We handle your information responsibly.",
      description:
        "This policy explains what information DilUp collects, why we collect it and how we protect it.",
      updated: "Last updated: 2026",
      sections: [
        {
          id: "collect",
          title: "Information we collect",
          body: [
            "We may store account details (name, email), onboarding answers, lesson bookings and technical information about how the platform is used.",
            "We do not store your card details — they are processed securely by our payment provider.",
          ],
        },
        {
          id: "use",
          title: "How we use information",
          body: [
            "We use information to match tutors, protect your account, schedule lessons and improve service quality.",
            "We do not sell your data to third parties for advertising without your consent.",
          ],
        },
        {
          id: "rights",
          title: "Your rights",
          body: [
            "You can view, correct or request deletion of your account data at any time.",
            "To do so, write to hello@dilup.az.",
          ],
        },
        {
          id: "contact",
          title: "Contact",
          body: [
            "For any privacy questions, reach out at hello@dilup.az.",
          ],
        },
      ],
    },
    terms: {
      eyebrow: "Terms",
      title: "DilUp terms of use.",
      description:
        "The core rules students and tutors accept when using the platform.",
      updated: "Last updated: 2026",
      sections: [
        {
          id: "model",
          title: "Marketplace model",
          body: [
            "DilUp is a platform that connects tutors and students. Each tutor sets their own lesson price; the platform takes a commission per lesson.",
            "Lessons are held based on a direct agreement between tutor and student.",
          ],
        },
        {
          id: "bookings",
          title: "Bookings & payment",
          body: [
            "When a lesson is booked, payment is taken and the corresponding lesson is created.",
            "Cancellation and refund rules depend on how many hours before the lesson the cancellation is made.",
          ],
        },
        {
          id: "conduct",
          title: "User conduct",
          body: [
            "Users must treat each other with respect and use the platform for lawful purposes.",
            "Breaking the rules may result in account suspension.",
          ],
        },
        {
          id: "changes",
          title: "Changes",
          body: [
            "These terms may be updated as the product matures. You'll be informed of significant changes.",
          ],
        },
      ],
    },
  },
  ru: {
    about: {
      eyebrow: "О DilUp",
      title: "Локальный, простой и надёжный способ учить языки.",
      description:
        "DilUp — онлайн-маркетплейс языков, созданный для Азербайджана. Вместо подписки студент выбирает репетитора под свою цель, уровень и бюджет, платит только за проведённые уроки и начинает говорить с первого занятия.",
      heroImage: ABOUT_HERO,
      stats: [
        { value: "1:1", label: "Живые видеоуроки" },
        { value: "0", label: "Подписок — оплата за урок" },
        { value: "3", label: "Языка интерфейса (AZ · EN · RU)" },
      ],
      story: [
        {
          eyebrow: "Наша миссия",
          title: "Сделать изучение языков доступным и прозрачным.",
          body: "Большинство курсов продают дорогие пакеты без гарантии результата. Мы делаем наоборот: цена открыта, репетитора выбираешь ты, и ценность каждого урока видна до бронирования.",
          bullets: [
            "Без скрытых платежей — цена у репетитора открыта",
            "Не понравился пробный урок — поменяй бесплатно",
            "Все платежи в манатах, локальными картами",
          ],
          image: ABOUT_STORY_1,
        },
        {
          eyebrow: "Чем отличаемся",
          title: "Маркетплейс, а не курс.",
          body: "DilUp соединяет студентов и репетиторов напрямую. Репетитор сам задаёт цену, а ты решаешь по его профилю, отзывам и видео. Без посредника — на той стороне реальный человек.",
          bullets: [
            "Профили репетиторов: видео, отзывы, расписание",
            "Персональный план под твой уровень",
            "Уроки когда удобно — по твоему часовому поясу",
          ],
          image: ABOUT_STORY_2,
        },
      ],
      valuesEyebrow: "Наши ценности",
      valuesTitle: "Принципы за каждым нашим решением.",
      values: [
        {
          icon: "wallet",
          title: "Прозрачная цена",
          body: "Цена каждого урока видна заранее. Без ловушек подписки.",
        },
        {
          icon: "users",
          title: "Реальные репетиторы",
          body: "Каждый профиль подтверждён видео, отзывами и расписанием.",
        },
        {
          icon: "mapPin",
          title: "Для Азербайджана",
          body: "Оплата в манатах, локальные карты и привычный интерфейс.",
        },
        {
          icon: "target",
          title: "Ориентир на результат",
          body: "Каждый урок — шаг к твоей конкретной цели.",
        },
      ],
    },
    "how-it-works": {
      eyebrow: "Как это работает",
      title: "Выбери репетитора, запланируй время, начни говорить.",
      description:
        "Найти подходящего репетитора на DilUp — три простых шага. Без долгой регистрации и подписки: можно сразу начать с пробного урока.",
      tutorEyebrow: "Для репетиторов",
      tutorTitle: "Создай профиль, стань видимым для студентов и зарабатывай на уроках.",
      tutorDescription:
        "Преподавать на DilUp просто: заполни профиль, пройди проверку и получай доход, когда студенты бронируют с тобой живые уроки.",
      studentStepsEyebrow: "Для студентов",
      studentStepsTitle: "Твой путь обучения",
      studentSteps: [
        {
          title: "1. Выбери цель",
          body: "Ответь на несколько коротких вопросов onboarding — мы соберём подборку репетиторов под твои задачи.",
        },
        {
          title: "2. Сравни репетиторов",
          body: "Сравни цену, опыт, языки и доступное время, чтобы выбрать уверенно.",
        },
        {
          title: "3. Начни урок",
          body: "Забронируй пробный урок, поделись целью и составь план с подходящим репетитором.",
        },
      ],
      tutorStepsEyebrow: "Для репетиторов",
      tutorStepsTitle: "Твой путь доходов",
      tutorSteps: [
        {
          title: "1. Создай профиль",
          body: "Заполни информацию о себе, языки, опыт, видео-представление и установи свою цену — ты сам решаешь.",
        },
        {
          title: "2. Получи верификацию",
          body: "Мы проверим твой профиль — и тогда студенты смогут найти и забронировать с тобой уроки.",
        },
        {
          title: "3. Начни зарабатывать",
          body: "После каждого урока получай деньги — никаких подписок, просто реальные уроки с реальными студентами.",
        },
      ],
      valuesEyebrow: "Что ты получаешь",
      valuesTitle: "С каждым уроком.",
      values: [
        {
          icon: "video",
          title: "Живые видеоуроки",
          body: "Реальный диалог 1:1 прямо в браузере.",
        },
        {
          icon: "calendar",
          title: "Гибкое расписание",
          body: "Выбирай время и переноси урок когда нужно.",
        },
        {
          icon: "message",
          title: "Связь с репетитором",
          body: "Согласуй детали до и после урока.",
        },
        {
          icon: "shield",
          title: "Старт без риска",
          body: "Не понравился пробный урок — поменяй бесплатно.",
        },
      ],
      tutorValuesEyebrow: "Что получает репетитор",
      tutorValuesTitle: "Контроль, видимость и прозрачный доход.",
      tutorValues: [
        {
          icon: "wallet",
          title: "Своя ставка",
          body: "Ты сам задаёшь цену урока и открыто показываешь её в профиле.",
        },
        {
          icon: "calendar",
          title: "Своё расписание",
          body: "Открывай удобные часы и преподавай в своём ритме.",
        },
        {
          icon: "users",
          title: "Подходящие студенты",
          body: "Студенты находят и бронируют тебя по целям, бюджету и доступному времени.",
        },
        {
          icon: "shield",
          title: "Безопасный процесс",
          body: "Проверка профиля, бронирования и правила оплаты управляются внутри платформы.",
        },
      ],
      faq: [
        {
          q: "Что такое пробный урок?",
          a: "Это первый, часто со скидкой, урок, чтобы оценить стиль репетитора и обсудить цели.",
        },
        {
          q: "Нужна ли подписка?",
          a: "Нет. DilUp работает по модели оплаты за урок — платишь только за проведённые занятия.",
        },
        {
          q: "Можно сменить репетитора?",
          a: "Да. В любой момент можно забронировать пробный урок у другого репетитора.",
        },
      ],
      tutorFaq: [
        {
          q: "Как присоединиться как репетитор?",
          a: "Создай профиль репетитора, добавь опыт, языки, видео-представление и ставку. После подтверждения студенты смогут находить и бронировать тебя.",
        },
        {
          q: "Кто задаёт цену урока?",
          a: "Ты сам. Платформа берёт комиссию за урок, остальная сумма начисляется тебе.",
        },
        {
          q: "Когда я могу преподавать?",
          a: "Расписание полностью твоё. Открывай удобные часы, а студенты бронируют эти слоты.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Частые вопросы.",
      description:
        "Короткие и понятные ответы об уроках, оплате, выборе репетитора и аккаунте. Не нашёл ответ? Просто напиши нам.",
      heroImage: FAQ_HERO,
      groups: [
        {
          title: "Уроки",
          items: [
            {
              q: "Как проходят уроки?",
              a: "Все уроки — живые видеозвонки 1:1 прямо в браузере. Ничего устанавливать не нужно.",
            },
            {
              q: "Сколько длится урок?",
              a: "Обычно 25 или 50 минут, в зависимости от репетитора. Длительность выбираешь при бронировании.",
            },
            {
              q: "Зачем нужен пробный урок?",
              a: "Пробный урок помогает оценить стиль репетитора и обсудить цели. Не подошёл — смени репетитора бесплатно.",
            },
          ],
        },
        {
          title: "Оплата",
          items: [
            {
              q: "Есть ли подписка?",
              a: "Нет. DilUp работает по модели оплаты за урок — платишь только за проведённые занятия. Месячного плана нет.",
            },
            {
              q: "Кто задаёт цену?",
              a: "Каждый репетитор сам задаёт цену урока и открыто показывает её в профиле.",
            },
            {
              q: "Какая валюта и карты?",
              a: "Оплата в манатах (AZN) локальными картами.",
            },
          ],
        },
        {
          title: "Репетиторы",
          items: [
            {
              q: "Как выбрать репетитора?",
              a: "Фильтруй по цене, опыту, языкам, отзывам и доступному времени.",
            },
            {
              q: "Можно стать репетитором?",
              a: "Да. Подай заявку на странице «Стать репетитором», создай профиль и задай свою цену.",
            },
          ],
        },
        {
          title: "Аккаунт и языки",
          items: [
            {
              q: "Какие языки доступны?",
              a: "Сначала активен английский. Другие языки добавляются постепенно по мере появления репетиторов.",
            },
            {
              q: "Можно сменить язык интерфейса?",
              a: "Да — сайт работает на азербайджанском, английском и русском. Переключи в селекторе сверху.",
            },
          ],
        },
      ],
    },
    contact: {
      eyebrow: "Контакты",
      title: "Свяжись с командой DilUp.",
      description:
        "Есть вопрос, идея или хочешь стать репетитором? Заполни форму или напиши напрямую — в рабочие дни отвечаем быстро.",
      email: "hello@dilup.az",
      methods: [
        {
          icon: "mail",
          title: "Email",
          value: "hello@dilup.az",
          href: "mailto:hello@dilup.az",
        },
        {
          icon: "clock",
          title: "Время ответа",
          value: "Как можно быстрее в рабочие дни",
        },
        {
          icon: "graduation",
          title: "Стать репетитором",
          value: "Заявка на странице «Стать репетитором»",
          href: "/become-tutor",
        },
      ],
      formTitle: "Напиши нам сообщение",
    },
    privacy: {
      eyebrow: "Конфиденциальность",
      title: "Мы ответственно относимся к твоим данным.",
      description:
        "Эта политика объясняет, какие данные собирает DilUp, зачем и как мы их защищаем.",
      updated: "Обновлено: 2026",
      sections: [
        {
          id: "collect",
          title: "Какие данные мы собираем",
          body: [
            "Мы можем хранить данные аккаунта (имя, email), ответы onboarding, бронирования уроков и технические данные об использовании платформы.",
            "Данные карты мы не храним — их безопасно обрабатывает платёжный провайдер.",
          ],
        },
        {
          id: "use",
          title: "Как мы используем данные",
          body: [
            "Данные нужны, чтобы подбирать репетиторов, защищать аккаунт, планировать уроки и улучшать качество сервиса.",
            "Мы не продаём твои данные третьим лицам для рекламы без твоего согласия.",
          ],
        },
        {
          id: "rights",
          title: "Твои права",
          body: [
            "Ты в любой момент можешь посмотреть, исправить или запросить удаление данных аккаунта.",
            "Для этого напиши на hello@dilup.az.",
          ],
        },
        {
          id: "contact",
          title: "Контакты",
          body: [
            "По вопросам конфиденциальности пиши на hello@dilup.az.",
          ],
        },
      ],
    },
    terms: {
      eyebrow: "Условия",
      title: "Условия использования DilUp.",
      description:
        "Основные правила, которые принимают студенты и репетиторы при использовании платформы.",
      updated: "Обновлено: 2026",
      sections: [
        {
          id: "model",
          title: "Модель маркетплейса",
          body: [
            "DilUp — платформа, которая соединяет репетиторов и студентов. Цену урока задаёт сам репетитор; платформа берёт комиссию за урок.",
            "Уроки проходят на основе прямой договорённости между репетитором и студентом.",
          ],
        },
        {
          id: "bookings",
          title: "Бронирование и оплата",
          body: [
            "При бронировании урока списывается оплата и создаётся соответствующий урок.",
            "Правила отмены и возврата зависят от того, за сколько часов до урока сделана отмена.",
          ],
        },
        {
          id: "conduct",
          title: "Поведение пользователей",
          body: [
            "Пользователи должны уважительно относиться друг к другу и использовать платформу в законных целях.",
            "Нарушение правил может привести к блокировке аккаунта.",
          ],
        },
        {
          id: "changes",
          title: "Изменения",
          body: [
            "Эти условия могут обновляться по мере развития продукта. О существенных изменениях мы сообщим.",
          ],
        },
      ],
    },
  },
};

export function getPublicPageCopy<S extends PublicPageSlug>(
  locale: string,
  slug: S,
): SiteContent[S] {
  const site = content[locale] ?? content.az;
  return site[slug];
}
