import { AppShell } from "@/components/layout/app-shell";
import { requireAdminSession } from "@/lib/auth/require-session";

export default async function AdminResourcesPage() {
  await requireAdminSession();

  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Administracion</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Recursos de estudio</h1>
          <p className="mt-3 max-w-3xl text-slate-500">
            Pantalla reservada para cargar videos, documentos, infografias y mapas conceptuales cuando se entregue el material de estudio.
          </p>
        </div>

        <article className="rounded-card border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
          Aun no se requiere material de estudio. Esta fase solo deja preparada la ruta administrativa.
        </article>
      </section>
    </AppShell>
  );
}
