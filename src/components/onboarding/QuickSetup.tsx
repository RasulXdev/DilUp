"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, Clock3, Globe2, Loader2, Target } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const subjects = [
  { value: "english", flag: "🇬🇧" },
  { value: "russian", flag: "🇷🇺" },
  { value: "turkish", flag: "🇹🇷" },
] as const;

const goals = ["career", "culture", "exams", "kids"] as const;
const schedules = ["morning", "afternoon", "evening"] as const;

export function QuickSetup() {
  const t = useTranslations("quickSetup");
  const onboardingT = useTranslations("onboarding");
  const router = useRouter();
  const [subject, setSubject] = useState("english");
  const [goal, setGoal] = useState("career");
  const [schedule, setSchedule] = useState("evening");
  const [saving, setSaving] = useState(false);

  const subjectOptions = useMemo(
    () =>
      subjects.map((item) => ({
        ...item,
        label: onboardingT(`subjects.${item.value}`),
      })),
    [onboardingT],
  );

  async function completeSetup(skipped = false) {
    setSaving(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login?next=/setup");
      return;
    }

    const sessionId = `quick-${user.id}-${Date.now()}`;
    const { error } = await supabase.from("onboarding_responses").insert({
      user_id: user.id,
      session_id: sessionId,
      goal: skipped ? null : goal,
      specialties: skipped ? [] : [subject],
      available_times: skipped ? [] : [schedule],
      converted_to_signup: true,
      free_text: skipped ? "quick_setup_skipped" : "quick_setup_completed",
    });

    if (error) {
      toast.error(t("error"));
      setSaving(false);
      return;
    }

    toast.success(skipped ? t("skipped") : t("saved"));
    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-dvh bg-brand-50">
      <section className="mx-auto flex min-h-dvh max-w-6xl items-center px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-line bg-white shadow-card lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="hidden bg-brand-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-700">
                <Target className="h-6 w-6" />
              </span>
              <h1 className="mt-8 max-w-sm font-display text-5xl font-extrabold leading-tight">
                {t("title")}
              </h1>
              <p className="mt-5 max-w-sm text-lg leading-8 text-white/78">
                {t("text")}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[Globe2, Target, Clock3].map((Icon, index) => (
                <div
                  key={index}
                  className="flex h-20 items-center justify-center rounded-2xl bg-white/12"
                >
                  <Icon className="h-7 w-7" />
                </div>
              ))}
            </div>
          </aside>

          <div className="p-6 sm:p-8 lg:p-12">
            <p className="text-sm font-extrabold uppercase tracking-wide text-brand-700">
              {t("eyebrow")}
            </p>
            <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:hidden">
              {t("title")}
            </h1>
            <p className="mt-3 text-base leading-7 text-ink-soft lg:hidden">
              {t("text")}
            </p>

            <div className="mt-8 space-y-8">
              <ChoiceGroup title={t("subject")}>
                {subjectOptions.map((item) => (
                  <ChoiceButton
                    key={item.value}
                    active={subject === item.value}
                    onClick={() => setSubject(item.value)}
                    label={`${item.flag} ${item.label}`}
                  />
                ))}
              </ChoiceGroup>

              <ChoiceGroup title={t("goal")}>
                {goals.map((item) => (
                  <ChoiceButton
                    key={item}
                    active={goal === item}
                    onClick={() => setGoal(item)}
                    label={onboardingT(`goals.${item}`)}
                  />
                ))}
              </ChoiceGroup>

              <ChoiceGroup title={t("schedule")}>
                {schedules.map((item) => (
                  <ChoiceButton
                    key={item}
                    active={schedule === item}
                    onClick={() => setSchedule(item)}
                    label={onboardingT(`times.${item}`)}
                  />
                ))}
              </ChoiceGroup>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                size="lg"
                className="h-13 flex-1 rounded-xl"
                onClick={() => void completeSetup(false)}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    {t("continue")}
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="h-13 rounded-xl px-7"
                onClick={() => void completeSetup(true)}
                disabled={saving}
              >
                {t("skip")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ChoiceGroup({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-extrabold text-ink">{title}</h2>
      <div className="flex flex-wrap gap-2.5">{children}</div>
    </section>
  );
}

function ChoiceButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 text-sm font-extrabold transition",
        active
          ? "border-brand-700 bg-brand-50 text-brand-800"
          : "border-line bg-white text-ink hover:border-brand-300 hover:bg-brand-50",
      )}
    >
      {label}
      {active && <Check className="h-4 w-4" />}
    </button>
  );
}
