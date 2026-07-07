import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/ui/stat-card";

export default function ProgresoPage() {
  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Seguimiento</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Mi progreso</h1>
          <p className="mt-3 max-w-3xl text-slate-500">
            Vista inicial de avance personal. Los datos reales se conectaran desde PostgreSQL.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Avance global" value="0%" />
          <StatCard label="Promedio" value="0%" />
          <StatCard label="Tiempo de estudio" value="0 h" />
          <StatCard label="Racha" value="0 dias" />
        </div>
      </section>
    </AppShell>
  );
}
