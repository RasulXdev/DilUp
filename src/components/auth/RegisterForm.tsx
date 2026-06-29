"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { User, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Link, useRouter } from "@/i18n/navigation";
import { registerSchema, type RegisterValues } from "@/lib/validations/auth";
import { isSafeRedirectPath, resolvePostAuthPath } from "@/lib/auth/redirects";
import { claimOnboardingSession } from "@/lib/auth/onboarding-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SocialButtons } from "./SocialButtons";

export function RegisterForm({
  variant = "student",
}: {
  variant?: "student" | "tutor";
}) {
  const t = useTranslations("auth");
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(values: RegisterValues) {
    const supabase = createClient();
    const callbackUrl = new URL(
      `/${locale}/auth/callback`,
      window.location.origin,
    );
    callbackUrl.searchParams.set("role", variant);
    const next = searchParams.get("next");
    const safeNext = isSafeRedirectPath(next) ? next : null;
    if (safeNext) {
      callbackUrl.searchParams.set("next", safeNext);
    }

    // Carry the anonymous onboarding session so it can be linked to the new
    // account — works whether or not email confirmation is enabled (the
    // callback reads it from metadata when there is no immediate session).
    const onboardingSession =
      window.localStorage.getItem("dilup_onboarding_claim_session") ??
      window.localStorage.getItem("dilup_onboarding_session") ??
      undefined;

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.fullName,
          intended_role: variant,
          ...(onboardingSession
            ? { onboarding_session: onboardingSession }
            : {}),
        },
        emailRedirectTo: callbackUrl.toString(),
      },
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data.session) {
      await supabase
        .from("profiles")
        .update({ role: variant, full_name: values.fullName })
        .eq("id", data.session.user.id);
      if (variant === "tutor") {
        await supabase.rpc("ensure_tutor_profile");
      }
      const sessionId =
        window.localStorage.getItem("dilup_onboarding_claim_session") ??
        window.localStorage.getItem("dilup_onboarding_session");
      if (sessionId) {
        await claimOnboardingSession(sessionId);
      }
      const home = await resolvePostAuthPath(supabase, data.session.user.id);
      const destination = safeNext ?? home;
      toast.success(t("accountCreated"));
      router.push(destination);
      router.refresh();
    } else {
      toast.success(t("checkEmail"), { duration: 6000 });
    }
  }

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-extrabold text-ink">
          {variant === "tutor" ? t("register.titleTutor") : t("register.title")}
        </h1>
        <p className="mt-2 text-ink-soft">
          {t("register.haveAccount")}{" "}
          <Link
            href="/login"
            className="font-semibold text-brand-600 hover:text-brand-700"
          >
            {t("register.logInLink")}
          </Link>
        </p>
        <p className="mx-auto mt-4 grid max-w-sm grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-1.5 text-center text-[13px] text-ink-soft sm:text-sm">
          <Link
            href="/register"
            className="min-w-0 leading-snug font-semibold text-brand-600 underline underline-offset-4 hover:text-brand-700"
          >
            {t("login.signUpStudent")}
          </Link>
          <span>{t("login.signUpOr")}</span>
          <Link
            href="/become-tutor"
            className="min-w-0 leading-snug font-semibold text-brand-600 underline underline-offset-4 hover:text-brand-700"
          >
            {t("login.signUpTutor")}
          </Link>
        </p>
      </div>

      <SocialButtons role={variant} />

      <div className="my-6 flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          {t("orEmail")}
        </span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="fullName">{t("fields.fullName")}</Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted" />
            <Input
              id="fullName"
              autoComplete="name"
              placeholder={t("fields.fullNamePlaceholder")}
              className="pl-11"
              aria-invalid={!!errors.fullName}
              {...register("fullName")}
            />
          </div>
          {errors.fullName && (
            <p className="text-sm text-destructive">{t("errors.fullName")}</p>
          )}
        </div>

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
          <Label htmlFor="password">{t("fields.password")}</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder={t("fields.passwordHint")}
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
          {errors.password ? (
            <p className="text-sm text-destructive">{t("errors.password")}</p>
          ) : (
            <p className="text-xs text-muted">{t("fields.passwordHint")}</p>
          )}
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
              {t("register.submit")}
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>

        <p className="text-center text-xs leading-relaxed text-muted">
          {t.rich("register.terms", {
            terms: (c) => (
              <Link href="/terms" className="underline hover:text-ink">
                {c}
              </Link>
            ),
            privacy: (c) => (
              <Link href="/privacy" className="underline hover:text-ink">
                {c}
              </Link>
            ),
          })}
        </p>
      </form>
    </div>
  );
}
