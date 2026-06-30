"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  HelpCircle,
  Languages,
  Mic2,
  Play,
  Plus,
  RefreshCw,
  Trash2,
  User,
  Upload,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

type StepKey =
  | "about"
  | "photo"
  | "certification"
  | "education"
  | "description"
  | "video"
  | "availability"
  | "price";

type SelectOption = {
  value: string;
  label: string;
};

type PhoneCountryOption = SelectOption & {
  code: string;
  flag: string;
};

type Certificate = {
  id: number;
  subject: string;
  certificate: string;
  issuedBy: string;
  year: string;
};

type Education = {
  id: number;
  school: string;
  degree: string;
  field: string;
  years: string;
};

type TutorApplication = {
  firstName: string;
  lastName: string;
  country: string;
  phoneCountry: string;
  teaches: string;
  speaks: string[];
  spokenLanguageLevels: string[];
  languageLevel: string;
  phone: string;
  over18: boolean;
  photoReady: boolean;
  certificates: Certificate[];
  education: Education[];
  headline: string;
  intro: string;
  experience: string;
  motivation: string;
  videoReady: boolean;
  days: string[];
  times: string[];
  timezone: string;
  price: number;
};

const steps: { key: StepKey; icon: LucideIcon }[] = [
  { key: "about", icon: Languages },
  { key: "photo", icon: Camera },
  { key: "certification", icon: BadgeCheck },
  { key: "education", icon: GraduationCap },
  { key: "description", icon: FileText },
  { key: "video", icon: Mic2 },
  { key: "availability", icon: CalendarDays },
  { key: "price", icon: Wallet },
];

const STORAGE_KEY = "dilup_tutor_application_v2";

