# Estructura propuesta del proyecto Next.js

```text
aula-mandatorios/
|
|-- prisma/
|   |-- schema.prisma
|   |-- migrations/
|
|-- public/
|   |-- images/
|   |-- icons/
|   |-- assets/
|
|-- src/
|   |-- app/
|   |   |-- login/
|   |   |-- inicio/
|   |   |-- cursos/
|   |   |-- banco-preguntas/
|   |   |-- simulacros/
|   |   |-- progreso/
|   |   |-- reportes/
|   |   |-- admin/
|   |   |-- api/
|   |
|   |-- components/
|   |   |-- layout/
|   |   |-- ui/
|   |   |-- cursos/
|   |   |-- preguntas/
|   |   |-- simulacros/
|   |   |-- progreso/
|   |   |-- admin/
|   |
|   |-- lib/
|   |   |-- auth.ts
|   |   |-- prisma.ts
|   |   |-- security.ts
|   |   |-- reports.ts
|   |   |-- utils.ts
|   |
|   |-- services/
|   |   |-- cursos.service.ts
|   |   |-- preguntas.service.ts
|   |   |-- simulacros.service.ts
|   |   |-- progreso.service.ts
|   |   |-- reportes.service.ts
|   |   |-- admin.service.ts
|   |
|   |-- types/
|   |   |-- usuario.ts
|   |   |-- curso.ts
|   |   |-- pregunta.ts
|   |   |-- simulacro.ts
|   |   |-- reporte.ts
|   |
|   |-- styles/
|       |-- globals.css
|
|-- .env.example
|-- .gitignore
|-- package.json
|-- next.config.ts
```

## Orden recomendado de implementacion

1. Crear proyecto base.
2. Configurar estilos.
3. Configurar Prisma.
4. Crear autenticacion.
5. Construir layout.
6. Implementar cursos y temas.
7. Implementar preguntas.
8. Implementar simulacros.
9. Implementar progreso.
10. Implementar panel administrativo.
