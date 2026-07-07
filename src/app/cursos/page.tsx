import { AppShell } from "@/components/layout/app-shell";
import { ModuleCard } from "@/components/ui/module-card";

const demoCourses = [
  {
    title: "Uso de la Fuerza",
    description: "Curso orientado a principios, limites y criterios de actuacion.",
    href: "/cursos/uso-de-la-fuerza",
  },
  {
    title: "Derechos Humanos",
    description: "Fortalecimiento de criterios basicos aplicados al servicio.",
    href: "/cursos/derechos-humanos",
  },
  {
    title: "Procedimiento Policial",
    description: "Repaso de actuaciones, registros y decisiones operativas.",
    href: "/cursos/procedimiento-policial",
  },
];

export default function CursosPage() {
  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Catalogo</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Cursos mandatorios</h1>
          <p className="mt-3 max-w-3xl text-slate-500">
            Vista inicial del catalogo. En la siguiente fase se conectara con ciclos, cursos y avance real desde base de datos.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {demoCourses.map((course) => (
            <ModuleCard key={course.href} {...course} action="Ver curso" />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
