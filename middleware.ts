import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales, Locale } from "@/data/locales";

// Helper to determine the best locale from the Accept-Language header
function getDeviceLocale(header: string | null): Locale {
  if (!header) return defaultLocale;

  try {
    // Parse language tags and sort by quality factor (q)
    // Example: "ar-IQ,ar;q=0.9,en-US;q=0.8,en;q=0.7"
    const languages = header
      .split(",")
      .map((part) => {
        const [langWithSub, qPart] = part.trim().split(";");
        const lang = langWithSub.trim().toLowerCase();
        let q = 1.0;
        if (qPart && qPart.trim().startsWith("q=")) {
          const parsedQ = parseFloat(qPart.trim().replace("q=", ""));
          if (!isNaN(parsedQ)) {
            q = parsedQ;
          }
        }
        return { lang, q };
      })
      .sort((a, b) => b.q - a.q);

    for (const { lang } of languages) {
      if (lang.startsWith("ar")) {
        return "ar";
      }
      if (lang.startsWith("en")) {
        return "en";
      }
    }
  } catch {
    // Fallback on parse failure
    return defaultLocale;
  }

  // If user system language is not Arabic or English, default to English
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Ignore internal Next.js assets, API routes, and static files with extensions
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // Check if pathname already starts with a supported locale (/en or /ar)
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // 1. Check if user already manually selected a preferred locale stored in cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  let targetLocale: Locale = defaultLocale;

  if (cookieLocale === "ar" || cookieLocale === "en") {
    targetLocale = cookieLocale as Locale;
  } else {
    // 2. Check the user's device/system language via Accept-Language header
    const acceptLanguage = request.headers.get("accept-language");
    targetLocale = getDeviceLocale(acceptLanguage);
  }

  // Redirect to localized URL: e.g. / -> /en or / -> /ar, /qr -> /ar/qr or /en/qr
  const localizedPathname = pathname === "/" ? `/${targetLocale}` : `/${targetLocale}${pathname}`;
  const redirectUrl = new URL(`${localizedPathname}${search}`, request.url);

  const response = NextResponse.redirect(redirectUrl, 307);
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files, _next, favicon
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