const teachingLanguageKeys = ["english", "azerbaijani", "russian", "turkish", "arabic", "german", "spanish", "french"];
const activeTeachingLanguageKeys = ["english"];
const levelKeys = ["b1", "b2", "c1", "c2", "native"];
const spokenLanguageCodes = [
  "af", "sq", "am", "grc", "ar", "az", "eu", "bn", "bs", "bg", "my", "ca", "ceb", "yue", "zh-Hans", "ht", "crh",
  "hr", "cs", "da", "en", "eo", "et", "fa", "fi", "fr", "gl", "ka", "de", "el", "gu", "haw", "he", "hi", "is", "ig",
  "id", "ga", "it", "ja", "jv", "kn", "kk", "km", "rw", "ko", "ku", "lo", "la", "lv", "lt", "lg", "lb", "mk", "hu",
  "ms", "ml", "mt", "mi", "mr", "min", "mn", "nl", "no", "nn", "ps", "pl", "pt", "pa", "qu", "ro", "ru", "sm", "sr",
  "sh", "si", "sk", "sl", "so", "es", "su", "sw", "sv", "tl", "ber", "ta", "te", "th", "bo", "tr", "uk", "ur", "uz",
  "vi", "vo", "war", "cy", "xh", "sah", "yi", "yo",
];
const countryCodes = [
  "AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR",
  "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ",
  "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO", "BN", "BG", "BF",
  "BI", "CV", "KH", "CM", "CA", "KY", "CF", "TD", "CL", "CN", "CX", "CC",
  "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ",
  "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "SZ", "ET",
  "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE",
  "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY",
  "HT", "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE",
  "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR",
  "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO",
  "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX",
  "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP",
  "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MK", "MP", "NO", "OM",
  "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR",
  "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC",
  "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI",
  "SB", "SO", "ZA", "GS", "SS", "ES", "LK", "SD", "SR", "SJ", "SE", "CH",
  "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR",
  "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU",
  "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW",
];
const callingCodesByCountry: Record<string, string> = {
  AD: "+376", AE: "+971", AF: "+93", AG: "+1268", AI: "+1264", AL: "+355", AO: "+244", AQ: "+672", AR: "+54",
  AS: "+1684", AT: "+43", AU: "+61", AW: "+297", AX: "+358", AZ: "+994", BA: "+387", BB: "+1246", BD: "+880",
  BE: "+32", BF: "+226", BG: "+359", BH: "+973", BI: "+257", BJ: "+229", BL: "+590", BM: "+1441", BN: "+673",
  BO: "+591", BQ: "+599", BR: "+55", BS: "+1242", BT: "+975", BV: "+47", BW: "+267", BY: "+375", BZ: "+501",
  CA: "+1", CC: "+61", CD: "+243", CF: "+236", CG: "+242", CH: "+41", CI: "+225", CK: "+682", CL: "+56",
  CM: "+237", CN: "+86", CO: "+57", CR: "+506", CU: "+53", CV: "+238", CW: "+599", CX: "+61", CY: "+357",
  CZ: "+420", DE: "+49", DJ: "+253", DK: "+45", DM: "+1767", DO: "+1", DZ: "+213", EC: "+593", EE: "+372",
  EG: "+20", EH: "+212", ER: "+291", ES: "+34", ET: "+251", FI: "+358", FJ: "+679", FK: "+500", FM: "+691",
  FO: "+298", FR: "+33", GA: "+241", GB: "+44", GD: "+1473", GE: "+995", GF: "+594", GG: "+44", GH: "+233",
  GI: "+350", GL: "+299", GM: "+220", GN: "+224", GP: "+590", GQ: "+240", GR: "+30", GS: "+500", GT: "+502",
  GU: "+1671", GW: "+245", GY: "+592", HK: "+852", HM: "+672", HN: "+504", HR: "+385", HT: "+509", HU: "+36",
  ID: "+62", IE: "+353", IL: "+972", IM: "+44", IN: "+91", IO: "+246", IQ: "+964", IR: "+98", IS: "+354",
  IT: "+39", JE: "+44", JM: "+1876", JO: "+962", JP: "+81", KE: "+254", KG: "+996", KH: "+855", KI: "+686",
  KM: "+269", KN: "+1869", KP: "+850", KR: "+82", KW: "+965", KY: "+1345", KZ: "+7", LA: "+856", LB: "+961",
  LC: "+1758", LI: "+423", LK: "+94", LR: "+231", LS: "+266", LT: "+370", LU: "+352", LV: "+371", LY: "+218",
  MA: "+212", MC: "+377", MD: "+373", ME: "+382", MF: "+590", MG: "+261", MH: "+692", MK: "+389", ML: "+223",
  MM: "+95", MN: "+976", MO: "+853", MP: "+1670", MQ: "+596", MR: "+222", MS: "+1664", MT: "+356", MU: "+230",
  MV: "+960", MW: "+265", MX: "+52", MY: "+60", MZ: "+258", NA: "+264", NC: "+687", NE: "+227", NF: "+672",
  NG: "+234", NI: "+505", NL: "+31", NO: "+47", NP: "+977", NR: "+674", NU: "+683", NZ: "+64", OM: "+968",
  PA: "+507", PE: "+51", PF: "+689", PG: "+675", PH: "+63", PK: "+92", PL: "+48", PM: "+508", PN: "+64",
  PR: "+1", PS: "+970", PT: "+351", PW: "+680", PY: "+595", QA: "+974", RE: "+262", RO: "+40", RS: "+381",
  RU: "+7", RW: "+250", SA: "+966", SB: "+677", SC: "+248", SD: "+249", SE: "+46", SG: "+65", SH: "+290",
  SI: "+386", SJ: "+47", SK: "+421", SL: "+232", SM: "+378", SN: "+221", SO: "+252", SR: "+597", SS: "+211",
  ST: "+239", SV: "+503", SX: "+1721", SY: "+963", SZ: "+268", TC: "+1649", TD: "+235", TF: "+262", TG: "+228",
  TH: "+66", TJ: "+992", TK: "+690", TL: "+670", TM: "+993", TN: "+216", TO: "+676", TR: "+90", TT: "+1868",
  TV: "+688", TW: "+886", TZ: "+255", UA: "+380", UG: "+256", UM: "+1", US: "+1", UY: "+598", UZ: "+998",
  VA: "+39", VC: "+1784", VE: "+58", VG: "+1284", VI: "+1340", VN: "+84", VU: "+678", WF: "+681", WS: "+685",
  YE: "+967", YT: "+262", ZA: "+27", ZM: "+260", ZW: "+263",
};
const fallbackTimeZones = ["Asia/Baku", "Europe/Istanbul", "Europe/London", "America/New_York", "Asia/Dubai"];
const dayKeys = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const timeKeys = ["morning", "afternoon", "evening", "night"];
const languageNameFallbacks: Record<string, string> = {
  ber: "Berber",
  bo: "Tibetan",
  ceb: "Cebuano",
  crh: "Crimean Tatar",
  grc: "Ancient Greek",
  haw: "Hawaiian",
  ht: "Haitian Creole",
  lg: "Ganda",
  min: "Minangkabau",
  nn: "Norwegian Nynorsk",
  qu: "Quechua",
  sah: "Sakha",
  sh: "Serbo-Croatian",
  sm: "Samoan",
  su: "Sundanese",
  tl: "Tagalog",
  vo: "Volapuk",
  war: "Waray",
  yue: "Cantonese",
};

const initialApplication: TutorApplication = {
  firstName: "",
  lastName: "",
  country: "",
  phoneCountry: "",
  teaches: "",
  speaks: [],
  spokenLanguageLevels: [],
  languageLevel: "",
  phone: "",
  over18: false,
  photoReady: false,
  certificates: [
    {
      id: 1,
      subject: "english",
      certificate: "",
      issuedBy: "",
      year: "",
    },
  ],
  education: [
    {
      id: 1,
      school: "",
      degree: "",
      field: "",
      years: "",
    },
  ],
  headline: "",
  intro: "",
  experience: "",
  motivation: "",
  videoReady: false,
  days: ["mon", "wed", "sat"],
  times: ["evening"],
  timezone: "Asia/Baku",
  price: 30,
};

