import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { requireSession } from "@/lib/auth/require-session";
import { getCourseDetailForUser } from "@/lib/data/courses";

type PageProps = {
  params: Promise<{ courseId: string }>;
};

export default async function CourseDetailPage({ params }: PageProps) {
  const session = await requireSession();
  const resolvedParams = await params;
  const courseId = Number(resolvedParams.courseId);

  if (!Number.isInteger(courseId) || courseId <= 0) {
    return (
      <AppShell>
        <article className="rounded-card border border-red-200 bg-white p-6 text-red-700">Curso no valido.</article>
      </AppShell>
    );
  }

  const course = await getCourseDetailForUser(courseId, session.userId);

  return (
    <AppShell>
      <section className="space-y-8">
        <div className="rounded-2xl bg-primary p-8 text-white shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-white/70">{course.cycle.name}</p>
          <h1 className="mt-3 text-3xl font-bold">{course.name}</h1>
          <p className="mt-3 max-w-3xl text-white/80">{course.description ?? "Curso disponible para preparacion personal."}</p>
          <p className="mt-4 text-sm text-white/80">Avance: {course.progressPercentage}%</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-card border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Temas</p>
            <p className="mt-2 text-3xl font-bold text-primary">{course.totalTopics}</p>
          </article>
          <article className="rounded-card border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Completados</p>
            <p className="mt-2 text-3xl font-bold text-primary">{course.completedTopics}</p>
          </article>
          <article className="rounded-card border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Simulacros</p>
            <p className="mt-2 text-3xl font-bold text-primary">{course.mockExams.length}</p>
          </article>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">Ruta de estudio</h2>
          {course.topics.length ? (
            <div className="space-y-3">
              {course.topics.map((topic) => (
                <article key={topic.id} className="rounded-card border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm text-secondary">Tema {topic.order}</p>
                  <h3 className="text-lg font-bold text-primary">{topic.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{topic.objective ?? topic.summary ?? "Tema pendiente de contenido."}</p>
                </article>
              ))}
            </div>
          ) : (
            <article className="rounded-card border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">Este curso aun no tiene temas activos.</article>
          )}
        </section>

        <Link href="/cursos" className="inline-flex rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-softGreen">
          Volver al catalogo
        </Link>
      </section>
    </AppShell>
  );
}
