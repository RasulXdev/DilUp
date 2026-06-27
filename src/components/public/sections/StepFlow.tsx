import { HowItWorksMock } from "@/components/public/sections/HowItWorksMock";

type Step = { title: string; body: string };
type StepKind = "student" | "tutor";

const BADGES = ["bg-brand-600 text-white", "bg-accent-400 text-ink", "bg-success text-white"];

export function StepFlow({
  id,
  eyebrow,
  title,
  steps,
  kind = "student",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  steps: Step[];
  kind?: StepKind;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
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

        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="flex h-full flex-col rounded-3xl border border-brand-100 bg-white p-7 shadow-soft"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl font-display text-base font-bold ${BADGES[i % BADGES.length]}`}
              >
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{step.body}</p>
              <div className="mt-auto pt-6">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-50">
                  <HowItWorksMock index={i} kind={kind} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
