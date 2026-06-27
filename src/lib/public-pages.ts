export type PublicPageSlug =
  | "about"
  | "how-it-works"
  | "faq"
  | "privacy"
  | "terms"
  | "contact";

type PublicPageCopy = {
  eyebrow: string;
  title: string;
  description: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  sections: Array<{
    title: string;
    body: string;
  }>;
};

const pageCopy: Record<string, Record<PublicPageSlug, PublicPageCopy>> = {
  az: {
    about: {
      eyebrow: "DilUp haqqında",
      title: "Dil öyrənmək üçün yerli, sadə və etibarlı yol.",
      description:
        "DilUp tələbələri məqsədinə uyğun müəllimlərlə birləşdirən Azərbaycan mərkəzli online dil platformasıdır.",
      stats: [
        { value: "1:1", label: "Canlı video dərslər" },
        { value: "0", label: "Abunəlik — yalnız dərsə görə ödəniş" },
        { value: "3", label: "İnterfeys dili (AZ · EN · RU)" },
      ],
      sections: [
        {
          title: "Missiyamız",
          body: "Məqsədimiz dil öyrənməyi daha əlçatan, şəffaf və nəticə yönümlü etməkdir.",
        },
        {
          title: "Necə fərqlənirik",
          body: "Tələbə dərsə abunəliklə deyil, seçdiyi müəllimin dərsinə görə ödəniş edir.",
        },
        {
          title: "Azərbaycan üçün qurulub",
          body: "Yerli ödəniş üsulları, manatla qiymət və real istifadə etdiyin dillərdə interfeys.",
        },
        {
          title: "Növbəti addımlar",
          body: "Daha çox tədris dili və zəngin müəllim alətləri mərhələli şəkildə əlavə olunur.",
        },
      ],
    },
    "how-it-works": {
      eyebrow: "Necə işləyir",
      title: "Müəllimini seç, dərs vaxtını planla, danışmağa başla.",
      description:
        "DilUp-da uyğun müəllimi tapmaq bir neçə addımdan ibarətdir: məqsədini seç, profillərə bax və trial dərs bron et.",
      sections: [
        {
          title: "1. Məqsədini seç",
          body: "Qısa onboarding cavabları ilə sənin üçün daha uyğun müəllim siyahısı formalaşır.",
        },
        {
          title: "2. Müəllimləri müqayisə et",
          body: "Qiymət, təcrübə, dillər və mövcud vaxtlar əsasında seçim edə bilərsən.",
        },
        {
          title: "3. Dərsə başla",
          body: "Trial dərs bron et və davam etmək istədiyin müəllimlə plan qur.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Ən çox verilən suallar.",
      description:
        "DilUp-un dərs modeli, müəllim seçimi və ödəniş prinsipi haqqında qısa cavablar.",
      sections: [
        {
          title: "Abunəlik varmı?",
          body: "Xeyr. DilUp pay-per-lesson modelidir. Hər müəllim öz dərs qiymətini təyin edir.",
        },
        {
          title: "Trial dərs nə üçündür?",
          body: "Trial dərs müəllimin üslubunu yoxlamaq və məqsədlərini bölüşmək üçündür.",
        },
        {
          title: "Hansı dillər olacaq?",
          body: "İlk mərhələdə İngilis dili aktivdir. Digər dillər mərhələli şəkildə əlavə ediləcək.",
        },
      ],
    },
    privacy: {
      eyebrow: "Məxfilik",
      title: "Məlumatlarınla məsuliyyətli davranırıq.",
      description:
        "Bu səhifə DilUp-un şəxsi məlumatları necə topladığını və istifadə etdiyini izah edir.",
      sections: [
        {
          title: "Toplanan məlumatlar",
          body: "Hesab, onboarding cavabları, dərs bronları və platforma istifadəsi ilə bağlı məlumatlar saxlanıla bilər.",
        },
        {
          title: "İstifadə məqsədi",
          body: "Məlumatlar uyğun müəllimləri göstərmək, hesabını qorumaq və xidmət keyfiyyətini artırmaq üçün istifadə olunur.",
        },
      ],
    },
    terms: {
      eyebrow: "Şərtlər",
      title: "DilUp istifadə şərtləri.",
      description:
        "Platformadan istifadə edərkən tələbə və müəllimlərin qəbul etdiyi əsas qaydalar.",
      sections: [
        {
          title: "Marketplace modeli",
          body: "DilUp müəllim və tələbələri birləşdirən platformadır; dərs qiymətini müəllim müəyyən edir.",
        },
        {
          title: "Dərs bronları",
          body: "Bron, ləğv və geri ödəniş qaydaları məhsul hazır olduqca daha detallı təqdim ediləcək.",
        },
      ],
    },
    contact: {
      eyebrow: "Əlaqə",
      title: "DilUp komandası ilə danış.",
      description:
        "Sualın, təklifin və ya müəllim kimi qoşulmaq istəyin varsa, bizə yaz.",
      sections: [
        {
          title: "Email",
          body: "hello@dilup.az",
        },
        {
          title: "Cavab müddəti",
          body: "İş günlərində mümkün qədər tez cavab verməyə çalışırıq.",
        },
      ],
    },
  },
  en: {
    about: {
      eyebrow: "About DilUp",
      title: "A local, simple and trusted way to learn languages.",
      description:
        "DilUp is an Azerbaijan-centered online language platform that connects students with tutors who fit their goals.",
      stats: [
        { value: "1:1", label: "Live video lessons" },
        { value: "0", label: "Subscriptions — pay per lesson" },
        { value: "3", label: "Interface languages (AZ · EN · RU)" },
      ],
      sections: [
        {
          title: "Our mission",
          body: "We make language learning more accessible, transparent and outcome-focused.",
        },
        {
          title: "How we differ",
          body: "Students pay per lesson with the tutor they choose, not through a subscription plan.",
        },
        {
          title: "Built for Azerbaijan",
          body: "Local payment methods, pricing in manat, and an interface in the languages you actually use.",
        },
        {
          title: "What's next",
          body: "More teachable languages and richer tutor tools are rolling out step by step.",
        },
      ],
    },
    "how-it-works": {
      eyebrow: "How it works",
      title: "Choose a tutor, plan a lesson time and start speaking.",
      description:
        "Finding a tutor on DilUp takes a few steps: choose your goal, compare profiles and book a trial lesson.",
      sections: [
        {
          title: "1. Choose your goal",
          body: "Short onboarding answers shape a tutor shortlist around your needs.",
        },
        {
          title: "2. Compare tutors",
          body: "Use price, experience, languages and available times to make a confident choice.",
        },
        {
          title: "3. Start your lesson",
          body: "Book a trial lesson and build a plan with the tutor you want to continue with.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked questions.",
      description:
        "Short answers about DilUp lessons, tutor choice and the pay-per-lesson model.",
      sections: [
        {
          title: "Is there a subscription?",
          body: "No. DilUp is pay-per-lesson. Each tutor sets their own lesson price.",
        },
        {
          title: "What is a trial lesson for?",
          body: "A trial lesson helps you test the tutor's style and share your goals.",
        },
        {
          title: "Which languages will be available?",
          body: "English is active first. Other languages will be added step by step.",
        },
      ],
    },
    privacy: {
      eyebrow: "Privacy",
      title: "We handle your information responsibly.",
      description:
        "This page explains how DilUp collects and uses personal information.",
      sections: [
        {
          title: "Information we collect",
          body: "We may store account details, onboarding answers, lesson bookings and platform usage information.",
        },
        {
          title: "How it is used",
          body: "We use information to match tutors, protect accounts and improve service quality.",
        },
      ],
    },
    terms: {
      eyebrow: "Terms",
      title: "DilUp terms of use.",
      description:
        "The core rules students and tutors accept when using the platform.",
      sections: [
        {
          title: "Marketplace model",
          body: "DilUp connects students and tutors; each tutor defines their own lesson price.",
        },
        {
          title: "Lesson bookings",
          body: "Booking, cancellation and refund rules will become more detailed as the product matures.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Talk to the DilUp team.",
      description:
        "Send us a question, suggestion or note if you want to join as a tutor.",
      sections: [
        {
          title: "Email",
          body: "hello@dilup.az",
        },
        {
          title: "Response time",
          body: "We try to reply as quickly as possible on business days.",
        },
      ],
    },
  },
  ru: {
    about: {
      eyebrow: "О DilUp",
      title: "Локальный, простой и надёжный способ учить языки.",
      description:
        "DilUp — онлайн-платформа из Азербайджана, которая помогает студентам находить репетиторов под свои цели.",
      stats: [
        { value: "1:1", label: "Живые видеоуроки" },
        { value: "0", label: "Подписок — оплата за урок" },
        { value: "3", label: "Языка интерфейса (AZ · EN · RU)" },
      ],
      sections: [
        {
          title: "Наша миссия",
          body: "Мы делаем изучение языков доступнее, прозрачнее и ориентированным на результат.",
        },
        {
          title: "Чем отличаемся",
          body: "Студенты платят за урок выбранному репетитору, а не покупают подписку.",
        },
        {
          title: "Создано для Азербайджана",
          body: "Локальные способы оплаты, цены в манатах и интерфейс на нужных тебе языках.",
        },
        {
          title: "Что дальше",
          body: "Постепенно добавляем больше языков и удобные инструменты для репетиторов.",
        },
      ],
    },
    "how-it-works": {
      eyebrow: "Как это работает",
      title: "Выбери репетитора, запланируй урок и начни говорить.",
      description:
        "На DilUp путь простой: выбери цель, сравни профили и забронируй пробный урок.",
      sections: [
        {
          title: "1. Выбери цель",
          body: "Короткий onboarding помогает сформировать подборку репетиторов под твои задачи.",
        },
        {
          title: "2. Сравни репетиторов",
          body: "Сравни цену, опыт, языки и доступное время перед выбором.",
        },
        {
          title: "3. Начни урок",
          body: "Забронируй пробный урок и составь план с подходящим репетитором.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Частые вопросы.",
      description:
        "Короткие ответы о модели уроков, выборе репетитора и оплате за урок.",
      sections: [
        {
          title: "Есть ли подписка?",
          body: "Нет. DilUp работает по модели оплаты за урок. Каждый репетитор задаёт свою цену.",
        },
        {
          title: "Зачем нужен пробный урок?",
          body: "Пробный урок помогает понять стиль репетитора и обсудить цели.",
        },
        {
          title: "Какие языки будут доступны?",
          body: "Сначала активен английский. Другие языки будут добавляться постепенно.",
        },
      ],
    },
    privacy: {
      eyebrow: "Конфиденциальность",
      title: "Мы ответственно относимся к твоим данным.",
      description:
        "Эта страница объясняет, как DilUp собирает и использует персональные данные.",
      sections: [
        {
          title: "Какие данные собираются",
          body: "Мы можем хранить данные аккаунта, ответы onboarding, бронирования уроков и информацию об использовании платформы.",
        },
        {
          title: "Как данные используются",
          body: "Данные помогают подбирать репетиторов, защищать аккаунты и улучшать качество сервиса.",
        },
      ],
    },
    terms: {
      eyebrow: "Условия",
      title: "Условия использования DilUp.",
      description:
        "Основные правила, которые принимают студенты и репетиторы при использовании платформы.",
      sections: [
        {
          title: "Marketplace-модель",
          body: "DilUp соединяет студентов и репетиторов; цену урока задаёт сам репетитор.",
        },
        {
          title: "Бронирование уроков",
          body: "Правила бронирования, отмены и возвратов будут детализироваться по мере развития продукта.",
        },
      ],
    },
    contact: {
      eyebrow: "Контакты",
      title: "Свяжись с командой DilUp.",
      description:
        "Напиши нам вопрос, предложение или сообщение, если хочешь стать репетитором.",
      sections: [
        {
          title: "Email",
          body: "hello@dilup.az",
        },
        {
          title: "Время ответа",
          body: "В рабочие дни мы стараемся отвечать как можно быстрее.",
        },
      ],
    },
  },
};

export function getPublicPageCopy(locale: string, slug: PublicPageSlug) {
  return pageCopy[locale]?.[slug] ?? pageCopy.az[slug];
}
