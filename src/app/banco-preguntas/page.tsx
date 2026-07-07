import { AppShell } from "@/components/layout/app-shell";

export default function BancoPreguntasPage() {
  return (
    <AppShell>
      <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-card border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-primary">Filtros</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-500">
            <p>Curso: Todos</p>
            <p>Tema: Todos</p>
            <p>Dificultad: Todas</p>
          </div>
        </aside>

        <article className="rounded-card border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Practica libre</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Banco de preguntas</h1>
          <p className="mt-3 text-slate-500">
            Aqui se mostraran preguntas de seleccion unica con retroalimentacion posterior a la respuesta.
          </p>

          <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-6">
            <p className="font-semibold text-slate-700">Pregunta de ejemplo</p>
            <p className="mt-3 text-slate-600">La conexion real al banco se implementara con Prisma y PostgreSQL.</p>
          </div>
        </article>
      </section>
    </AppShell>
  );
}
