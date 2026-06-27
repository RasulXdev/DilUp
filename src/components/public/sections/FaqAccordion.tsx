import { Plus } from "lucide-react";

type FaqItem = { q: string; a: string };
type FaqGroup = { title?: string; items: FaqItem[] };

export function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-3xl space-y-12">
        {groups.map((group, gi) => (
          <div key={group.title ?? gi}>
            {group.title && (
              <h2 className="mb-5 font-display text-xl font-extrabold text-ink">
                {group.title}
              </h2>
            )}
            <div className="space-y-3">
              {group.items.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-line bg-white px-5 shadow-soft transition-colors open:border-brand-200 open:bg-brand-50/40"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-transform duration-200 group-open:rotate-45">
                      <Plus className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className="pb-5 leading-7 text-ink-soft">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
