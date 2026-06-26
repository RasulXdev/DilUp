import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/shared/Logo";

export function Footer() {
  const t = useTranslations("footer");

  const columns = [
    {
      title: t("company"),
      links: [
        { href: "/about", label: t("about") },
        { href: "/contact", label: t("contact") },
        { href: "/become-tutor", label: t("careers") },
      ],
    },
    {
      title: t("forStudents"),
      links: [
        { href: "/tutors", label: t("findTutors") },
        { href: "/how-it-works", label: t("howItWorks") },
        { href: "/faq", label: t("faq") },
      ],
    },
    {
      title: t("forTutors"),
      links: [
        { href: "/become-tutor", label: t("becomeTutor") },
        { href: "/how-it-works", label: t("howItWorks") },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/privacy", label: t("privacy") },
        { href: "/terms", label: t("terms") },
      ],
    },
  ];

  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {t("madeIn")} 🇦🇿
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-bold text-ink">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-brand-600"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} DilUp. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
