# Historias de usuario y casos de uso

## Actores

| Actor | Funcion |
|---|---|
| Estudiante | Estudia, practica, presenta simulacros y consulta progreso. |
| Administrador personal | Gestiona ciclos, cursos, temas, recursos, preguntas y simulacros. |
| Sistema | Calcula avance, resultados, recomendaciones e insignias. |

## Historias principales

| Codigo | Historia | Prioridad |
|---|---|---|
| HU-01 | Como estudiante, quiero ingresar con cedula y contrasena para acceder de forma segura. | Alta |
| HU-02 | Como estudiante, quiero consultar cursos por ciclo para organizar mi estudio. | Alta |
| HU-03 | Como estudiante, quiero estudiar temas con microlecciones, videos y ejemplos aplicados. | Alta |
| HU-04 | Como estudiante, quiero practicar preguntas por curso o tema y recibir retroalimentacion. | Alta |
| HU-05 | Como estudiante, quiero presentar un simulacro con tiempo limite y un solo intento. | Alta |
| HU-06 | Como estudiante, quiero ver nota, aprobado/no aprobado y temas debiles. | Alta |
| HU-07 | Como estudiante, quiero consultar mi progreso personal. | Alta |
| HU-08 | Como administrador, quiero crear cursos, temas y preguntas sin modificar codigo. | Alta |
| HU-09 | Como administrador, quiero configurar simulacros por curso. | Alta |
| HU-10 | Como estudiante, quiero generar reportes de avance en PDF o Excel. | Media |

## Casos de uso principales

1. Iniciar sesion.
2. Consultar catalogo de cursos.
3. Abrir detalle de curso.
4. Estudiar tema.
5. Practicar preguntas.
6. Presentar simulacro.
7. Consultar resultado.
8. Consultar progreso.
9. Crear contenido desde panel administrativo.
10. Generar reporte.

## Criterios de aceptacion generales

- El usuario no accede sin sesion.
- El administrador accede a funciones restringidas.
- Las preguntas muestran retroalimentacion solo despues de responder.
- El simulacro bloquea un segundo intento.
- El progreso cambia al completar temas y simulacros.
