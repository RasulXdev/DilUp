import { useTranslations } from "next-intl";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Link } from "@/i18n/navigation";
import { getPublicPageCopy } from "@/lib/public-pages";
import { PageHero } from "@/components/public/sections/PageHero";
import { ContactForm } from "@/components/public/sections/ContactForm";
import { ICONS } from "@/components/public/sections/icons";

export function ContactPage({ locale }: { locale: string }) {
  const copy = getPublicPageCopy(locale, "contact");
  const t = useTranslations("publicPages");

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <PageHero
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          image={copy.heroImage}
          imageAlt={copy.title}
        />

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-16">
            {/* Methods */}
            <div className="space-y-4">
              {copy.methods.map((method) => {
                const Icon = ICONS[method.icon];
                const inner = (
                  <div className="flex items-start gap-4 rounded-2xl border border-line bg-white p-6 shadow-soft transition-colors hover:border-brand-200">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-extrabold text-ink">
                        {method.title}
                      </h3>
                      <p className="mt-1 text-ink-soft">{method.value}</p>
                    </div>
                  </div>
                );
                if (!method.href) return <div key={method.title}>{inner}</div>;
                return method.href.startsWith("/") ? (
                  <Link key={method.title} href={method.href} className="block">
                    {inner}
                  </Link>
                ) : (
                  <a key={method.title} href={method.href} className="block">
                    {inner}
                  </a>
                );
              })}
            </div>

            {/* Form */}
            <div className="rounded-3xl border border-line bg-surface p-7 shadow-soft sm:p-8">
              <h2 className="font-display text-xl font-extrabold text-ink">
                {copy.formTitle}
              </h2>
              <div className="mt-6">
                <ContactForm
                  email={copy.email}
                  labels={{
                    name: t("form.name"),
                    email: t("form.email"),
                    message: t("form.message"),
                    submit: t("form.submit"),
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
