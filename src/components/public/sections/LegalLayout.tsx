type LegalSection = { id: string; title: string; body: string[] };

export function LegalLayout({
  updated,
  tocLabel,
  sections,
}: {
  updated?: string;
  tocLabel: string;
  sections: LegalSection[];
}) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[240px_1fr]">
        {/* Sticky TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
              {tocLabel}
            </p>
            <nav className="mt-4 space-y-2">
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-sm leading-6 text-ink-soft transition-colors hover:text-brand-700"
                >
                  {String(i + 1).padStart(2, "0")}. {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="max-w-2xl">
          {updated && (
            <p className="mb-8 text-sm text-muted">{updated}</p>
          )}
          <div className="space-y-12">
            {sections.map((s, i) => (
              <article key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="font-display text-2xl font-extrabold text-ink">
                  <span className="text-brand-400">{String(i + 1).padStart(2, "0")}.</span>{" "}
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {s.body.map((p, pi) => (
                    <p key={pi} className="leading-8 text-ink-soft">
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
