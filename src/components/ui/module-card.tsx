import Link from "next/link";

type ModuleCardProps = {
  title: string;
  description: string;
  href: string;
  action?: string;
};

export function ModuleCard({ title, description, href, action = "Abrir modulo" }: ModuleCardProps) {
  return (
    <article className="rounded-card border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <h2 className="text-xl font-bold text-primary">{title}</h2>
      <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">{description}</p>
      <Link
        href={href}
        className="mt-5 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary"
      >
        {action}
      </Link>
    </article>
  );
}
