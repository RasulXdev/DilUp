import { ICONS, type IconKey } from "./icons";

type Value = { icon: IconKey; title: string; body: string };

export function ValueGrid({
  eyebrow,
  title,
  items,
}: {
  eyebrow?: string;
  title?: string;
  items: Value[];
}) {
  return (
    <section className="bg-surface px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title) && (
          <div className="mb-12 max-w-2xl">
            {eyebrow && (
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                {title}
              </h2>
            )}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <article
                key={item.title}
                className="group rounded-2xl border border-line bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-extrabold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-ink-soft">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
