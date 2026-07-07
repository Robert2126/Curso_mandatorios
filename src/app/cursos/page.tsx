import { AppShell } from "@/components/layout/app-shell";
import { ModuleCard } from "@/components/ui/module-card";
import { requireSession } from "@/lib/auth/require-session";
import { getCoursesForUser } from "@/lib/data/courses";

export default async function CursosPage() {
  const session = await requireSession();
  const courses = await getCoursesForUser(session.userId);

  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Catalogo</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Cursos mandatorios</h1>
          <p className="mt-3 max-w-3xl text-slate-500">
            Cursos activos disponibles para estudio, practica y seguimiento personal.
          </p>
        </div>

        {courses.length ? (
          <div className="grid gap-5 md:grid-cols-3">
            {courses.map((course) => (
              <ModuleCard
                key={course.id}
                title={course.name}
                description={`${course.cycle.name} - ${course.totalTopics} temas - avance ${course.progressPercentage}%`}
                href={`/cursos/${course.id}`}
                action="Ver curso"
              />
            ))}
          </div>
        ) : (
          <article className="rounded-card border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
            No hay cursos activos cargados. El administrador debe crear o activar cursos desde el panel administrativo.
          </article>
        )}
      </section>
    </AppShell>
  );
}
