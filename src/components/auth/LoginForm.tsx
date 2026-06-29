"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Link, useRouter } from "@/i18n/navigation";
import { loginSchema, type LoginValues } from "@/lib/validations/auth";
import { isSafeRedirectPath, resolvePostAuthPath } from "@/lib/auth/redirects";
import { claimOnboardingSession } from "@/lib/auth/onboarding-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { SocialButtons } from "./SocialButtons";

export function LoginForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") === "tutor" ? "tutor" : "student";
  const isTutorAuth = role === "tutor";
  const rawNext = searchParams.get("next");
  const safeNext = isSafeRedirectPath(rawNext) ? rawNext : null;
  const next = safeNext ?? (role === "tutor" ? "/tutor-onboarding" : "/tutors");
  const encodedNext = encodeURIComponent(next);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginValues) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      toast.error(t("errors.invalidCredentials"));
      return;
    }
    const sessionId = window.localStorage.getItem("dilup_onboarding_session");
    if (sessionId && data.user) {
      await claimOnboardingSession(sessionId);
    }
    const fallback = data.user
      ? await resolvePostAuthPath(supabase, data.user.id)
      : "/";
    const destination = safeNext ?? (role === "tutor" ? "/tutor-onboarding" : fallback);
    toast.success(t("welcomeBack"));
    router.push(destination);
    router.refresh();
  }

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-extrabold text-ink">
          {isTutorAuth ? t("login.titleTutor") : t("login.title")}
        </h1>
        {isTutorAuth ? (
          <p className="mt-3 text-sm leading-6 text-ink-soft">
            {t("login.noTutorAccount")}{" "}
            <Link
              href={`/register/tutor?next=${encodedNext}`}
              className="font-semibold text-brand-600 underline underline-offset-4 hover:text-brand-700"
            >
              {t("login.signUpTutor")}
            </Link>
          </p>
        ) : (
          <p className="mx-auto mt-4 grid max-w-sm grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-1.5 text-center text-[13px] text-ink-soft sm:text-sm">
            <Link
              href={`/register?next=${encodedNext}`}
              className="min-w-0 leading-snug font-semibold text-brand-600 underline underline-offset-4 hover:text-brand-700"
            >
              {t("login.signUpStudent")}
            </Link>{" "}
            <span>{t("login.signUpOr")}</span>
            <Link
              href="/become-tutor"
              className="min-w-0 leading-snug font-semibold text-brand-600 underline underline-offset-4 hover:text-brand-700"
            >
              {t("login.signUpTutor")}
            </Link>
          </p>
        )}
      </div>

      <SocialButtons next={next} role={role} />

      <div className="my-6 flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          {t("orEmail")}
        </span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="email">{t("fields.email")}</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={t("fields.emailPlaceholder")}
              className="pl-11"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive">{t("errors.email")}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t("fields.password")}</Label>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              {t("login.forgot")}
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className="pl-11 pr-11"
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? t("hidePassword") : t("showPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted hover:text-ink cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="h-4.5 w-4.5" />
              ) : (
                <Eye className="h-4.5 w-4.5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Checkbox id="remember" defaultChecked />
          <Label htmlFor="remember" className="font-normal text-ink-soft">
            {t("login.remember")}
          </Label>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              {t("login.submit")}
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
