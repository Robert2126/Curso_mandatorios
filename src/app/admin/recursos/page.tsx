import { ResourceType } from "@prisma/client";
import { AppShell } from "@/components/layout/app-shell";
import { AdminFormField } from "@/components/admin/admin-form-field";
import { createResource } from "@/lib/admin/content-actions";
import { getAdminFormOptions, getAdminResources } from "@/lib/admin/content-queries";
import { requireAdminSession } from "@/lib/auth/require-session";

export default async function AdminResourcesPage() {
  await requireAdminSession();
  const [resources, options] = await Promise.all([getAdminResources(), getAdminFormOptions()]);

  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Administracion</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Recursos de estudio</h1>
          <p className="mt-3 max-w-3xl text-slate-500">Registro inicial de recursos por curso o tema.</p>
        </div>

        <form action={createResource} className="grid gap-4 rounded-card border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            <span>Curso</span>
            <select className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" name="courseId">
              <option value="">Sin curso</option>
              {options.courses.map((course) => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            <span>Tema</span>
            <select className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" name="topicId">
              <option value="">Sin tema</option>
              {options.topics.map((topic) => (
                <option key={topic.id} value={topic.id}>{topic.title}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            <span>Tipo</span>
            <select className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" name="type" required>
              {Object.values(ResourceType).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <AdminFormField label="Titulo" name="title" required placeholder="Titulo del recurso" />
          <AdminFormField label="Orden" name="order" type="number" defaultValue={resources.length + 1} />
          <AdminFormField label="Referencia" name="url" placeholder="Enlace o codigo de referencia" />
          <AdminFormField label="Descripcion" name="description" placeholder="Descripcion breve" />
          <label className="block text-sm font-medium text-slate-700 md:col-span-2">
            <span>Nota interna</span>
            <textarea className="mt-2 min-h-24 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" name="embeddedContent" placeholder="Observaciones sobre el recurso" />
          </label>
          <button className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-secondary" type="submit">
            Crear recurso
          </button>
        </form>

        <div className="grid gap-4 md:grid-cols-2">
          {resources.map((resource) => (
            <article key={resource.id} className="rounded-card border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-secondary">{resource.type}</p>
              <h2 className="mt-2 text-xl font-bold text-primary">{resource.title}</h2>
              <p className="mt-2 text-sm text-slate-500">{resource.description ?? "Sin descripcion"}</p>
              <p className="mt-3 text-xs text-slate-500">Curso: {resource.course?.name ?? "Sin curso"} | Tema: {resource.topic?.title ?? "Sin tema"}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
