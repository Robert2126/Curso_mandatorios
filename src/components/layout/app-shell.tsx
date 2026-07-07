import Link from "next/link";
import { mainNavigation } from "@/lib/navigation";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-surface text-slate-900">
      <header className="border-b border-slate-200 bg-primary text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/inicio" className="flex flex-col">
            <span className="text-lg font-bold tracking-wide">Aula Mandatorios</span>
            <span className="text-xs text-white/80">Preparacion personal, practica y autoevaluacion</span>
          </Link>

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
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
