import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";

function redirectToLogin(request: Request, reason = "credenciales") {
  return NextResponse.redirect(new URL(`/login?error=${reason}`, request.url));
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const cedula = String(formData.get("cedula") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!cedula || !password) {
    return redirectToLogin(request, "campos");
  }

  const user = await prisma.user.findUnique({
    where: { cedula },
    include: {
      roles: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!user || !user.active) {
    return redirectToLogin(request);
  }

  const isValidPassword = await verifyPassword(password, user.passwordHash);

  if (!isValidPassword) {
    return redirectToLogin(request);
  }

  const roles = user.roles.map((userRole) => userRole.role.name);
  const token = createSessionToken({
    userId: user.id,
    cedula: user.cedula,
    name: user.name,
    roles,
    exp: Date.now() + 1000 * 60 * 60 * 8,
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { lastAccessAt: new Date() },
  });

  const response = NextResponse.redirect(new URL("/inicio", request.url));
  setSessionCookie(response, token);

  return response;
}
