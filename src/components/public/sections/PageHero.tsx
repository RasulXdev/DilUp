import Image from "next/image";

type Stat = { value: string; label: string };

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  stats,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  stats?: Stat[];
}) {
  const split = Boolean(image);

  return (
    <section className="relative overflow-hidden border-b border-line bg-brand-50/70">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-200/45 blur-3xl" />
        <div className="absolute -right-16 top-10 h-64 w-64 rounded-full bg-accent-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div
          className={
            split
              ? "grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-16"
              : "mx-auto max-w-5xl"
          }
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-700 shadow-sm backdrop-blur">
              {eyebrow}
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
              {description}
            </p>

            {stats && (
              <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-brand-100 bg-white/85 p-5 shadow-soft backdrop-blur"
                  >
                    <dt className="font-display text-3xl font-extrabold text-brand-700">
                      {stat.value}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-snug text-ink-soft">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {split && (
            <div className="relative mx-auto w-full max-w-[460px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-brand-100 shadow-card">
                <Image
                  src={image as string}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 1024px) 460px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              <span
                aria-hidden
                className="animate-float absolute -left-4 -bottom-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-400 font-display text-2xl font-extrabold text-ink shadow-accent"
              >
                ★
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
