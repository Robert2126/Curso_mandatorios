import { AppShell } from "@/components/layout/app-shell";
import { AdminFormField } from "@/components/admin/admin-form-field";
import { createTopic } from "@/lib/admin/content-actions";
import { getAdminFormOptions, getAdminTopics } from "@/lib/admin/content-queries";
import { requireAdminSession } from "@/lib/auth/require-session";

export default async function AdminTopicsPage() {
  await requireAdminSession();
  const [topics, options] = await Promise.all([getAdminTopics(), getAdminFormOptions()]);

  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Administracion</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Temas</h1>
          <p className="mt-3 max-w-3xl text-slate-500">Gestion inicial de temas, objetivos y resumenes por curso.</p>
        </div>

        <form action={createTopic} className="grid gap-4 rounded-card border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            <span>Curso</span>
            <select className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" name="courseId" required>
              <option value="">Seleccione</option>
              {options.courses.map((course) => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </label>
          <AdminFormField label="Titulo" name="title" required placeholder="Principios de actuacion" />
          <AdminFormField label="Orden" name="order" type="number" defaultValue={topics.length + 1} />
          <AdminFormField label="Objetivo" name="objective" placeholder="Objetivo del tema" />
          <AdminFormField label="Resumen" name="summary" placeholder="Resumen breve" />
          <button className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-secondary" type="submit">
            Crear tema
          </button>
        </form>

        <div className="grid gap-4 md:grid-cols-2">
          {topics.map((topic) => (
            <article key={topic.id} className="rounded-card border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-secondary">{topic.course.name}</p>
              <h2 className="mt-2 text-xl font-bold text-primary">{topic.title}</h2>
              <p className="mt-2 text-sm text-slate-500">{topic.objective ?? topic.summary ?? "Sin objetivo registrado"}</p>
              <p className="mt-4 text-sm text-slate-500">Recursos: {topic._count.resources} | Preguntas: {topic._count.questions}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
