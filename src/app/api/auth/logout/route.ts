import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth/session";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  clearSessionCookie(response);

  return response;
}

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  clearSessionCookie(response);

  return response;
}
