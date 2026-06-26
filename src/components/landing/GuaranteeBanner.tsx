import { useTranslations } from "next-intl";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function GuaranteeBanner() {
  const t = useTranslations("guarantee");

  return (
    <section className="relative overflow-hidden bg-accent-400">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-300/50 blob" />
        <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-accent-500/30 blob" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-12 text-center sm:px-6 lg:py-14">
        <span className="inline-flex items-center gap-2 rounded-full bg-ink/10 px-3.5 py-1 text-xs font-bold text-ink">
          <ShieldCheck className="h-3.5 w-3.5" />
          DilUp
        </span>
        <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-xl text-base font-medium text-ink/80 sm:text-lg">
          {t("text")}
        </p>
        <Link
          href="/get-started"
          className={cn(
            buttonVariants({ variant: "primary", size: "lg" }),
            "mt-7 h-12 px-7 text-base shadow-brand",
          )}
        >
          {t("cta")}
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
