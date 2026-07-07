import { AppShell } from "@/components/layout/app-shell";
import { AdminFormField } from "@/components/admin/admin-form-field";
import { createCourse } from "@/lib/admin/content-actions";
import { getAdminCourses, getAdminFormOptions } from "@/lib/admin/content-queries";
import { requireAdminSession } from "@/lib/auth/require-session";

export default async function AdminCoursesPage() {
  await requireAdminSession();
  const [courses, options] = await Promise.all([getAdminCourses(), getAdminFormOptions()]);

  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Administracion</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Cursos</h1>
          <p className="mt-3 max-w-3xl text-slate-500">Creacion inicial de cursos mandatorios asociados a ciclos.</p>
        </div>

        <form action={createCourse} className="grid gap-4 rounded-card border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            <span>Ciclo</span>
            <select className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" name="cycleId" required>
              <option value="">Seleccione</option>
              {options.cycles.map((cycle) => (
                <option key={cycle.id} value={cycle.id}>{cycle.name}</option>
              ))}
            </select>
          </label>
          <AdminFormField label="Nombre" name="name" required placeholder="Uso de la Fuerza" />
          <AdminFormField label="Orden" name="order" type="number" defaultValue={courses.length + 1} />
          <AdminFormField label="Descripcion" name="description" placeholder="Descripcion breve del curso" />
          <button className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-secondary" type="submit">
            Crear curso
          </button>
        </form>

        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <article key={course.id} className="rounded-card border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-secondary">{course.cycle.name}</p>
              <h2 className="mt-2 text-xl font-bold text-primary">{course.name}</h2>
              <p className="mt-2 text-sm text-slate-500">{course.description ?? "Sin descripcion"}</p>
              <p className="mt-4 text-sm text-slate-500">Temas: {course._count.topics} | Preguntas: {course._count.questions} | Simulacros: {course._count.mockExams}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
