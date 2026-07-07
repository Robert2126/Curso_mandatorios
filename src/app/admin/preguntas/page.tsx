import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { createQuestion } from "@/lib/admin/content-actions";
import { getAdminFormOptions, getAdminQuestions } from "@/lib/admin/content-queries";
import { requireAdminSession } from "@/lib/auth/require-session";

export default async function AdminQuestionsPage() {
  await requireAdminSession();
  const [questions, options] = await Promise.all([getAdminQuestions(), getAdminFormOptions()]);

  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Administracion</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Preguntas</h1>
          <p className="mt-3 max-w-3xl text-slate-500">Registro del banco de preguntas y administracion de opciones de respuesta.</p>
        </div>

        <form action={createQuestion} className="grid gap-4 rounded-card border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            <span>Curso</span>
            <select className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" name="courseId" required>
              <option value="">Seleccione</option>
              {options.courses.map((course) => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            <span>Tema opcional</span>
            <select className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" name="topicId">
              <option value="">Sin tema</option>
              {options.topics.map((topic) => (
                <option key={topic.id} value={topic.id}>{topic.title}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700 md:col-span-2">
            <span>Enunciado</span>
            <textarea className="mt-2 min-h-28 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" name="statement" required placeholder="Escriba el enunciado de la pregunta" />
          </label>
          <label className="block text-sm font-medium text-slate-700 md:col-span-2">
            <span>Retroalimentacion general</span>
            <textarea className="mt-2 min-h-24 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" name="generalFeedback" placeholder="Explique la respuesta correcta o el criterio de evaluacion" />
          </label>
          <button className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-secondary" type="submit">
            Crear pregunta
          </button>
        </form>

        <div className="space-y-3">
          {questions.map((question) => (
            <article key={question.id} className="rounded-card border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-secondary">{question.course.name}</p>
              <h2 className="mt-2 text-base font-bold text-primary">{question.statement}</h2>
              <p className="mt-2 text-sm text-slate-500">Tema: {question.topic?.title ?? "Sin tema"} | Opciones: {question._count.options}</p>
              <Link className="mt-4 inline-flex rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-softGreen" href={`/admin/preguntas/${question.id}/opciones`}>
                Gestionar opciones
              </Link>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
