# Stack tecnologico y arquitectura

## Stack recomendado

| Capa | Tecnologia |
|---|---|
| Frontend | Next.js + React + TypeScript |
| Estilos | Tailwind CSS |
| Componentes | shadcn/ui o componentes propios |
| Backend | API interna de Next.js |
| Base de datos | PostgreSQL |
| ORM | Prisma |
| Autenticacion | Cedula y contrasena |
| Reportes | PDF y Excel |
| Graficos | Recharts |
| Control de versiones | GitHub |

## Arquitectura

```text
Usuario
  -> Navegador
  -> Frontend Next.js
  -> API interna
  -> Servicios
  -> Prisma ORM
  -> PostgreSQL
  -> Reportes y recursos
```

## Rutas principales

| Ruta | Pantalla |
|---|---|
| /login | Inicio de sesion |
| /inicio | Dashboard |
| /cursos | Catalogo |
| /cursos/[id] | Detalle del curso |
| /cursos/[id]/temas/[temaId] | Tema de estudio |
| /banco-preguntas | Banco de preguntas |
| /simulacros | Lista de simulacros |
| /simulacros/[id]/iniciar | Presentacion del simulacro |
| /simulacros/[id]/resultado | Resultado |
| /progreso | Mi progreso |
| /reportes | Reportes |
| /admin | Panel administrativo |

## Seguridad minima

- Contrasenas cifradas.
- Rutas privadas protegidas.
- Panel administrativo por rol.
- Banco de preguntas sin acceso publico.
- No exponer respuestas correctas antes de tiempo.
- Variables sensibles en `.env` fuera del repositorio.

## Despliegue sugerido

- Prototipo: Vercel + PostgreSQL administrado.
- Mayor control: VPS + PostgreSQL + Nginx.
