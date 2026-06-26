import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/proxy";

const handleIntl = createIntlMiddleware(routing);

/**
 * Next.js 16 Proxy (formerly Middleware).
 * 1. next-intl resolves the locale & rewrites/redirects the request.
 * 2. Supabase refreshes the auth session, attaching cookies to that response.
 */
export async function proxy(request: NextRequest) {
  const response = handleIntl(request);
  return updateSession(request, response);
}

export const config = {
  // Run on everything except API routes, Next internals and static files.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
