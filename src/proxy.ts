import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/proxy";

const handleIntl = createIntlMiddleware(routing);

// Routes that require an authenticated session.
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/tutor-dashboard",
  "/admin",
  "/messages",
  "/lessons",
  "/schedule",
  "/settings",
  "/checkout",
  "/saved-tutors",
  "/room",
];

// Routes a signed-in user shouldn't see.
const AUTH_PREFIXES = ["/login", "/register", "/forgot-password"];

/**
 * Next.js 16 Proxy (formerly Middleware).
 * 1. next-intl resolves the locale & rewrites/redirects.
 * 2. Supabase refreshes the auth session.
 * 3. Role-agnostic auth guard for protected/auth routes.
 */
export async function proxy(request: NextRequest) {
  const response = handleIntl(request);
  const { user } = await updateSession(request, response);

  const segments = request.nextUrl.pathname.split("/");
  const locale = segments[1] || routing.defaultLocale;
  const rest = "/" + segments.slice(2).join("/");

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => rest === p || rest.startsWith(`${p}/`),
  );
  const isAuthPage = AUTH_PREFIXES.some(
    (p) => rest === p || rest.startsWith(`${p}/`),
  );

  if (!user && isProtected) {
    const url = new URL(`/${locale}/login`, request.url);
    url.searchParams.set("next", rest);
    return withCookies(NextResponse.redirect(url), response);
  }

  if (user && isAuthPage) {
    return withCookies(
      NextResponse.redirect(new URL(`/${locale}`, request.url)),
      response,
    );
  }

  return response;
}

/** Preserve refreshed Supabase cookies when issuing a guard redirect. */
function withCookies(redirect: NextResponse, source: NextResponse) {
  source.cookies.getAll().forEach((c) => redirect.cookies.set(c));
  return redirect;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
