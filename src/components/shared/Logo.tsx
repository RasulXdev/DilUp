import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * DilUp wordmark. The rising bars + ascending "Up" encode the brand idea of
 * levelling up a language. Blue-dominant, gold tick on the final bar.
 */
export function Logo({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-ink",
        className,
      )}
      aria-label="DilUp"
    >
      <span
        className="flex h-9 w-9 items-end justify-center gap-[3px] rounded-xl bg-brand-600 px-2 pb-2 shadow-brand transition-transform group-hover:-translate-y-0.5"
        aria-hidden
      >
        <span className="h-2.5 w-[3px] rounded-full bg-white/60" />
        <span className="h-3.5 w-[3px] rounded-full bg-white/80" />
        <span className="h-5 w-[3px] rounded-full bg-accent-400" />
      </span>
      <span>
        Dil<span className="text-brand-600">Up</span>
      </span>
    </Link>
  );
}
