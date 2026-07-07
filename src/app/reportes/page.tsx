import { AppShell } from "@/components/layout/app-shell";

export default function ReportesPage() {
  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Exportacion</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Reportes</h1>
          <p className="mt-3 max-w-3xl text-slate-500">
            Modulo previsto para generar reportes personales en PDF y Excel con avance, resultados y temas por reforzar.
          </p>
        </div>

        <article className="rounded-card border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-primary">Reporte general</h2>
          <p className="mt-3 text-sm text-slate-500">La generacion real de archivos se implementara en la fase de reportes.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary">Generar PDF</button>
            <button className="rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-softGreen">Generar Excel</button>
          </div>
        </article>
      </section>
    </AppShell>
  );
}
