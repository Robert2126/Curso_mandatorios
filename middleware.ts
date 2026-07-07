import { NextRequest, NextResponse } from "next/server";

const sessionCookieName = "aula_session";
const protectedPrefixes = ["/inicio", "/cursos", "/banco-preguntas", "/simulacros", "/progreso", "/reportes", "/admin"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasSession = Boolean(request.cookies.get(sessionCookieName)?.value);
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (isProtected && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && hasSession) {
    return NextResponse.redirect(new URL("/inicio", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/inicio/:path*", "/cursos/:path*", "/banco-preguntas/:path*", "/simulacros/:path*", "/progreso/:path*", "/reportes/:path*", "/admin/:path*"],
};
