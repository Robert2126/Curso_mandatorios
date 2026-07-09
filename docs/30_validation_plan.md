# Plan de validacion normativa del banco de preguntas

## Rama

`feature/question-bank-validation-plan`

## Proposito

Definir una ruta de validacion para convertir las matrices preliminares de revision en un banco importable solo cuando exista respaldo normativo o institucional suficiente.

## Estado de partida

- 100 preguntas estructuradas en 10 lotes.
- 10 matrices preliminares creadas.
- 1 control de consolidacion creado.
- Todas las respuestas permanecen como propuestas.
- Ninguna pregunta se considera importable de manera definitiva.

## Bloques de validacion

| Bloque | Temas | Rango principal | Fuente minima requerida |
|---|---|---:|---|
| A | Ley 1801, funcion de policia, medios de policia y convivencia | 41-60, 99 | Ley 1801 de 2016 y doctrina institucional |
| B | Uso de la fuerza, valoracion tactica, armas y principios internacionales | 96-98, 100 | Resoluciones vigentes, DIDH y material institucional |
| C | Mediacion policial y tecnicas de mediacion | 55-65 | Ley 1801 y material pedagogico institucional |
| D | Ruta VBG, medidas de proteccion, denuncia y actos urgentes | 66-74 | Ley 1257, decretos reglamentarios y ruta institucional |
| E | Infancia, adolescencia, NNA y restablecimiento de derechos | 75-85 | Ley 1098, guias institucionales y rutas de atencion |
| F | Migracion, extranjeros, visas y documentos | 86-92 | Migracion Colombia, Cancilleria y normativa vigente |
| G | Inmunidad y personal diplomatico | 93-95 | Convencion de Viena y protocolos de Cancilleria |
| H | Temas operativos iniciales de procedimientos | 1-40 | Manuales, instructivos y documentos institucionales vigentes |

## Criterios de clasificacion

Cada pregunta debe recibir una de estas marcas:

| Marca | Uso |
|---|---|
| VALIDADA | Existe soporte normativo o institucional claro y vigente. |
| AJUSTAR_RESPUESTA | La respuesta propuesta puede ser incorrecta o incompleta. |
| AJUSTAR_ENUNCIADO | El enunciado requiere depuracion por ambiguedad o desactualizacion. |
| POR_VALIDAR | Falta fuente suficiente para confirmar. |
| NO_IMPORTAR | No debe pasar al banco por falta de trazabilidad o por riesgo de error. |

## Reglas para crear CSV importable

1. Incluir solo preguntas con marca `VALIDADA`.
2. Registrar fuente especifica por pregunta.
3. Evitar respuestas inferidas sin soporte documental.
4. Separar preguntas desactualizadas por cambios normativos.
5. No mezclar preguntas de estudio con claves oficiales sin verificacion.

## Siguiente paso tecnico

Crear una matriz de validacion por pregunta con columnas de fuente normativa, articulo o documento, estado de validacion y observacion tecnica.
