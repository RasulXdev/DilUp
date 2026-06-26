import { useTranslations } from "next-intl";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function GuaranteeBanner() {
  const t = useTranslations("guarantee");

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-brand-700 px-6 py-12 text-white sm:px-12 lg:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/40 blob" />
          <div className="absolute -bottom-20 left-1/4 h-64 w-64 rounded-full bg-accent-400/20 blob" />
        </div>

        <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-accent-300" />
              DilUp
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-3 text-lg text-brand-100">{t("text")}</p>
          </div>
          <Link
            href="/get-started"
            className={cn(
              buttonVariants({ variant: "accent", size: "lg" }),
              "shrink-0",
            )}
          >
            {t("cta")}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
