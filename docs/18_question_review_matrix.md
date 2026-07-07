# Matriz de revision de preguntas

## Rama

`feature/question-review-matrix`

## Objetivo

Preparar una matriz de control para revisar preguntas antes de importarlas como banco definitivo.

## Archivo creado

- `content/matriz_revision_preguntas.csv`

## Campos principales

- `questionNumber`: numero de pregunta.
- `courseName`: curso asociado.
- `topicTitle`: tema asociado.
- `sourcePage`: pagina o ubicacion de referencia.
- `statementExcerpt`: fragmento breve del enunciado.
- `optionA` a `optionD`: opciones de respuesta.
- `proposedCorrectOption`: respuesta propuesta.
- `validationStatus`: PENDIENTE, VALIDADA u OBSERVADA.
- `supportReference`: soporte normativo o pedagogico.
- `reviewerNotes`: observaciones.

## Criterio de calidad

No se debe importar una pregunta como definitiva si la respuesta correcta no esta validada con soporte suficiente.

## Siguiente paso

Completar la matriz con el repositorio publico de evaluacion y revisar cada respuesta antes de cargar el banco definitivo.
