# Importacion masiva de preguntas y opciones

## Rama

`feature/csv-import`

## Issue relacionado

`#20 Importar preguntas y opciones desde archivo CSV`

## Objetivo

Permitir la carga masiva inicial de bancos de preguntas mediante archivo CSV, vinculando cada pregunta con su curso, tema opcional, opciones de respuesta, retroalimentacion y respuesta correcta.

## Archivos incluidos

- `src/lib/admin/csv-import.ts`
- `src/app/admin/importar/page.tsx`
- `src/app/admin/page.tsx`
- `content/plantilla_importacion_preguntas.csv`

## Columnas del CSV

```text
courseId,topicId,statement,generalFeedback,optionA,feedbackA,optionB,feedbackB,optionC,feedbackC,optionD,feedbackD,correctOption
```

## Reglas basicas

- `courseId` es obligatorio.
- `topicId` es opcional.
- `statement` es obligatorio.
- Deben existir al menos dos opciones.
- `correctOption` acepta A, B, C, D o 1, 2, 3, 4.
- Si una fila no cumple las reglas minimas, se omite.

## Alcance actual

La importacion crea preguntas y opciones. No reemplaza preguntas existentes, no actualiza opciones previas y no elimina datos.

## Siguiente mejora recomendada

Agregar una vista de resultado con numero de filas importadas, filas omitidas y errores por linea.

## Validacion local sugerida

```bash
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run typecheck
npm run dev
```
