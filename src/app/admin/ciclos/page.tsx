import { AppShell } from "@/components/layout/app-shell";
import { AdminFormField } from "@/components/admin/admin-form-field";
import { createCycle } from "@/lib/admin/content-actions";
import { getAdminCycles } from "@/lib/admin/content-queries";
import { requireAdminSession } from "@/lib/auth/require-session";

export default async function AdminCyclesPage() {
  await requireAdminSession();
  const cycles = await getAdminCycles();

  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Administracion</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Ciclos</h1>
          <p className="mt-3 max-w-3xl text-slate-500">Gestion inicial de ciclos disponibles en la plataforma.</p>
        </div>

        <form action={createCycle} className="grid gap-4 rounded-card border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-3">
          <AdminFormField label="Nombre" name="name" required placeholder="Ciclo IV" />
          <AdminFormField label="Orden" name="order" type="number" defaultValue={cycles.length + 1} />
          <AdminFormField label="Descripcion" name="description" placeholder="Descripcion breve" />
          <button className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-secondary" type="submit">
            Crear ciclo
          </button>
        </form>

        <div className="overflow-hidden rounded-card border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-softGreen text-primary">
              <tr>
                <th className="p-4">Ciclo</th>
                <th className="p-4">Orden</th>
                <th className="p-4">Cursos</th>
                <th className="p-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              {cycles.map((cycle) => (
                <tr key={cycle.id} className="border-t border-slate-100">
                  <td className="p-4 font-medium text-slate-800">{cycle.name}</td>
                  <td className="p-4 text-slate-500">{cycle.order}</td>
                  <td className="p-4 text-slate-500">{cycle._count.courses}</td>
                  <td className="p-4 text-slate-500">{cycle.active ? "Activo" : "Inactivo"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
