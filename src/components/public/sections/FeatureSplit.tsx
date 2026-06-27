import Image from "next/image";
import type { ReactNode } from "react";
import { Check } from "lucide-react";

export function FeatureSplit({
  eyebrow,
  title,
  body,
  bullets,
  image,
  imageAlt = "",
  visual,
  reverse = false,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  bullets?: string[];
  image?: string;
  imageAlt?: string;
  visual?: ReactNode;
  reverse?: boolean;
}) {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={reverse ? "lg:order-2" : ""}>
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink-soft">{body}</p>

          {bullets && (
            <ul className="mt-6 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="leading-7 text-ink">{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={reverse ? "lg:order-1" : ""}>
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl bg-brand-100 shadow-card">
            {visual ?? (
              <Image
                src={image as string}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
