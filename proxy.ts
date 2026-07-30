// ============================================================================
// proxy.ts — Next.js 16 Route Protection
// Replaces the deprecated middleware.ts convention.
// Refreshes Supabase sessions and protects /dashboard routes.
// ============================================================================

import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  try {
    const { user, supabaseResponse } = await updateSession(request);

    const { pathname } = request.nextUrl;

    // Protected routes: redirect unauthenticated users to /login
    if (pathname.startsWith("/dashboard")) {
      if (!user) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }

    // Auth routes: redirect authenticated users to /dashboard
    if (pathname === "/login" || pathname === "/register") {
      if (user) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    return supabaseResponse;
  } catch (error) {
    console.error("Error in Next.js proxy middleware:", error);
    return NextResponse.next();
  }
}

// Only run proxy on relevant routes; skip static assets and API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - Public assets (images, svgs)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
