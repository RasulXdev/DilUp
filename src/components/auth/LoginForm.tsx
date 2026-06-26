"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Link, useRouter } from "@/i18n/navigation";
import { loginSchema, type LoginValues } from "@/lib/validations/auth";
import { isSafeRedirectPath, resolveUserHome } from "@/lib/auth/redirects";
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
  const [showPassword, setShowPassword] = useState(false);
  const [magicSending, setMagicSending] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
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
    const next = searchParams.get("next");
    const fallback = data.user ? await resolveUserHome(supabase, data.user.id) : "/";
    toast.success(t("welcomeBack"));
    router.push(isSafeRedirectPath(next) ? next! : fallback);
    router.refresh();
  }

  async function sendMagicLink() {
    const valid = await trigger("email");
    if (!valid) return;

    setMagicSending(true);
    const email = getValues("email");
    const next = searchParams.get("next");
    const supabase = createClient();
    const redirectTo = new URL(
      `/${window.location.pathname.split("/")[1]}/auth/callback`,
      window.location.origin,
    );
    if (isSafeRedirectPath(next)) {
      redirectTo.searchParams.set("next", next!);
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo.toString(),
      },
    });

    setMagicSending(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(t("magicLinkSent"), { duration: 6000 });
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-ink">
          {t("login.title")}
        </h1>
        <p className="mt-2 text-ink-soft">
          {t("login.noAccount")}{" "}
          <Link
            href="/register"
            className="font-semibold text-brand-600 hover:text-brand-700"
          >
            {t("login.signUpLink")}
          </Link>
        </p>
      </div>

      <SocialButtons />

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
              placeholder="ad@example.com"
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

        <Button
          type="button"
          variant="subtle"
          size="lg"
          className="w-full"
          onClick={sendMagicLink}
          disabled={isSubmitting || magicSending}
        >
          {magicSending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Sparkles className="h-5 w-5" />
          )}
          {t("login.magicLink")}
        </Button>
      </form>
    </div>
  );
}