function getInitialTutorState() {
  if (typeof window === "undefined") {
    return {
      application: initialApplication,
      highestUnlockedStep: 0,
    };
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      application: initialApplication,
      highestUnlockedStep: 0,
    };
  }

  try {
    const application = { ...initialApplication, ...JSON.parse(stored) } as TutorApplication;
    if (!countryCodes.includes(application.country)) {
      application.country = initialApplication.country;
    }
    if (!callingCodesByCountry[application.phoneCountry]) {
      application.phoneCountry = initialApplication.phoneCountry;
    }
    application.spokenLanguageLevels ??= application.languageLevel ? [application.languageLevel] : [];
    const restoredIndex = steps.findLastIndex((step) => isStepValid(step.key, application));

    return {
      application,
      highestUnlockedStep: Math.max(0, Math.min(restoredIndex + 1, steps.length - 1)),
    };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);

    return {
      application: initialApplication,
      highestUnlockedStep: 0,
    };
  }
}

function getDisplayName(locale: string, type: "language" | "region", code: string) {
  const localized = new Intl.DisplayNames([locale], { type }).of(code);
  if (localized && localized.toLocaleLowerCase(locale) !== code.toLocaleLowerCase(locale)) {
    return localized;
  }

  const fallback = new Intl.DisplayNames(["en"], { type }).of(code);
  if (fallback && fallback.toLocaleLowerCase("en") !== code.toLocaleLowerCase("en")) {
    return fallback;
  }

  return type === "language" ? languageNameFallbacks[code] ?? code : code;
}

export function TutorOnboardingWizard() {
  const t = useTranslations("tutorOnboarding");
  const locale = useLocale();
  const [initialTutorState] = useState(getInitialTutorState);
  const [stepIndex, setStepIndex] = useState(0);
  const [application, setApplication] = useState<TutorApplication>(initialTutorState.application);
  const [highestUnlockedStep, setHighestUnlockedStep] = useState(initialTutorState.highestUnlockedStep);
  const [submitted, setSubmitted] = useState(false);

  const currentStep = steps[stepIndex];
  const countryOptions = useMemo(() => {
    return countryCodes
      .map((code) => ({
        value: code,
        label: getDisplayName(locale, "region", code),
      }))
      .sort((a, b) => a.label.localeCompare(b.label, locale));
  }, [locale]);
  const phoneOptions = useMemo(() => {
    return countryCodes
      .map((country) => {
        const code = callingCodesByCountry[country];

        if (!code) {
          return null;
        }

        return {
          value: country,
          label: getDisplayName(locale, "region", country),
          code,
          flag: flagFromCountryCode(country),
        };
      })
      .filter((option): option is PhoneCountryOption => option !== null)
      .sort((a, b) => a.label.localeCompare(b.label, locale));
  }, [locale]);
  const spokenLanguageOptions = useMemo(() => {
    return spokenLanguageCodes
      .map((code) => ({
        value: code,
        label: getDisplayName(locale, "language", code),
      }))
      .sort((a, b) => a.label.localeCompare(b.label, locale));
  }, [locale]);
  const timeZoneOptions = useMemo(() => {
    const supportedTimeZones =
      typeof Intl.supportedValuesOf === "function"
        ? Intl.supportedValuesOf("timeZone")
        : fallbackTimeZones;

    return supportedTimeZones.map((timeZone) => ({
      value: timeZone,
      label: timeZone.replaceAll("_", " "),
    }));
  }, []);

  const canContinue = isStepValid(currentStep.key, application);

  function updateField<K extends keyof TutorApplication>(key: K, value: TutorApplication[K]) {
    setApplication((current) => ({ ...current, [key]: value }));
  }

  function next() {
    if (!canContinue) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(application));

    if (stepIndex === steps.length - 1) {
      setSubmitted(true);
      return;
    }
    setHighestUnlockedStep((current) => Math.max(current, stepIndex + 1));
    setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  }

  return (
    <main className="min-h-dvh bg-white text-ink">
      <header className="sticky top-0 z-30 bg-white">
        <div className="flex h-[68px] items-center justify-between px-5 sm:px-6">
          <Logo className="text-2xl" />
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/15"
              aria-label={t("header.help")}
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md bg-surface text-ink transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/15"
              aria-label={t("header.account")}
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="border-y border-line bg-surface">
        <div className="mx-auto flex h-12 max-w-[1040px] items-center overflow-x-auto px-4 sm:px-6">
          <ol className="flex min-w-max items-center" aria-label={t("sidebar.aria")}>
            {steps.map((step, index) => {
              const active = index === stepIndex;
              const done = index < stepIndex;
              const locked = index > highestUnlockedStep;
              return (
                <li key={step.key} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => !locked && setStepIndex(index)}
                    disabled={locked}
                    className="group inline-flex h-10 items-center gap-2.5 px-2 text-sm font-medium text-ink disabled:opacity-55"
                    aria-current={active ? "step" : undefined}
                    aria-label={t(`steps.${step.key}`)}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-sm font-semibold transition-colors",
                        active && "bg-ink text-white",
                        done && !active && "bg-brand-600 text-white",
                        !active && !done && "bg-transparent text-ink",
                      )}
                    >
                      {done ? <Check className="h-4 w-4" /> : index + 1}
                    </span>
                    <span>{t(`steps.${step.key}`)}</span>
                  </button>
                  {index < steps.length - 1 ? <ChevronRight className="mx-2 h-4 w-4 text-muted" /> : null}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <section className="mx-auto w-full max-w-[498px] px-6 py-12 sm:py-13">
        {submitted ? (
          <SubmittedView t={t} />
        ) : (
          <>
              <StepHeading
                title={t(`content.${currentStep.key}.title`)}
                step={currentStep.key}
                text={t(`content.${currentStep.key}.text`)}
                eyebrow={t(`content.${currentStep.key}.eyebrow`)}
                current={stepIndex + 1}
                total={steps.length}
              />
              <div className="mt-7">
                <StepBody
                  step={currentStep.key}
                  application={application}
                  countryOptions={countryOptions}
                  phoneOptions={phoneOptions}
                  spokenLanguageOptions={spokenLanguageOptions}
                  timeZoneOptions={timeZoneOptions}
                  updateField={updateField}
                  setApplication={setApplication}
                  t={t}
                />
              </div>
              <div className="mt-8 flex justify-center">
                <Button
                  type="button"
                  size="lg"
                  onClick={next}
                  disabled={!canContinue}
                  className="min-h-12 w-full rounded-md border-2 border-ink bg-brand-500 px-8 text-base font-extrabold text-white shadow-none hover:bg-brand-600 sm:w-auto"
                >
                  {stepIndex === steps.length - 1 ? t("actions.submit") : t("actions.saveContinue")}
                </Button>
              </div>
          </>
        )}
      </section>
    </main>
  );
}

