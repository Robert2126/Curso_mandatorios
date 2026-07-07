import { AppShell } from "@/components/layout/app-shell";
import { AdminFormField } from "@/components/admin/admin-form-field";
import { createMockExam } from "@/lib/admin/content-actions";
import { getAdminFormOptions, getAdminMockExams } from "@/lib/admin/content-queries";
import { requireAdminSession } from "@/lib/auth/require-session";

export default async function AdminMockExamsPage() {
  await requireAdminSession();
  const [mockExams, options] = await Promise.all([getAdminMockExams(), getAdminFormOptions()]);

  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Administracion</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Simulacros</h1>
          <p className="mt-3 max-w-3xl text-slate-500">Configuracion inicial de simulacros por curso.</p>
        </div>

        <form action={createMockExam} className="grid gap-4 rounded-card border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            <span>Curso</span>
            <select className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" name="courseId" required>
              <option value="">Seleccione</option>
              {options.courses.map((course) => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </label>
          <AdminFormField label="Nombre" name="name" required placeholder="Simulacro ciclo IV" />
          <AdminFormField label="Numero de preguntas" name="numberOfQuestions" type="number" required defaultValue={30} />
          <AdminFormField label="Tiempo limite en minutos" name="timeLimitMin" type="number" required defaultValue={45} />
          <AdminFormField label="Descripcion" name="description" placeholder="Descripcion breve" />
          <button className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-secondary" type="submit">
            Crear simulacro
          </button>
        </form>

        <div className="grid gap-4 md:grid-cols-2">
          {mockExams.map((mockExam) => (
            <article key={mockExam.id} className="rounded-card border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-secondary">{mockExam.course.name}</p>
              <h2 className="mt-2 text-xl font-bold text-primary">{mockExam.name}</h2>
              <p className="mt-2 text-sm text-slate-500">Preguntas: {mockExam.numberOfQuestions} | Tiempo: {mockExam.timeLimitMin} min | Intentos: {mockExam._count.attempts}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
