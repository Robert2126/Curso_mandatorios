# Plan de desarrollo del prototipo funcional

## Enfoque

Desarrollo incremental por modulos. Cada modulo debe construirse, probarse y validarse antes de avanzar al siguiente.

## Fases

| Fase | Producto |
|---|---|
| 1 | Preparacion del proyecto Next.js. |
| 2 | Configuracion de PostgreSQL y Prisma. |
| 3 | Autenticacion con cedula y contrasena. |
| 4 | Dashboard inicial. |
| 5 | Modulo de cursos. |
| 6 | Modulo de temas y contenidos. |
| 7 | Banco de preguntas. |
| 8 | Simulacros. |
| 9 | Resultados y recomendaciones. |
| 10 | Mi progreso. |
| 11 | Panel administrativo basico. |
| 12 | Reportes basicos. |
| 13 | Pruebas, seguridad y despliegue. |

## Producto minimo viable

1. Login funcional.
2. Catalogo de cursos.
3. Detalle de curso.
4. Tema de estudio.
5. Banco de preguntas con retroalimentacion.
6. Simulacro con temporizador y un solo intento.
7. Resultado con nota y temas debiles.
8. Progreso basico.
9. Panel administrativo basico.

## Criterios de aceptacion del prototipo

- CP-01: El usuario puede ingresar con cedula y contrasena.
- CP-02: El usuario puede consultar cursos activos.
- CP-03: El usuario puede estudiar temas y marcarlos como completados.
- CP-04: El usuario puede practicar preguntas y recibir retroalimentacion.
- CP-05: El usuario puede presentar un simulacro con tiempo limite.
- CP-06: El sistema impide repetir el simulacro.
- CP-07: El sistema calcula nota y aprobado/no aprobado.
- CP-08: El sistema identifica temas debiles.
- CP-09: El administrador puede crear cursos, temas y preguntas.
- CP-10: La plataforma funciona en celular y computador.

## Riesgos

| Riesgo | Control |
|---|---|
| Banco de preguntas grande | Paginacion y filtros. |
| Videos pesados | Enlaces embebidos. |
| Exposicion de respuestas | No enviarlas antes de responder o finalizar. |
| Repeticion indebida del simulacro | Restriccion por base de datos y backend. |
| Diseno sobrecargado | Componentes limpios y responsive. |
