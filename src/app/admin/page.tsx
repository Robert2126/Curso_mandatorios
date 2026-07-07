import { AppShell } from "@/components/layout/app-shell";
import { ModuleCard } from "@/components/ui/module-card";

const adminModules = [
  { title: "Ciclos", description: "Gestion de ciclos disponibles en la plataforma.", href: "/admin/ciclos" },
  { title: "Cursos", description: "Creacion y edicion de cursos mandatorios.", href: "/admin/cursos" },
  { title: "Temas", description: "Organizacion de temas, objetivos y microlecciones.", href: "/admin/temas" },
  { title: "Preguntas", description: "Gestion del banco de preguntas y respuestas.", href: "/admin/preguntas" },
  { title: "Simulacros", description: "Configuracion de intentos, tiempo y aprobacion.", href: "/admin/simulacros" },
  { title: "Reportes", description: "Control de exportaciones y registros generados.", href: "/admin/reportes" },
];

export default function AdminPage() {
  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Administracion</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Panel administrativo</h1>
          <p className="mt-3 max-w-3xl text-slate-500">
            Vista inicial para cargar ciclos, cursos, temas, recursos, preguntas y simulacros.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {adminModules.map((module) => (
            <ModuleCard key={module.href} {...module} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
