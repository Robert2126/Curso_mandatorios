import { AppShell } from "@/components/layout/app-shell";
import { importQuestionsFromCsv } from "@/lib/admin/csv-import";
import { getAdminFormOptions } from "@/lib/admin/content-queries";
import { requireAdminSession } from "@/lib/auth/require-session";

export default async function AdminImportPage() {
  await requireAdminSession();
  const { courses, topics } = await getAdminFormOptions();

  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Administracion</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Importar preguntas</h1>
          <p className="mt-3 max-w-3xl text-slate-500">
            Carga masiva de preguntas y opciones desde archivo CSV. El archivo debe usar los identificadores de curso y tema registrados en la base de datos.
          </p>
        </div>

        <form action={importQuestionsFromCsv} className="rounded-card border border-slate-200 bg-white p-6 shadow-sm">
          <label className="block text-sm font-medium text-slate-700">
            <span>Archivo CSV</span>
            <input className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" name="file" type="file" accept=".csv,text/csv" required />
          </label>
          <button className="mt-4 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-secondary" type="submit">
            Importar archivo
          </button>
        </form>

        <article className="rounded-card border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-primary">Columnas requeridas</h2>
          <p className="mt-2 text-sm text-slate-500">
            courseId, topicId, statement, generalFeedback, optionA, feedbackA, optionB, feedbackB, optionC, feedbackC, optionD, feedbackD, correctOption.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            En correctOption use A, B, C, D o el numero 1, 2, 3, 4.
          </p>
        </article>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-card border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-primary">Cursos disponibles</h2>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              {courses.map((course) => (
                <p key={course.id}>{course.id} - {course.name}</p>
              ))}
            </div>
          </article>
          <article className="rounded-card border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-primary">Temas disponibles</h2>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              {topics.map((topic) => (
                <p key={topic.id}>{topic.id} - {topic.title}</p>
              ))}
            </div>
          </article>
        </div>
      </section>
    </AppShell>
  );
}
