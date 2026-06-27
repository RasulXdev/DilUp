"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Bell,
  BookOpen,
  Gift,
  Heart,
  HelpCircle,
  Home,
  Loader2,
  LogIn,
  LogOut,
  Maximize2,
  Menu,
  MessageCircle,
  Settings,
  User as UserIcon,
  X,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/shared/Logo";
import { LocaleCurrencySwitcher } from "@/components/shared/LocaleCurrencySwitcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

function displayName(user: User | null) {
  if (!user) return null;
  const fullName = user.user_metadata?.full_name as string | undefined;
  return fullName?.trim() || user.email?.split("@")[0] || "";
}

function avatarUrl(user: User | null) {
  if (!user) return null;
  return (
    (user.user_metadata?.avatar_url as string | undefined) ||
    (user.user_metadata?.picture as string | undefined) ||
    null
  );
}

function initials(user: User | null) {
  const name = displayName(user);
  if (!name) return "D";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

type Panel = "messages" | "notifications";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [panel, setPanel] = useState<Panel | null>(null);
  const [showConfirmBanner, setShowConfirmBanner] = useState(true);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active) setUser(data.user);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const userName = displayName(user);
  const userAvatar = avatarUrl(user);
  const emailNeedsConfirmation = Boolean(user?.email && !user.email_confirmed_at);
  const showEmailBanner = Boolean(user && emailNeedsConfirmation && showConfirmBanner);

  const links = [
    { href: "/tutors", label: t("findTutors") },
    { href: "/become-tutor", label: t("becomeTutor") },
    { href: "/how-it-works", label: t("howItWorks") },
    { href: "/how-it-works#results", label: t("outcomes") },
  ];

  const menuLinks = [
    { href: "/", label: t("account.home"), icon: Home },
    { href: "/messages", label: t("account.messages"), icon: MessageCircle },
    { href: "/lessons", label: t("account.lessons"), icon: BookOpen },
    { href: "/saved-tutors", label: t("account.savedTutors"), icon: Heart },
    { href: "/refer", label: t("account.refer"), icon: Gift },
    { href: "/settings", label: t("account.settings"), icon: Settings },
    { href: "/contact", label: t("account.help"), icon: HelpCircle },
  ];

  async function resendConfirmation() {
    if (!user?.email) return;
    setResending(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: user.email,
      options: {
        emailRedirectTo: `${window.location.origin}/${locale}/auth/callback`,
      },
    });
    setResending(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(t("emailConfirm.sent"));
  }

  return (
    <header className="sticky top-0 z-40 bg-brand-300">
      {showEmailBanner ? (
        <div className="flex min-h-14 items-center justify-between gap-4 bg-brand-50 px-5 py-3 text-sm font-semibold text-ink sm:px-7 lg:px-8 xl:px-10">
          <p>{t("emailConfirm.text", { email: user?.email ?? "" })}</p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resendConfirmation}
              disabled={resending}
              className="border-brand-300 bg-white"
            >
              {resending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {t("emailConfirm.resend")}
            </Button>
            <button
              type="button"
              onClick={() => setShowConfirmBanner(false)}
              aria-label={t("emailConfirm.close")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-soft hover:bg-white hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : null}
      <nav className="flex h-18 w-full items-center justify-between gap-4 px-5 sm:px-7 lg:px-8 xl:px-10">
        <div className="flex items-center gap-7">
          <Logo />
          <ul className="hidden min-w-0 items-center gap-0.5 xl:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-full px-2.5 py-2 text-xs font-semibold text-ink-soft transition-colors hover:bg-white/80 hover:text-brand-700 2xl:px-3.5 2xl:text-sm"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <Link
              href="/refer"
              className={cn(
                buttonVariants({ variant: "outline", size: "md" }),
                "border-brand-200 bg-white/80 hover:bg-white",
              )}
            >
              {t("referFriend")}
            </Link>
          ) : null}
          <LocaleCurrencySwitcher />
          {userName ? (
            <>
              <button
                type="button"
                onClick={() => setPanel("messages")}
                aria-label={t("actions.messages")}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-white/70 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                <MessageCircle className="h-5 w-5" />
              </button>
              <Link
                href="/contact"
                aria-label={t("help")}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-white/70 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                <HelpCircle className="h-5 w-5" />
              </Link>
              <Link
                href="/saved-tutors"
                aria-label={t("actions.savedTutors")}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-white/70 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                <Heart className="h-5 w-5" />
              </Link>
              <button
                type="button"
                onClick={() => setPanel("notifications")}
                aria-label={t("actions.notifications")}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-white/70 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                <Bell className="h-5 w-5" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    aria-label={t("actions.account")}
                    className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                  >
                    <Avatar className="h-11 w-11 border-2 border-white shadow-sm">
                      {userAvatar ? <AvatarImage src={userAvatar} alt={userName} /> : null}
                      <AvatarFallback className="bg-brand-700 text-sm font-extrabold text-white">
                        {initials(user)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 rounded-2xl p-2">
                  <DropdownMenuLabel className="flex items-center gap-3 px-2 py-3">
                    <Avatar className="h-12 w-12">
                      {userAvatar ? <AvatarImage src={userAvatar} alt={userName} /> : null}
                      <AvatarFallback className="bg-brand-700 text-base font-extrabold text-white">
                        {initials(user)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="min-w-0">
                      <span className="block truncate text-base font-extrabold text-ink">
                        {userName}
                      </span>
                      <span className="block truncate text-xs font-medium text-muted">
                        {user?.email}
                      </span>
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {menuLinks.map(({ href, label, icon: Icon }) => (
                    <DropdownMenuItem key={href} asChild>
                      <Link href={href} className="py-2.5">
                        <Icon className="h-4 w-4 text-brand-700" />
                        {label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <form action={`/${locale}/auth/signout`} method="post">
                    <DropdownMenuItem asChild>
                      <button type="submit" className="w-full py-2.5 text-left">
                        <LogOut className="h-4 w-4 text-brand-700" />
                        {t("signOut")}
                      </button>
                    </DropdownMenuItem>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link
                href="/contact"
                aria-label={t("help")}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-white/70 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                <HelpCircle className="h-5 w-5" />
              </Link>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "md" }),
                  "border-transparent bg-transparent shadow-none hover:border-transparent hover:bg-white/70",
                )}
              >
                <LogIn className="h-4 w-4" />
                {t("logIn")}
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleCurrencySwitcher className="hidden sm:block" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-transparent bg-transparent text-ink cursor-pointer hover:bg-white/70"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-brand-300/55 bg-brand-100 lg:hidden">
          <div className="flex w-full flex-col gap-1 px-5 py-4 sm:px-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-base font-semibold text-ink-soft hover:bg-brand-50 hover:text-brand-700"
              >
                {l.label}
              </Link>
            ))}
            <LocaleCurrencySwitcher className="mt-3 sm:hidden" />
            <div className="mt-3 flex flex-col gap-2">
              {userName ? (
                <>
                  <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-3">
                    <Avatar className="h-11 w-11">
                      {userAvatar ? <AvatarImage src={userAvatar} alt={userName} /> : null}
                      <AvatarFallback className="bg-brand-700 font-extrabold text-white">
                        {initials(user)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="min-w-0">
                      <span className="block truncate text-base font-extrabold text-ink">
                        {userName}
                      </span>
                      <span className="block truncate text-xs font-semibold text-muted">
                        {user?.email}
                      </span>
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        setPanel("messages");
                      }}
                      aria-label={t("actions.messages")}
                      className="flex h-12 items-center justify-center rounded-full bg-white/75 text-brand-700"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </button>
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      aria-label={t("help")}
                      className="flex h-12 items-center justify-center rounded-full bg-white/75 text-brand-700"
                    >
                      <HelpCircle className="h-5 w-5" />
                    </Link>
                    <Link
                      href="/saved-tutors"
                      onClick={() => setOpen(false)}
                      aria-label={t("actions.savedTutors")}
                      className="flex h-12 items-center justify-center rounded-full bg-white/75 text-brand-700"
                    >
                      <Heart className="h-5 w-5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        setPanel("notifications");
                      }}
                      aria-label={t("actions.notifications")}
                      className="flex h-12 items-center justify-center rounded-full bg-white/75 text-brand-700"
                    >
                      <Bell className="h-5 w-5" />
                    </button>
                  </div>
                  {menuLinks.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-base font-semibold text-ink-soft hover:bg-brand-50 hover:text-brand-700"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  ))}
                  <form action={`/${locale}/auth/signout`} method="post">
                    <button
                      type="submit"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "w-full",
                      )}
                    >
                      <LogOut className="h-4 w-4" />
                      {t("signOut")}
                    </button>
                  </form>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                >
                  <LogIn className="h-4 w-4" />
                  {t("logIn")}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <Sheet open={panel !== null} onOpenChange={(isOpen) => setPanel(isOpen ? panel : null)}>
        <SheetContent className="flex w-full flex-col p-0 sm:max-w-xl">
          {panel === "notifications" ? (
            <>
              <SheetHeader className="border-b border-line px-7 py-6 text-left">
                <SheetTitle className="text-2xl font-extrabold">
                  {t("notifications.title")}
                </SheetTitle>
                <SheetDescription className="sr-only">
                  {t("notifications.description")}
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-1 items-center justify-center px-8 text-center">
                <div className="max-w-sm">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <Bell className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 text-xl font-extrabold text-ink">
                    {t("notifications.emptyTitle")}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-ink-soft">
                    {t("notifications.emptyText")}
                  </p>
                </div>
              </div>
            </>
          ) : null}

          {panel === "messages" ? (
            <>
              <SheetHeader className="border-b border-line px-7 pb-0 pt-6 text-left">
                <div className="flex items-center justify-between pr-8">
                  <SheetTitle className="text-2xl font-extrabold">
                    {t("messages.title")}
                  </SheetTitle>
                  <Link
                    href="/messages"
                    aria-label={t("messages.openFull")}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-soft hover:bg-surface hover:text-brand-700"
                  >
                    <Maximize2 className="h-5 w-5" />
                  </Link>
                </div>
                <SheetDescription className="sr-only">
                  {t("messages.description")}
                </SheetDescription>
                <div className="mt-6 flex gap-8 text-sm font-bold text-muted">
                  <span className="border-b-4 border-brand-600 pb-4 text-ink">
                    {t("messages.all")}
                  </span>
                  <span className="pb-4">{t("messages.unread")}</span>
                  <span className="pb-4">{t("messages.archived")}</span>
                </div>
              </SheetHeader>
              <div className="flex flex-1 items-center justify-center px-8 text-center">
                <div className="max-w-sm">
                  <h3 className="text-lg font-extrabold text-ink">
                    {t("messages.emptyTitle")}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-ink-soft">
                    {t("messages.emptyText")}
                  </p>
                  <Link
                    href="/get-started"
                    className={cn(buttonVariants({ variant: "primary", size: "md" }), "mt-5")}
                  >
                    <UserIcon className="h-4 w-4" />
                    {t("messages.cta")}
                  </Link>
                </div>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </header>
  );
}
