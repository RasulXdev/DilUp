import type { IconKey } from "@/components/public/sections/icons";

type Step = { title: string; body: string };
type Feature = { icon: IconKey; title: string; body: string };
type FaqItem = { q: string; a: string };
type ApplicationPoint = { label: string; value: string };
type Testimonial = { quote: string; author: string; role: string; cta: string };

export type BecomeTutorContent = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  secondary: string;
  heroImage: string;
  heroAlt: string;
  stats: { value: string; label: string }[];
  preview: {
    badge: string;
    title: string;
    subtitle: string;
    points: ApplicationPoint[];
  };
  stepsTitle: string;
  stepsEyebrow: string;
  steps: Step[];
  featuresEyebrow: string;
  featuresTitle: string;
  features: Feature[];
  earnings: {
    eyebrow: string;
    title: string;
    body: string;
    example: string;
    note: string;
  };
  requirements: {
    eyebrow: string;
    title: string;
    body: string;
    items: string[];
  };
  testimonial: Testimonial;
  faq: FaqItem[];
};

const BECOME_TUTOR_HERO = "/images/footer/dilup-tutor-teach-home.jpg";

const content: Record<string, BecomeTutorContent> = {
  az: {
    eyebrow: "Müəllim ol",
    title: "Öz qiymətini təyin et, istədiyin vaxt dərs ver.",
    description:
      "DilUp-da müəllim kimi qazancına özün nəzarət edirsən. Profilini qur, cədvəlini seç və qiymətini özün təyin et. Abunəlik satmırsan — real tələbələrə canlı dərs verirsən.",
    cta: "Müəllim profili yarat",
    secondary: "Platforma necə işləyir",
    heroImage: BECOME_TUTOR_HERO,
    heroAlt: "Evdən canlı online dərs verən DilUp müəllimi",
    stats: [
      { value: "75%", label: "Komissiyadan sonra sənə qalır" },
      { value: "0 ₼", label: "Qoşulmaq pulsuzdur" },
      { value: "İstədiyin vaxt", label: "Saatlarını özün seçirsən" },
    ],
    preview: {
      badge: "Profil yoxlanışı",
      title: "Tələbələrin görəcəyi profilini hazırla",
      subtitle: "Təcrübə, video, qiymət və uyğun saatlarını bir yerdə göstər.",
      points: [
        { label: "Dərs formatı", value: "Canlı 1:1 video" },
        { label: "Ödəniş", value: "AZN ilə təhlükəsiz" },
        { label: "Qiymət", value: "Sən təyin edirsən" },
      ],
    },
    stepsEyebrow: "Necə qoşulursan",
    stepsTitle: "Profilini qur, təsdiqlən və ilk dərslərini al.",
    steps: [
      {
        title: "Məlumatlarını əlavə et",
        body: "Kimə dərs verdiyini, təcrübəni, ixtisaslarını və dərs qiymətini yaz.",
      },
      {
        title: "Video və cədvəlini tamamla",
        body: "Qısa tanıtım videosu və real uyğun saatların tələbələrə güvən verir.",
      },
      {
        title: "Tələbələrdən bron al",
        body: "Profil təsdiqlənəndən sonra tələbələr səni tapır, mesaj yazır və dərs bron edir.",
      },
    ],
    featuresEyebrow: "Niyə DilUp",
    featuresTitle: "Tədris biznesini sadə idarə et.",
    features: [
      {
        icon: "wallet",
        title: "Qiymətini özün təyin et",
        body: "Dərs qiymətini özün seçirsən və istənilən vaxt dəyişə bilərsən.",
      },
      {
        icon: "calendar",
        title: "İstədiyin vaxt dərs ver",
        body: "Cədvəlin tam sənin əlindədir — harada və nə vaxt istəsən.",
      },
      {
        icon: "shield",
        title: "Təhlükəsiz ödəniş axını",
        body: "Tələbə ödənişi platformada tamamlayır, dərsdən sonra qazancın hesablanır.",
      },
    ],
    earnings: {
      eyebrow: "Qazanc",
      title: "Qazancın şəffafdır.",
      body: "Qiyməti sən təyin edirsən. Platforma hər dərsdən 25% komissiya alır, qalan 75% sənə çatır.",
      example: "Məsələn: 30 ₼ dərs → 25% komissiyadan sonra sənə 22,50 ₼ qalır.",
      note: "Ödənişlər manatla aparılır.",
    },
    requirements: {
      eyebrow: "Hazır ol",
      title: "Güclü profil üçün nələr lazımdır?",
      body: "Müraciət qısa olmalıdır, amma tələbəyə inam verən detalları mütləq göstərməlidir.",
      items: [
        "Aydın profil fotosu və qısa müəllim təqdimatı",
        "Tədris etdiyin dil, səviyyələr və ixtisaslar",
        "Tanıtım videosu və dərs üslubun",
        "Real uyğun saatlar və seçdiyin dərs qiyməti",
      ],
    },
    testimonial: {
      quote: "DilUp mənə evdən çıxmadan real tələbələrlə işləmək və dərs cədvəlimi özüm qurmaq imkanı verdi.",
      author: "Aysel M.",
      role: "İngilis dili müəllimi",
      cta: "Müəllim kimi davam et",
    },
    faq: [
      {
        q: "Qoşulmaq pulludur?",
        a: "Xeyr. Profil yaratmaq və qoşulmaq tamamilə pulsuzdur.",
      },
      {
        q: "Qiymətimi sonra dəyişə bilərəm?",
        a: "Bəli, dərs qiymətini istənilən vaxt dəyişə bilərsən.",
      },
      {
        q: "Nə vaxt ödəniş alıram?",
        a: "Dərs tamamlandıqdan sonra qazancın hesabına yazılır və ödəniş edilir.",
      },
    ],
  },
  en: {
    eyebrow: "Become a tutor",
    title: "Set your own rate, teach whenever you want.",
    description:
      "As a tutor on DilUp you're in control of your earnings. Build your profile, choose your schedule and set your own price. You're not selling subscriptions — you're giving live lessons to real students.",
    cta: "Create a tutor profile",
    secondary: "How our platform works",
    heroImage: BECOME_TUTOR_HERO,
    heroAlt: "DilUp tutor teaching a live online lesson from home",
    stats: [
      { value: "75%", label: "You keep after commission" },
      { value: "0 ₼", label: "Free to join" },
      { value: "Anytime", label: "You set your hours" },
    ],
    preview: {
      badge: "Profile review",
      title: "Build the profile students will choose",
      subtitle:
        "Show your experience, video, lesson price and real teaching hours in one place.",
      points: [
        { label: "Lesson format", value: "Live 1:1 video" },
        { label: "Payments", value: "Secure AZN payouts" },
        { label: "Rate", value: "Set by you" },
      ],
    },
    stepsEyebrow: "How joining works",
    stepsTitle: "Create your profile, get approved, and start taking bookings.",
    steps: [
      {
        title: "Add your teaching details",
        body: "Tell students who you teach, your experience, specialties and lesson price.",
      },
      {
        title: "Complete video and schedule",
        body: "A short intro video and accurate availability help students book with confidence.",
      },
      {
        title: "Receive student bookings",
        body: "Once approved, students can find you, message you and book live lessons.",
      },
    ],
    featuresEyebrow: "Why DilUp",
    featuresTitle: "Run your teaching business with less busywork.",
    features: [
      {
        icon: "wallet",
        title: "Set your own rate",
        body: "Choose your lesson price and change it whenever you like.",
      },
      {
        icon: "calendar",
        title: "Teach anytime",
        body: "Your schedule is fully yours — wherever and whenever you want.",
      },
      {
        icon: "shield",
        title: "Secure payment flow",
        body: "Students pay through DilUp, and your lesson earnings are tracked after class.",
      },
    ],
    earnings: {
      eyebrow: "Earnings",
      title: "Your earnings are transparent.",
      body: "You set the price. The platform takes a 25% commission per lesson and the remaining 75% goes to you.",
      example: "For example: a 30 ₼ lesson → you keep 22.50 ₼ after a 25% commission.",
      note: "Payments are made in manat.",
    },
    requirements: {
      eyebrow: "Get ready",
      title: "What makes a strong tutor profile?",
      body: "The application should stay quick, but it needs the details that help a student trust you before the first message.",
      items: [
        "A clear profile photo and short tutor introduction",
        "The language you teach, levels and specialties",
        "An intro video that explains your lesson style",
        "Real availability and the lesson price you choose",
      ],
    },
    testimonial: {
      quote:
        "DilUp gives me a simple way to teach real students from home while keeping my schedule and price under my control.",
      author: "Aysel M.",
      role: "English tutor",
      cta: "Continue as a tutor",
    },
    faq: [
      {
        q: "Is it paid to join?",
        a: "No. Creating a profile and joining is completely free.",
      },
      {
        q: "Can I change my price later?",
        a: "Yes, you can change your lesson price at any time.",
      },
      {
        q: "When do I get paid?",
        a: "After a lesson is completed, your earnings are credited and paid out.",
      },
    ],
  },
  ru: {
    eyebrow: "Стать репетитором",
    title: "Устанавливай свою цену и преподавай когда удобно.",
    description:
      "Как репетитор на DilUp ты управляешь своим доходом. Создай профиль, выбери расписание и задай свою цену. Ты не продаёшь подписки — ты даёшь живые уроки реальным студентам.",
    cta: "Создать профиль репетитора",
    secondary: "Как работает платформа",
    heroImage: BECOME_TUTOR_HERO,
    heroAlt: "Репетитор DilUp проводит живой онлайн-урок из дома",
    stats: [
      { value: "75%", label: "Остаётся тебе после комиссии" },
      { value: "0 ₼", label: "Присоединиться бесплатно" },
      { value: "Когда удобно", label: "Часы выбираешь сам" },
    ],
    preview: {
      badge: "Проверка профиля",
      title: "Создай профиль, который выберут студенты",
      subtitle:
        "Покажи опыт, видео, цену урока и реальные часы для занятий в одном месте.",
      points: [
        { label: "Формат урока", value: "Живое видео 1:1" },
        { label: "Выплаты", value: "Безопасно в AZN" },
        { label: "Цена", value: "Назначаешь ты" },
      ],
    },
    stepsEyebrow: "Как присоединиться",
    stepsTitle: "Создай профиль, пройди проверку и получай бронирования.",
    steps: [
      {
        title: "Добавь данные о преподавании",
        body: "Расскажи, кого обучаешь, какой у тебя опыт, специализации и цена урока.",
      },
      {
        title: "Заполни видео и расписание",
        body: "Короткое видео и точная доступность помогают студентам бронировать увереннее.",
      },
      {
        title: "Получай бронирования",
        body: "После одобрения студенты смогут находить тебя, писать и бронировать живые уроки.",
      },
    ],
    featuresEyebrow: "Почему DilUp",
    featuresTitle: "Управляй преподаванием без лишней рутины.",
    features: [
      {
        icon: "wallet",
        title: "Своя цена",
        body: "Выбирай цену урока и меняй её когда захочешь.",
      },
      {
        icon: "calendar",
        title: "Преподавай когда удобно",
        body: "Расписание полностью твоё — где и когда хочешь.",
      },
      {
        icon: "shield",
        title: "Безопасный процесс оплаты",
        body: "Студенты оплачивают через DilUp, а доход за урок фиксируется после занятия.",
      },
    ],
    earnings: {
      eyebrow: "Доход",
      title: "Твой доход прозрачен.",
      body: "Цену задаёшь ты. Платформа берёт комиссию 25% за урок, остальные 75% — твои.",
      example: "Например: урок за 30 ₼ → после комиссии 25% тебе остаётся 22,50 ₼.",
      note: "Выплаты производятся в манатах.",
    },
    requirements: {
      eyebrow: "Подготовься",
      title: "Что делает профиль сильным?",
      body: "Заявка должна быть короткой, но в ней нужны детали, которые вызывают доверие до первого сообщения.",
      items: [
        "Понятное фото профиля и короткое представление",
        "Язык преподавания, уровни и специализации",
        "Видео о твоём стиле занятий",
        "Реальная доступность и выбранная цена урока",
      ],
    },
    testimonial: {
      quote:
        "DilUp помогает мне преподавать реальным студентам из дома и самостоятельно управлять расписанием и ценой.",
      author: "Айсель М.",
      role: "Репетитор английского",
      cta: "Продолжить как репетитор",
    },
    faq: [
      {
        q: "Присоединение платное?",
        a: "Нет. Создание профиля и регистрация полностью бесплатны.",
      },
      {
        q: "Можно ли изменить цену позже?",
        a: "Да, цену урока можно менять в любое время.",
      },
      {
        q: "Когда я получаю оплату?",
        a: "После завершения урока твой доход начисляется и выплачивается.",
      },
    ],
  },
};

export function getBecomeTutorContent(locale: string): BecomeTutorContent {
  return content[locale] ?? content.az;
}
