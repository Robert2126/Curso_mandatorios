export type NavigationItem = {
  label: string;
  href: string;
};

export const mainNavigation: NavigationItem[] = [
  { label: "Inicio", href: "/inicio" },
  { label: "Cursos", href: "/cursos" },
  { label: "Banco de preguntas", href: "/banco-preguntas" },
  { label: "Simulacros", href: "/simulacros" },
  { label: "Mi progreso", href: "/progreso" },
  { label: "Reportes", href: "/reportes" },
  { label: "Administracion", href: "/admin" },
];
