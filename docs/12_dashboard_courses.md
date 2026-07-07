# Conexion de dashboard y cursos con Prisma

## Rama

`feature/dashboard`

## Issue relacionado

`#10 Conectar dashboard y cursos con datos reales de Prisma`

## Objetivo

Reemplazar informacion estatica por consultas reales desde PostgreSQL mediante Prisma.

## Archivos incluidos

- `src/lib/data/dashboard.ts`
- `src/lib/data/courses.ts`
- `src/app/inicio/page.tsx`
- `src/app/cursos/page.tsx`
- `src/app/cursos/[courseId]/page.tsx`

## Alcance implementado

- Dashboard con conteos reales de cursos, temas, simulacros y progreso del usuario.
- Catalogo de cursos activos desde base de datos.
- Calculo basico de avance por curso.
- Pagina de detalle por curso.
- Ruta de estudio con temas activos.
- Mensajes para estados sin datos.

## Material de estudio

Todavia no se requiere carga completa del material de estudio. La plataforma ya queda preparada para recibirlo posteriormente por curso, tema, recurso y pregunta.

Cuando se pase a la fase de contenidos, se puede trabajar de dos formas:

1. El usuario suministra documentos, videos, resumenes o banco de preguntas.
2. El usuario entrega el enlace oficial y se extrae la estructura de estudio desde la pagina indicada, siempre que el acceso lo permita.

## Validacion local sugerida

```bash
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run typecheck
npm run dev
```
