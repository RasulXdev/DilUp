import type { IconKey } from "@/components/public/sections/icons";

type Step = { title: string; body: string };
type Feature = { icon: IconKey; title: string; body: string };
type FaqItem = { q: string; a: string };

export type BecomeTutorContent = {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  stats: { value: string; label: string }[];
  stepsTitle: string;
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
  faq: FaqItem[];
};

const BECOME_TUTOR_HERO = "/images/footer/become-tutor-hero.jpg";

const content: Record<string, BecomeTutorContent> = {
  az: {
    eyebrow: "Müəllim ol",
    title: "Öz qiymətini təyin et, istədiyin vaxt dərs ver.",
    description:
      "DilUp-da müəllim kimi qazancına özün nəzarət edirsən. Profilini qur, cədvəlini seç və qiymətini özün təyin et. Abunəlik satmırsan — real tələbələrə canlı dərs verirsən.",
    heroImage: BECOME_TUTOR_HERO,
    stats: [
      { value: "75%", label: "Komissiyadan sonra sənə qalır" },
      { value: "0 ₼", label: "Qoşulmaq pulsuzdur" },
      { value: "İstədiyin vaxt", label: "Saatlarını özün seçirsən" },
    ],
    stepsTitle: "Üç addımda başla.",
    steps: [
      {
        title: "Qeydiyyatdan keç",
        body: "Profilini yarat: haqqında, dillər, təcrübə, video təqdimat və qiymət.",
      },
      {
        title: "Təsdiq al",
        body: "Komandamız profilini nəzərdən keçirir və təsdiqləyir.",
      },
      {
        title: "Qazanmağa başla",
        body: "Tələbələr səni tapır, dərs bron edir — sən isə qazanırsan.",
      },
    ],
    featuresEyebrow: "Niyə DilUp",
    featuresTitle: "Tədrisə nəzarət səndədir.",
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
        icon: "trending",
        title: "Peşəkar inkişaf et",
        body: "Daha çox tələbə, rəylər və daimi gəlir qur.",
      },
    ],
    earnings: {
      eyebrow: "Qazanc",
      title: "Qazancın şəffafdır.",
      body: "Qiyməti sən təyin edirsən. Platforma hər dərsdən 25% komissiya alır, qalan 75% sənə çatır.",
      example: "Məsələn: 30 ₼ dərs → 25% komissiyadan sonra sənə 22,50 ₼ qalır.",
      note: "Ödənişlər manatla aparılır.",
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
    heroImage: BECOME_TUTOR_HERO,
    stats: [
      { value: "75%", label: "You keep after commission" },
      { value: "0 ₼", label: "Free to join" },
      { value: "Anytime", label: "You set your hours" },
    ],
    stepsTitle: "Start in three steps.",
    steps: [
      {
        title: "Sign up",
        body: "Create your profile: about you, languages, experience, intro video and price.",
      },
      {
        title: "Get approved",
        body: "Our team reviews and approves your profile.",
      },
      {
        title: "Start earning",
        body: "Students find you, book lessons — and you get paid.",
      },
    ],
    featuresEyebrow: "Why DilUp",
    featuresTitle: "You're in control of teaching.",
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
        icon: "trending",
        title: "Grow professionally",
        body: "Build up students, reviews and a steady income.",
      },
    ],
    earnings: {
      eyebrow: "Earnings",
      title: "Your earnings are transparent.",
      body: "You set the price. The platform takes a 25% commission per lesson and the remaining 75% goes to you.",
      example: "For example: a 30 ₼ lesson → you keep 22.50 ₼ after a 25% commission.",
      note: "Payments are made in manat.",
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
    heroImage: BECOME_TUTOR_HERO,
    stats: [
      { value: "75%", label: "Остаётся тебе после комиссии" },
      { value: "0 ₼", label: "Присоединиться бесплатно" },
      { value: "Когда удобно", label: "Часы выбираешь сам" },
    ],
    stepsTitle: "Начни в три шага.",
    steps: [
      {
        title: "Зарегистрируйся",
        body: "Создай профиль: о себе, языки, опыт, видеопрезентация и цена.",
      },
      {
        title: "Пройди проверку",
        body: "Наша команда проверяет и одобряет твой профиль.",
      },
      {
        title: "Начни зарабатывать",
        body: "Студенты находят тебя, бронируют уроки — и ты получаешь оплату.",
      },
    ],
    featuresEyebrow: "Почему DilUp",
    featuresTitle: "Преподавание под твоим контролем.",
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
        icon: "trending",
        title: "Расти профессионально",
        body: "Набирай студентов, отзывы и стабильный доход.",
      },
    ],
    earnings: {
      eyebrow: "Доход",
      title: "Твой доход прозрачен.",
      body: "Цену задаёшь ты. Платформа берёт комиссию 25% за урок, остальные 75% — твои.",
      example: "Например: урок за 30 ₼ → после комиссии 25% тебе остаётся 22,50 ₼.",
      note: "Выплаты производятся в манатах.",
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
