# Gestion de opciones de respuesta

## Rama

`feature/question-options`

## Issue relacionado

`#17 Gestionar opciones de respuesta por pregunta`

## Objetivo

Completar la administracion del banco de preguntas permitiendo crear opciones de respuesta, marcar una opcion correcta y registrar retroalimentacion por opcion.

## Alcance implementado

- Accion para crear opciones de respuesta.
- Accion para marcar una opcion como correcta.
- Validacion logica para dejar una sola opcion correcta por pregunta.
- Consulta de pregunta con sus opciones.
- Pagina administrativa de opciones por pregunta.
- Enlace desde el listado de preguntas hacia la gestion de opciones.

## Regla de negocio

Cuando una opcion se marca como correcta, las demas opciones de la misma pregunta se actualizan como incorrectas. Esto evita que existan varias respuestas correctas en la misma pregunta desde la interfaz administrativa.

## Validacion local sugerida

```bash
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run typecheck
npm run dev
```

## Siguiente fase

Despues de esta fase se recomienda crear importacion masiva de preguntas y opciones desde archivo estructurado.
