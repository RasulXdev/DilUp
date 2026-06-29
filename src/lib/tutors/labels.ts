import type { SpecialtyCode } from "@/lib/tutors";

const SPECIALTY_KEYS = [
  "none",
  "business",
  "conversation",
  "intensive",
  "beginners",
  "american",
  "ielts",
  "grammar",
  "travel",
  "kids",
  "conversational",
  "studyAbroad",
  "toefl",
  "jobInterview",
  "esl",
  "tefl",
  "businessWork",
] as const satisfies readonly SpecialtyCode[];

const SPECIALTY_KEY_BY_TEXT: Record<string, SpecialtyCode> = {
  "business english": "business",
  "conversation practice": "conversation",
  "intensive english": "intensive",
  "english for beginners": "beginners",
  "american english": "american",
  "grammar and accuracy": "grammar",
  "english for travel": "travel",
  "english for kids": "kids",
  "conversational english": "conversational",
  "study abroad": "studyAbroad",
  "english job interview prep": "jobInterview",
  "business and work": "businessWork",
  "business & work": "businessWork",
};

function normalizeLabel(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export function resolveSpecialtyKey(value: string): SpecialtyCode | null {
  const directKey = SPECIALTY_KEYS.find((key) => key === value);
  if (directKey) return directKey;

  return SPECIALTY_KEY_BY_TEXT[normalizeLabel(value)] ?? null;
}
