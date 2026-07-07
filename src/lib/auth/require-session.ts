import { redirect } from "next/navigation";
import { getCurrentSession } from "./session";

export async function requireSession() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function requireAdminSession() {
  const session = await requireSession();

  if (!session.roles.includes("ADMINISTRADOR")) {
    redirect("/inicio");
  }

  return session;
}
