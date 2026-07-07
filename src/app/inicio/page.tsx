import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/ui/stat-card";

export default function InicioPage() {
  return (
    <AppShell>
      <section className="space-y-8">
        <div className="rounded-2xl bg-primary p-8 text-white shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-white/70">Panel principal</p>
          <h1 className="mt-3 text-3xl font-bold">Bienvenido a Aula Mandatorios</h1>
          <p className="mt-3 max-w-3xl text-white/80">
            Consulta cursos, retoma temas pendientes, practica preguntas y revisa tu avance personal.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Cursos en progreso" value="0" helper="Pendiente de conexion a base de datos" />
          <StatCard label="Temas completados" value="0/0" helper="Avance inicial" />
          <StatCard label="Promedio personal" value="0%" helper="Sin simulacros registrados" />
          <StatCard label="Simulacros" value="0" helper="Ningun intento presentado" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-card border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-primary">Continuar donde quedaste</h2>
            <p className="mt-2 text-sm text-slate-500">Aqui se mostrara el ultimo curso o tema consultado.</p>
          </article>

          <article className="rounded-card border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-primary">Temas por reforzar</h2>
            <p className="mt-2 text-sm text-slate-500">El sistema listara temas con bajo desempeno en practicas o simulacros.</p>
          </article>
        </div>
      </section>
    </AppShell>
  );
}
