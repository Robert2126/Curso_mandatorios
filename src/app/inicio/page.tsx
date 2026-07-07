import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/ui/stat-card";
import { requireSession } from "@/lib/auth/require-session";
import { getDashboardData } from "@/lib/data/dashboard";
import { formatPercent } from "@/lib/utils";

export default async function InicioPage() {
  const session = await requireSession();
  const dashboard = await getDashboardData(session.userId);
  const latestItem = dashboard.latestProgress[0];

  return (
    <AppShell>
      <section className="space-y-8">
        <div className="rounded-2xl bg-primary p-8 text-white shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-white/70">Panel principal</p>
          <h1 className="mt-3 text-3xl font-bold">Bienvenido, {session.name}</h1>
          <p className="mt-3 max-w-3xl text-white/80">
            Consulta cursos, retoma temas pendientes, practica preguntas y revisa tu avance personal.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Cursos activos" value={String(dashboard.coursesCount)} helper="Cursos disponibles en plataforma" />
          <StatCard label="Temas completados" value={`${dashboard.completedTopics}/${dashboard.topicsCount}`} helper="Avance personal registrado" />
          <StatCard label="Promedio personal" value={formatPercent(dashboard.averageScore)} helper="Promedio de ultimos simulacros" />
          <StatCard label="Simulacros activos" value={String(dashboard.mockExamsCount)} helper="Disponibles para practica" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-card border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-primary">Continuar donde quedaste</h2>
            {latestItem ? (
              <div className="mt-3 space-y-3 text-sm text-slate-600">
                <p>
                  Ultimo registro: <strong>{latestItem.course.name}</strong>
                  {latestItem.topic ? ` / ${latestItem.topic.title}` : ""}.
                </p>
                <Link className="inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary" href={`/cursos/${latestItem.courseId}`}>
                  Retomar curso
                </Link>
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-500">Aun no hay avance registrado. Inicia por el catalogo de cursos.</p>
            )}
          </article>

          <article className="rounded-card border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-primary">Ultimos simulacros</h2>
            {dashboard.latestAttempts.length ? (
              <ul className="mt-3 space-y-3 text-sm text-slate-600">
                {dashboard.latestAttempts.map((attempt) => (
                  <li key={attempt.id} className="rounded-xl border border-slate-200 p-3">
                    <p className="font-semibold text-slate-700">{attempt.mockExam.name}</p>
                    <p>{attempt.mockExam.course.name} - {formatPercent(Number(attempt.score100 ?? 0))}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-slate-500">Aun no existen simulacros presentados.</p>
            )}
          </article>
        </div>
      </section>
    </AppShell>
  );
}
