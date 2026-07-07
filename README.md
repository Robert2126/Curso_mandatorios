# Aula Mandatorios

Plataforma web personal para preparacion, practica, autoevaluacion y seguimiento del aprendizaje en cursos mandatorios.

## Proposito

El proyecto busca construir una herramienta web responsive que permita estudiar cursos mandatorios por ciclos, consultar temas, visualizar contenidos interactivos, practicar preguntas, presentar simulacros, recibir retroalimentacion y registrar avance personal.

La plataforma no reemplaza evaluaciones institucionales oficiales. Su enfoque es personal, formativo y preparatorio.

## Alcance inicial

- Login con cedula y contrasena.
- Catalogo de cursos por ciclos.
- Temas variables por curso.
- Microlecciones, videos, infografias y ejemplos aplicados.
- Banco de preguntas de seleccion unica.
- Simulacros con preguntas aleatorias, tiempo limite y un solo intento.
- Resultado con nota, aprobado/no aprobado y temas por reforzar.
- Registro de avance, tiempo de estudio, notas e insignias.
- Reportes basicos en PDF y Excel.
- Panel administrativo para cargar cursos, temas, recursos, preguntas y simulacros.

## Stack tecnologico propuesto

- Frontend: Next.js, React, TypeScript.
- Estilos: Tailwind CSS.
- Base de datos: PostgreSQL.
- ORM: Prisma.
- Autenticacion: cedula y contrasena.
- Reportes: PDF y Excel.
- Control de versiones: GitHub con ramas `feature/*` y Pull Requests.

## Flujo funcional principal

```text
Login
  -> Inicio
  -> Cursos
  -> Detalle del curso
  -> Tema de estudio
  -> Banco de preguntas
  -> Simulacro
  -> Resultado
  -> Mi progreso
  -> Reportes
  -> Panel administrativo
```

## Estructura documental

```text
docs/       Documentacion funcional, tecnica y visual.
database/   Modelo SQL y lineamientos de base de datos.
project/    Estructura tecnica del proyecto Next.js.
content/    Plantillas para carga de contenido.
```

## Estado actual

Fase documental inicial del proyecto. Esta rama contiene la estructura base del repositorio, especificaciones funcionales y lineamientos tecnicos para iniciar el prototipo.
