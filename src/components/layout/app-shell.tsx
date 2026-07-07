import Link from "next/link";
import { mainNavigation } from "@/lib/navigation";
import { getCurrentSession } from "@/lib/auth/session";

type AppShellProps = {
  children: React.ReactNode;
};

export async function AppShell({ children }: AppShellProps) {
  const session = await getCurrentSession();

  return (
    <div className="min-h-screen bg-surface text-slate-900">
      <header className="border-b border-slate-200 bg-primary text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/inicio" className="flex flex-col">
            <span className="text-lg font-bold tracking-wide">Aula Mandatorios</span>
            <span className="text-xs text-white/80">Preparacion personal, practica y autoevaluacion</span>
          </Link>

          <div className="flex flex-col gap-3 md:items-end">
            <nav className="flex flex-wrap gap-2 text-sm">
              {mainNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-2 text-white/90 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {session ? (
              <div className="flex items-center gap-3 text-xs text-white/80">
                <span>{session.name}</span>
                <form action="/api/auth/logout" method="post">
                  <button className="rounded-full border border-white/30 px-3 py-1 text-white transition hover:bg-white/10" type="submit">
                    Cerrar sesion
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
