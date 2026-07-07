import { AppShell } from "@/components/layout/app-shell";

export default function SimulacrosPage() {
  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Evaluacion personal</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Simulacros</h1>
          <p className="mt-3 max-w-3xl text-slate-500">
            Los simulacros tendran preguntas aleatorias, tiempo limite, un solo intento y resultado automatico.
          </p>
        </div>

        <article className="rounded-card border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-primary">Simulacro de prueba</h2>
          <dl className="mt-4 grid gap-4 text-sm text-slate-600 md:grid-cols-4">
            <div><dt className="font-semibold">Preguntas</dt><dd>30</dd></div>
            <div><dt className="font-semibold">Tiempo</dt><dd>45 minutos</dd></div>
            <div><dt className="font-semibold">Intentos</dt><dd>1</dd></div>
            <div><dt className="font-semibold">Aprobacion</dt><dd>70%</dd></div>
          </dl>
          <button className="mt-6 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary">
            Iniciar simulacro
          </button>
        </article>
      </section>
    </AppShell>
  );
}