function StepHeading({
  title,
  text,
  step,
  eyebrow,
  current,
  total,
}: {
  title: string;
  text: string;
  step: StepKey;
  eyebrow: string;
  current: number;
  total: number;
}) {
  return (
    <div className="text-left sm:text-left">
      <p className="sr-only">
        {eyebrow} {current}/{total}
      </p>
      <h1 className="font-display text-[2rem] font-extrabold leading-9 text-ink">
        {title}
      </h1>
      <p className={cn("mt-6 text-base font-normal leading-6 text-ink", step === "video" && "max-w-[430px]")}>
        {text}
      </p>
    </div>
  );
}

function StepBody({
  step,
  application,
  countryOptions,
  phoneOptions,
  spokenLanguageOptions,
  timeZoneOptions,
  updateField,
  setApplication,
  t,
}: {
  step: StepKey;
  application: TutorApplication;
  countryOptions: SelectOption[];
  phoneOptions: PhoneCountryOption[];
  spokenLanguageOptions: SelectOption[];
  timeZoneOptions: SelectOption[];
  updateField: <K extends keyof TutorApplication>(key: K, value: TutorApplication[K]) => void;
  setApplication: React.Dispatch<React.SetStateAction<TutorApplication>>;
  t: ReturnType<typeof useTranslations<"tutorOnboarding">>;
}) {
  const [phonePickerOpen, setPhonePickerOpen] = useState(false);
  const selectedPhoneCountry =
    phoneOptions.find((option) => option.value === application.phoneCountry);
  const firstSpokenIndex = application.speaks.findIndex((language, index) =>
    Boolean(language && (application.spokenLanguageLevels[index] || (index === 0 && application.languageLevel))),
  );
  const firstSpokenLanguage = firstSpokenIndex >= 0 ? application.speaks[firstSpokenIndex] : "";
  const firstSpokenLevel =
    firstSpokenIndex >= 0
      ? application.spokenLanguageLevels[firstSpokenIndex] || (firstSpokenIndex === 0 ? application.languageLevel : "")
      : "";
  const selectedSpokenLanguage = spokenLanguageOptions.find((option) => option.value === firstSpokenLanguage);
  const spokenRows = application.speaks.length
    ? application.speaks.map((language, index) => ({
        language,
        level: application.spokenLanguageLevels[index] || (index === 0 ? application.languageLevel : ""),
      }))
    : [{ language: "", level: "" }];

  if (step === "about") {
    const menuProps = {
      align: "start" as const,
      avoidCollisions: false,
      className: "max-h-96 rounded-md text-base",
      side: "bottom" as const,
    };
    const menuItemClass = "min-h-12 py-3 pl-9 pr-3 text-base";
    const syncPhoneCountry = (country: string) => {
      setApplication((current) => {
        const oldCode = callingCodesByCountry[current.phoneCountry];
        const nextCode = callingCodesByCountry[country];
        const shouldReplacePhone = !current.phone.trim() || current.phone === oldCode;

        return {
          ...current,
          phone: nextCode && shouldReplacePhone ? nextCode : current.phone,
          phoneCountry: nextCode ? country : current.phoneCountry,
        };
      });
    };
    const selectBirthCountry = (country: string) => {
      setApplication((current) => {
        const oldCode = callingCodesByCountry[current.phoneCountry];
        const nextCode = callingCodesByCountry[country];
        const shouldReplacePhone = !current.phone.trim() || current.phone === oldCode;

        return {
          ...current,
          country,
          phone: nextCode && shouldReplacePhone ? nextCode : current.phone,
          phoneCountry: nextCode ? country : current.phoneCountry,
        };
      });
    };
    const updateSpokenLanguage = (index: number, value: string) => {
      setApplication((current) => {
        const speaks = current.speaks.length ? [...current.speaks] : [""];
        const spokenLanguageLevels = current.spokenLanguageLevels.length
          ? [...current.spokenLanguageLevels]
          : [current.languageLevel];

        speaks[index] = value;
        spokenLanguageLevels[index] ??= "";

        return {
          ...current,
          speaks,
          spokenLanguageLevels,
        };
      });
    };
    const updateSpokenLevel = (index: number, value: string) => {
      setApplication((current) => {
        const speaks = current.speaks.length ? [...current.speaks] : [""];
        const spokenLanguageLevels = current.spokenLanguageLevels.length
          ? [...current.spokenLanguageLevels]
          : [current.languageLevel];

        speaks[index] ??= "";
        spokenLanguageLevels[index] = value;

        return {
          ...current,
          languageLevel: index === 0 ? value : current.languageLevel,
          speaks,
          spokenLanguageLevels,
        };
      });
    };

    return (
      <div className="grid gap-4">
        <div className="grid gap-4">
          <Field label={t("fields.firstName")}>
            <Input className="h-12 rounded-[8px] border-2 border-[#dcdce5] px-4 text-base shadow-none focus-visible:ring-brand-500/15" value={application.firstName} onChange={(event) => updateField("firstName", event.target.value)} />
          </Field>
          <Field label={t("fields.lastName")}>
            <Input className="h-12 rounded-[8px] border-2 border-[#dcdce5] px-4 text-base shadow-none focus-visible:ring-brand-500/15" value={application.lastName} onChange={(event) => updateField("lastName", event.target.value)} />
          </Field>
          <Field label={t("fields.country")}>
            <Select
              value={application.country || undefined}
              onValueChange={selectBirthCountry}
            >
              <SelectTrigger className="h-12 rounded-[8px] border-2 border-[#dcdce5] px-4 text-base shadow-none">
                <SelectValue placeholder={t("placeholders.chooseCountry")} />
              </SelectTrigger>
              <SelectContent {...menuProps}>{countryOptions.map((option) => <SelectItem key={option.value} value={option.value} className={menuItemClass}>{option.label}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label={t("fields.teaches")}>
            <Select value={application.teaches || undefined} onValueChange={(value) => updateField("teaches", value)}>
              <SelectTrigger className="h-12 rounded-[8px] border-2 border-[#dcdce5] px-4 text-base shadow-none">
                <SelectValue placeholder={t("placeholders.chooseSubject")} />
              </SelectTrigger>
              <SelectContent {...menuProps}>
                {optionsFromKeys(t, "languages", teachingLanguageKeys).map((option) => {
                  const disabled = !activeTeachingLanguageKeys.includes(option.value);

                  return (
                    <SelectItem key={option.value} value={option.value} disabled={disabled} className={menuItemClass}>
                      {option.label}
                      {disabled ? <span className="ml-2 text-sm font-semibold text-muted">{t("labels.comingSoon")}</span> : null}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </Field>
        </div>
        <div className="grid gap-3">
          {spokenRows.map((row, index) => (
            <div key={index} className="grid grid-cols-[minmax(0,1fr)_minmax(128px,0.85fr)] gap-2">
              <Field label={index === 0 ? t("fields.speaks") : t("fields.speaksExtra")}>
                <Select
                  value={row.language || undefined}
                  onValueChange={(value) => updateSpokenLanguage(index, value)}
                >
                  <SelectTrigger className="h-12 rounded-[8px] border-2 border-[#dcdce5] px-4 text-base shadow-none">
                    <SelectValue placeholder={t("placeholders.chooseLanguage")} />
                  </SelectTrigger>
                  <SelectContent {...menuProps}>{spokenLanguageOptions.map((option) => <SelectItem key={option.value} value={option.value} className={menuItemClass}>{option.label}</SelectItem>)}</SelectContent>
                </Select>
              </Field>
              <Field label={index === 0 ? t("fields.level") : t("fields.levelExtra")}>
                <Select value={row.level || undefined} onValueChange={(value) => updateSpokenLevel(index, value)}>
                  <SelectTrigger className="h-12 rounded-[8px] border-2 border-[#dcdce5] px-4 text-base shadow-none">
                    <SelectValue placeholder={t("placeholders.chooseLevel")} />
                  </SelectTrigger>
                  <SelectContent {...menuProps}>
                    {levelKeys.map((level) => (
                      <SelectItem key={level} value={level} className={menuItemClass}>{t(`levels.${level}`)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setApplication((current) => ({
            ...current,
            speaks: current.speaks.length ? [...current.speaks, ""] : ["", ""],
            spokenLanguageLevels: current.spokenLanguageLevels.length ? [...current.spokenLanguageLevels, ""] : ["", ""],
          }))}
          className="-mt-1 w-fit text-base font-extrabold underline underline-offset-2"
        >
          {t("actions.addLanguage")}
        </button>
        <Field label={t("fields.phone")}>
          <div className="relative max-w-[300px]">
            <div className="flex h-12 items-center overflow-hidden rounded-[8px] border-2 border-[#dcdce5] bg-white focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/15">
              <button
                type="button"
                onClick={() => setPhonePickerOpen((current) => !current)}
                className="flex h-full w-12 shrink-0 items-center justify-center gap-1 border-r border-line bg-white text-base outline-none transition-colors hover:bg-surface focus-visible:bg-surface"
                aria-label={t("placeholders.phoneCode")}
                aria-expanded={phonePickerOpen}
              >
                <span aria-hidden>{selectedPhoneCountry?.flag ?? ""}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted" />
              </button>
              <input
                value={application.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className="h-full min-w-0 flex-1 px-3 text-base outline-none placeholder:text-muted"
                inputMode="tel"
                placeholder={t("fields.phone").replace(/\s*\(.+\)\s*$/, "")}
              />
            </div>
            {phonePickerOpen ? (
              <div className="absolute left-0 top-[calc(100%+4px)] z-50 max-h-96 w-full overflow-y-auto rounded-[8px] border border-line bg-white p-1 text-base shadow-card">
                {phoneOptions.map((option) => (
                  <button
                    key={`${option.value}-${option.code}`}
                    type="button"
                    onClick={() => {
                      syncPhoneCountry(option.value);
                      setPhonePickerOpen(false);
                    }}
                    className={cn(
                      "flex min-h-12 w-full items-center gap-3 rounded-md px-3 text-left text-base outline-none transition-colors hover:bg-brand-50 focus-visible:bg-brand-50",
                      option.value === application.phoneCountry && "bg-brand-50 text-brand-700",
                    )}
                  >
                    <span className="text-lg leading-none" aria-hidden>{option.flag}</span>
                    <span className="min-w-0 flex-1 truncate">{option.label}</span>
                    <span className="shrink-0 font-semibold text-ink-soft">{option.code}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </Field>
        <label className="flex min-h-11 items-center gap-3 pt-2 text-base font-extrabold text-ink">
          <Checkbox className="h-5 w-5 rounded-sm border-2 border-[#dcdce5] shadow-none" checked={application.over18} onCheckedChange={(checked) => updateField("over18", checked === true)} />
          <span>{t("fields.over18")}</span>
        </label>
      </div>
    );
  }

  if (step === "photo") {
    return (
      <div className="grid gap-7">
        <div className="border-y border-line py-5">
          <div className="flex items-center gap-5">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center bg-brand-50 text-brand-700">
              <Camera className="h-8 w-8" />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-extrabold text-ink">
                {application.firstName || "DilUp"} {application.lastName ? `${application.lastName.charAt(0)}.` : ""}
              </p>
              <p className="mt-2 text-sm font-medium text-muted">
                {t("photo.profileLine", { language: optionLabel(t, "languages", application.teaches) })}
              </p>
              <p className="mt-2 text-sm font-medium text-muted">
                {t("photo.speaksLine", {
                  language: selectedSpokenLanguage?.label ?? t("preview.empty"),
                  level: firstSpokenLevel ? t(`levels.${firstSpokenLevel}`) : t("preview.empty"),
                })}
              </p>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => updateField("photoReady", true)}
          className={cn(
            "flex h-12 items-center justify-center rounded-md border-2 border-ink bg-white text-sm font-extrabold transition-colors hover:bg-surface",
            application.photoReady && "border-brand-600 text-brand-700",
          )}
        >
          <Upload className="mr-2 h-4 w-4" />
          {application.photoReady ? t("photo.replace") : t("photo.upload")}
        </button>
        <div>
          <h2 className="text-2xl font-extrabold text-ink">{t("photo.needsTitle")}</h2>
          <div className="mt-6 grid grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="aspect-[4/5] rounded-md bg-brand-50" />
            ))}
          </div>
          <GuidelineList items={["face", "light", "plain", "current", "solo", "quality", "noLogos"].map((key) => t(`photo.rules.${key}`))} />
        </div>
      </div>
    );
  }

  if (step === "certification") {
    return (
      <RepeatableBlock
        items={application.certificates}
        addLabel={t("certification.add")}
        onAdd={() => setApplication((current) => ({ ...current, certificates: [...current.certificates, { id: Date.now(), subject: current.teaches, certificate: "", issuedBy: "", year: "" }] }))}
        onRemove={(id) => setApplication((current) => ({ ...current, certificates: current.certificates.filter((item) => item.id !== id) }))}
        render={(item, index) => (
          <div className="grid gap-4">
            <Field label={t("fields.subject")}>
              <Select value={item.subject} onValueChange={(value) => updateCertificate(setApplication, item.id, "subject", value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{optionsFromKeys(t, "languages", teachingLanguageKeys).map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label={t("fields.certificate")}>
              <Input value={item.certificate} onChange={(event) => updateCertificate(setApplication, item.id, "certificate", event.target.value)} placeholder={t("placeholders.certificate")} />
            </Field>
            <Field label={t("fields.issuedBy")}>
              <Input value={item.issuedBy} onChange={(event) => updateCertificate(setApplication, item.id, "issuedBy", event.target.value)} />
            </Field>
            <Field label={t("fields.year")}>
              <Input inputMode="numeric" value={item.year} onChange={(event) => updateCertificate(setApplication, item.id, "year", event.target.value)} />
            </Field>
            <p className="text-sm font-medium text-muted">{t("certification.helper", { number: index + 1 })}</p>
          </div>
        )}
      />
    );
  }

  if (step === "education") {
    return (
      <RepeatableBlock
        items={application.education}
        addLabel={t("education.add")}
        onAdd={() => setApplication((current) => ({ ...current, education: [...current.education, { id: Date.now(), school: "", degree: "", field: "", years: "" }] }))}
        onRemove={(id) => setApplication((current) => ({ ...current, education: current.education.filter((item) => item.id !== id) }))}
        render={(item) => (
          <div className="grid gap-4">
            <Field label={t("fields.school")}>
              <Input value={item.school} onChange={(event) => updateEducation(setApplication, item.id, "school", event.target.value)} />
            </Field>
            <Field label={t("fields.degree")}>
              <Input value={item.degree} onChange={(event) => updateEducation(setApplication, item.id, "degree", event.target.value)} />
            </Field>
            <Field label={t("fields.field")}>
              <Input value={item.field} onChange={(event) => updateEducation(setApplication, item.id, "field", event.target.value)} />
            </Field>
            <Field label={t("fields.years")}>
              <Input value={item.years} onChange={(event) => updateEducation(setApplication, item.id, "years", event.target.value)} placeholder="2018-2022" />
            </Field>
          </div>
        )}
      />
    );
  }

  if (step === "description") {
    return (
      <div className="grid gap-5">
        <Field label={t("fields.headline")} hint={t("hints.headline")}>
          <Input value={application.headline} onChange={(event) => updateField("headline", event.target.value)} placeholder={t("placeholders.headline")} />
        </Field>
        <Field label={t("fields.intro")} hint={t("hints.intro")}>
          <Textarea value={application.intro} onChange={(event) => updateField("intro", event.target.value)} className="min-h-32" />
        </Field>
        <Field label={t("fields.experience")}>
          <Textarea value={application.experience} onChange={(event) => updateField("experience", event.target.value)} className="min-h-28" />
        </Field>
        <Field label={t("fields.motivation")}>
          <Textarea value={application.motivation} onChange={(event) => updateField("motivation", event.target.value)} className="min-h-28" />
        </Field>
      </div>
    );
  }

  if (step === "video") {
    return (
      <div className="grid gap-9 md:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <div className="overflow-hidden rounded-md bg-ink">
            <div className="flex aspect-video items-center justify-center">
              <button
                type="button"
                onClick={() => updateField("videoReady", true)}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-ink transition-transform hover:scale-105"
                aria-label={t("video.record")}
              >
                <Play className="ml-1 h-7 w-7 fill-current" />
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => updateField("videoReady", true)}
            className="mt-5 flex h-11 w-[220px] items-center justify-center rounded-md border-2 border-ink bg-white text-sm font-extrabold transition-colors hover:bg-surface"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {application.videoReady ? t("video.ready") : t("video.upload")}
          </button>
          <p className="mt-4 text-sm leading-6 text-ink">
            {t("video.linkPrompt")} <button type="button" className="font-extrabold underline">{t("video.insertLink")}</button>
          </p>
        </div>
        <div>
          <div className="bg-surface p-6">
            <h2 className="text-2xl font-extrabold text-ink">{t("video.requirementsTitle")}</h2>
            <p className="mt-4 text-sm leading-6 text-ink">{t("video.requirementsText")}</p>
          </div>
          <div className="mt-8">
            <h3 className="flex items-center gap-3 text-lg font-extrabold text-ink">
              <Check className="h-5 w-5 text-success" />
              {t("video.doTitle")}
            </h3>
            <ul className="mt-5 space-y-5 text-sm leading-6 text-ink">
              {["short", "sound", "promise", "invite", "lighting", "stable"].map((key) => (
                <li key={key} className="list-disc marker:text-muted">{t(`video.rules.${key}`)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (step === "availability") {
    return (
      <div className="grid gap-6">
        <Field label={t("fields.timezone")}>
          <Select value={application.timezone} onValueChange={(value) => updateField("timezone", value)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {timeZoneOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <CheckboxGroup
          title={t("fields.days")}
          values={application.days}
          options={optionsFromKeys(t, "days", dayKeys)}
          onChange={(values) => updateField("days", values)}
        />
        <CheckboxGroup
          title={t("fields.times")}
          values={application.times}
          options={optionsFromKeys(t, "times", timeKeys)}
          onChange={(values) => updateField("times", values)}
        />
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-md border border-brand-100 bg-brand-50 p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-brand-800">{t("price.label")}</p>
            <p className="mt-2 font-display text-5xl font-extrabold text-ink">{application.price} ₼</p>
          </div>
          <p className="max-w-44 text-right text-sm font-medium leading-6 text-muted">{t("price.note")}</p>
        </div>
        <Slider
          className="mt-8"
          min={10}
          max={120}
          step={5}
          value={[application.price]}
          onValueChange={(value) => updateField("price", value[0] ?? 30)}
        />
        <div className="mt-3 flex justify-between text-sm font-bold text-muted">
          <span>10 ₼</span>
          <span>120 ₼</span>
        </div>
      </div>
      <div className="rounded-md border border-line bg-white p-5 shadow-soft">
        <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-brand-700">{t("price.payoutTitle")}</p>
        <p className="mt-3 text-lg font-extrabold text-ink">
          {t("price.payout", { amount: formatMoney(application.price * 0.75) })}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">{t("price.payoutText")}</p>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label className="text-base font-normal leading-6 text-ink">{label}</Label>
      {children}
      {hint ? <p className="text-sm font-medium leading-6 text-muted">{hint}</p> : null}
    </div>
  );
}

function CheckboxGroup({
  title,
  values,
  options,
  onChange,
}: {
  title: string;
  values: string[];
  options: SelectOption[];
  onChange: (values: string[]) => void;
}) {
  function toggle(value: string) {
    onChange(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  }

  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-extrabold text-ink">{title}</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex min-h-13 items-center gap-3 rounded-md border bg-white px-4 py-3 text-sm font-bold transition-colors",
              values.includes(option.value) ? "border-brand-500 bg-brand-50 text-brand-800" : "border-line text-ink-soft hover:border-brand-200",
            )}
          >
            <Checkbox checked={values.includes(option.value)} onCheckedChange={() => toggle(option.value)} />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function GuidelineList({ items }: { items: string[] }) {
  return (
    <div className="rounded-md border border-line bg-surface p-5">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-ink-soft">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RepeatableBlock<T extends { id: number }>({
  items,
  addLabel,
  onAdd,
  onRemove,
  render,
}: {
  items: T[];
  addLabel: string;
  onAdd: () => void;
  onRemove: (id: number) => void;
  render: (item: T, index: number) => React.ReactNode;
}) {
  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <div key={item.id} className="rounded-md border border-line bg-surface p-5">
          <div className="mb-4 flex justify-end">
            {items.length > 1 ? (
              <button type="button" onClick={() => onRemove(item.id)} className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-bold text-muted hover:bg-white hover:text-ink">
                <Trash2 className="h-4 w-4" />
              </button>
            ) : null}
          </div>
          {render(item, index)}
        </div>
      ))}
      <Button type="button" variant="outline" className="w-full rounded-md" onClick={onAdd}>
        <Plus className="h-4 w-4" />
        {addLabel}
      </Button>
    </div>
  );
}

function SubmittedView({ t }: { t: ReturnType<typeof useTranslations<"tutorOnboarding">> }) {
  return (
    <div className="mx-auto max-w-2xl py-10 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-600 text-white shadow-brand">
        <Check className="h-10 w-10" />
      </div>
      <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-tight text-ink">
        {t("submitted.title")}
      </h1>
      <p className="mt-4 text-pretty text-lg font-medium leading-8 text-ink-soft">
        {t("submitted.text")}
      </p>
      <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
        {["review", "message", "live"].map((key) => (
          <div key={key} className="rounded-2xl border border-line bg-surface p-4">
            <Clock3 className="h-5 w-5 text-brand-700" />
            <p className="mt-3 text-sm font-extrabold text-ink">{t(`submitted.cards.${key}.title`)}</p>
            <p className="mt-1 text-sm leading-6 text-muted">{t(`submitted.cards.${key}.text`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function optionsFromKeys(
  t: ReturnType<typeof useTranslations<"tutorOnboarding">>,
  namespace: string,
  keys: string[],
): SelectOption[] {
  return keys.map((key) => ({ value: key, label: optionLabel(t, namespace, key) }));
}

function optionLabel(
  t: ReturnType<typeof useTranslations<"tutorOnboarding">>,
  namespace: string,
  key: string,
) {
  return t(`${namespace}.${key}`);
}

function flagFromCountryCode(countryCode: string) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

function updateCertificate<K extends keyof Certificate>(
  setApplication: React.Dispatch<React.SetStateAction<TutorApplication>>,
  id: number,
  key: K,
  value: Certificate[K],
) {
  setApplication((current) => ({
    ...current,
    certificates: current.certificates.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
  }));
}

function updateEducation<K extends keyof Education>(
  setApplication: React.Dispatch<React.SetStateAction<TutorApplication>>,
  id: number,
  key: K,
  value: Education[K],
) {
  setApplication((current) => ({
    ...current,
    education: current.education.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
  }));
}

function isStepValid(step: StepKey, application: TutorApplication) {
  switch (step) {
    case "about":
      return Boolean(
        application.firstName.trim() &&
          application.lastName.trim() &&
          application.country &&
          application.teaches &&
          application.speaks.some((language, index) =>
            Boolean(language && (application.spokenLanguageLevels[index] || (index === 0 && application.languageLevel))),
          ) &&
          application.over18,
      );
    case "photo":
      return application.photoReady;
    case "certification":
      return application.certificates.some((item) => item.certificate.trim() && item.issuedBy.trim());
    case "education":
      return application.education.some((item) => item.school.trim() && item.degree.trim());
    case "description":
      return Boolean(application.headline.trim() && application.intro.trim() && application.experience.trim());
    case "video":
      return application.videoReady;
    case "availability":
      return Boolean(application.days.length && application.times.length);
    case "price":
      return application.price >= 10;
    default:
      return true;
  }
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("az-AZ", {
    minimumFractionDigits: value % 1 ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
}
