# Inicializacion tecnica Next.js

## Rama

`feature/nextjs-bootstrap`

## Objetivo

Crear la base funcional inicial de la plataforma Aula Mandatorios con Next.js, TypeScript y Tailwind CSS.

## Archivos incluidos

- `package.json`
- `tsconfig.json`
- `next-env.d.ts`
- `next.config.ts`
- `postcss.config.js`
- `tailwind.config.ts`
- `.env.example`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- Rutas iniciales para login, inicio, cursos, banco de preguntas, simulacros, progreso, reportes y administracion.
- Componentes base `AppShell`, `StatCard` y `ModuleCard`.
- Constantes de navegacion y utilidades.

## Validacion local sugerida

```bash
npm install
npm run typecheck
npm run dev
```

## Pendiente

- Validar dependencias en entorno local.
- Configurar ESLint segun version instalada.
- Conectar Prisma en la siguiente rama.
- Implementar autenticacion real despues de base de datos.
