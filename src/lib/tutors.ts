export type TutorLanguageLevel =
  | "native"
  | "proficient"
  | "advanced"
  | "upper_intermediate"
  | "intermediate"
  | "elementary"
  | "beginner";
export type SubjectCode = "en" | "ru" | "tr" | "de" | "fr" | "es" | "ar" | "it";
export type SpecialtyCode =
  | "none"
  | "business"
  | "conversation"
  | "intensive"
  | "beginners"
  | "american"
  | "ielts"
  | "grammar"
  | "travel"
  | "kids"
  | "conversational"
  | "studyAbroad"
  | "toefl"
  | "jobInterview"
  | "esl"
  | "tefl"
  | "businessWork";

export type TutorReview = {
  author: string;
  date: string;
  rating: number;
  text: string;
};

export type Tutor = {
  /** "mock" = static demo data with i18n copy keys; "db" = real Supabase row with plain text content. */
  source: "mock" | "db";
  id: string;
  name: string;
  online: boolean;
  country: string;
  countryCode: string;
  flag: string;
  photo: string;
  videoImage: string;
  title: string;
  headline: string;
  bio: string;
  about: string;
  subject: SubjectCode;
  languages: { code: SubjectCode | "fi"; level: TutorLanguageLevel }[];
  alsoSpeaks: (SubjectCode | "az" | "fi")[];
  specialties: string[];
  categories: ("super" | "professional")[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  students: number;
  lessons: number;
  recentlyBooked: number;
  lessonDuration: number;
  highlights: { title: string; text: string }[];
  lessonRating: {
    reassurance: number;
    clarity: number;
    progress: number;
    preparation: number;
    reviews: number;
  };
  reviewSummary: string;
  reviews: TutorReview[];
  schedule: Record<string, string[]>;
  certificates: { years: string; title: string; description: string; verified: boolean }[];
};

export const tutors: Tutor[] = [
  {
    source: "mock",
    id: "sue-l",
    name: "Sue L.",
    online: true,
    country: "United States of America",
    countryCode: "US",
    flag: "🇺🇸",
    photo: "/images/footer/dilup-tutor-profile.jpg",
    videoImage: "/images/footer/dilup-tutor-live-lesson.jpg",
    title: "englishTutor",
    headline: "sueHeadline",
    bio: "Hi, I'm Sue! Native English speaker with 20+ years in business. I'll help you speak naturally, sound professional, and stop translating in your head.",
    about:
      "Hey there! I'm Sue, a native English speaker from the US with an MBA and 20+ years of experience in healthcare marketing. I specialize in business English, job interview prep, and everyday conversation. My lessons are relaxed but focused — we'll work on real situations you actually face, not just textbook dialogues. Let's get you talking with confidence!",
    subject: "en",
    languages: [{ code: "en", level: "native" }],
    alsoSpeaks: ["en"],
    specialties: [
      "conversation",
      "business",
      "beginners",
      "american",
      "grammar",
      "travel",
      "kids",
      "jobInterview",
      "esl",
      "studyAbroad",
      "tefl",
      "businessWork",
    ],
    categories: ["super", "professional"],
    price: 30,
    originalPrice: 43,
    rating: 5,
    reviewsCount: 21,
    students: 27,
    lessons: 2466,
    recentlyBooked: 18,
    lessonDuration: 50,
    highlights: [
      {
        title: "goalFocused",
        text: "Perfect for speaking practice. Profile mentions vocabulary and listening.",
      },
    ],
    lessonRating: {
      reassurance: 4.8,
      clarity: 4.8,
      progress: 4.8,
      preparation: 4.8,
      reviews: 62,
    },
    reviewSummary:
      "Students say Sue tailors English lessons, gives clear explanations and timely corrections, and keeps classes well structured and engaging.",
    reviews: [
      {
        author: "Jenny",
        date: "2026-03-04",
        rating: 5,
        text: "Sue is a great tutor. She is very professional and provides excellent strategies to learn English.",
      },
      {
        author: "Nuno",
        date: "2026-01-22",
        rating: 5,
        text: "Sue is a really great teacher. She is patient, encouraging and truly cares about her students.",
      },
      {
        author: "Katrina",
        date: "2026-02-05",
        rating: 5,
        text: "The classes are informative, focused and very easy to follow.",
      },
      {
        author: "Andres",
        date: "2026-01-12",
        rating: 5,
        text: "Exceptional lessons and very useful correction after each class.",
      },
    ],
    schedule: {
      Mon: ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "23:00"],
      Tue: ["00:00", "00:30", "01:00", "19:00"],
      Fri: ["17:00", "17:30", "18:00", "18:30"],
    },
    certificates: [
      {
        years: "2023 - 2024",
        title: "TEFL",
        description: "Teaching English as a Foreign Language",
        verified: true,
      },
    ],
  },
  {
    source: "mock",
    id: "nea-p",
    name: "Nea P.",
    online: false,
    country: "Finland",
    countryCode: "FI",
    flag: "🇫🇮",
    photo: "/images/footer/how-it-works-tutors-1.jpg",
    videoImage: "/images/footer/how-it-works-students-2.jpg",
    title: "certifiedEnglishTeacher",
    headline: "neaHeadline",
    bio: "Hi, I'm Nea from Finland! I help students speak more naturally with friendly corrections, clear goals, and lots of speaking practice.",
    about:
      "Hi! I'm Nea, a CELTA-certified English teacher from Finland. I love working with beginners and anyone who feels nervous speaking English. My lessons are relaxed and encouraging — we'll focus on what you actually need: daily conversation, travel English, or just building the confidence to speak without overthinking.",
    subject: "en",
    languages: [
      { code: "en", level: "proficient" },
      { code: "fi", level: "native" },
    ],
    alsoSpeaks: ["fi", "en"],
    specialties: ["conversation", "beginners", "business", "grammar", "travel", "kids", "studyAbroad"],
    categories: ["super", "professional"],
    price: 23,
    originalPrice: 34,
    rating: 4.9,
    reviewsCount: 33,
    students: 54,
    lessons: 1495,
    recentlyBooked: 24,
    lessonDuration: 50,
    highlights: [{ title: "encouraging", text: "Strong fit for students who want patient speaking practice." }],
    lessonRating: { reassurance: 4.9, clarity: 4.8, progress: 4.7, preparation: 4.8, reviews: 48 },
    reviewSummary:
      "Students describe Nea as warm, structured and very helpful for building everyday confidence.",
    reviews: [
      { author: "Aylin", date: "2026-05-08", rating: 5, text: "Very kind, focused and easy to talk to." },
      { author: "Murat", date: "2026-04-19", rating: 5, text: "I finally feel comfortable speaking at work." },
    ],
    schedule: {
      Tue: ["14:00", "14:30", "18:00"],
      Wed: ["16:00", "16:30", "17:00"],
      Sat: ["11:00", "11:30"],
    },
    certificates: [
      { years: "2021 - 2022", title: "CELTA", description: "Certificate in English Language Teaching", verified: true },
    ],
  },
  {
    source: "mock",
    id: "andrew-s",
    name: "Andrew S.",
    online: true,
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    photo: "/images/footer/how-it-works-tutors-2.jpg",
    videoImage: "/images/footer/how-it-works-students-1.jpg",
    title: "ieltsBusinessTutor",
    headline: "andrewHeadline",
    bio: "Expert IELTS and business English coaching — speaking, writing, and professional communication. Book a trial and let's build your plan.",
    about:
      "I'm Andrew, a DELTA-qualified English teacher from the UK. My lessons are direct, practical, and focused on measurable progress — perfect if you're preparing for IELTS, want sharper business writing, or need to sound more confident in meetings and interviews.",
    subject: "en",
    languages: [{ code: "en", level: "native" }],
    alsoSpeaks: ["en"],
    specialties: ["ielts", "toefl", "business", "intensive", "grammar", "jobInterview", "studyAbroad"],
    categories: ["super", "professional"],
    price: 59,
    originalPrice: 85,
    rating: 5,
    reviewsCount: 53,
    students: 38,
    lessons: 2629,
    recentlyBooked: 12,
    lessonDuration: 50,
    highlights: [{ title: "examReady", text: "Strong profile for IELTS speaking and writing practice." }],
    lessonRating: { reassurance: 4.8, clarity: 4.9, progress: 4.9, preparation: 4.9, reviews: 81 },
    reviewSummary:
      "Students value Andrew's direct feedback, exam strategy and highly organized lesson plans.",
    reviews: [
      { author: "Leyla", date: "2026-06-02", rating: 5, text: "His IELTS feedback is very clear and practical." },
      { author: "Samir", date: "2026-05-14", rating: 5, text: "Great structure and strong business vocabulary work." },
    ],
    schedule: {
      Mon: ["12:00", "12:30"],
      Thu: ["18:00", "18:30", "19:00"],
      Sun: ["10:00", "10:30"],
    },
    certificates: [
      { years: "2018 - 2019", title: "DELTA", description: "Diploma in English Language Teaching", verified: true },
    ],
  },
];

export const tutorById = (id: string) => tutors.find((tutor) => tutor.id === id);
