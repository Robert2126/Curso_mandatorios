# Consolidacion de matriz de revision de preguntas

## Rama

`feature/question-bank-consolidation`

## Archivo consolidado

- `content/matriz_revision_preguntas_consolidada.csv`

## Alcance

Se consolida en un solo archivo la matriz preliminar de revision correspondiente a las 100 preguntas del repositorio publico de evaluacion teorica virtual.

## Insumos consolidados

- `content/matriz_revision_preguntas_lote_01.csv` preguntas 1 a 10.
- `content/matriz_revision_preguntas_lote_02.csv` preguntas 11 a 20.
- `content/matriz_revision_preguntas_lote_03.csv` preguntas 21 a 30.
- `content/matriz_revision_preguntas_lote_04.csv` preguntas 31 a 40.
- `content/matriz_revision_preguntas_lote_05.csv` preguntas 41 a 50.
- `content/matriz_revision_preguntas_lote_06.csv` preguntas 51 a 60.
- `content/matriz_revision_preguntas_lote_07.csv` preguntas 61 a 70.
- `content/matriz_revision_preguntas_lote_08.csv` preguntas 71 a 80.
- `content/matriz_revision_preguntas_lote_09.csv` preguntas 81 a 90.
- `content/matriz_revision_preguntas_lote_10.csv` preguntas 91 a 100.

## Estado de validacion

Todas las filas conservan el estado `PENDIENTE_VALIDACION`.

El archivo no debe usarse todavia como banco oficial ni como insumo de importacion automatica de respuestas correctas. Su finalidad es servir como matriz de revision, trazabilidad y depuracion normativa.

## Preguntas con opcion marcada como POR_VALIDAR

- Pregunta 31: tonfa como elemento basico para patrullaje.
- Pregunta 35: elemento que no hace parte de los elementos principales.
- Pregunta 78: procedimiento de vigilancia y control en materia de infancia y adolescencia.

## Bloques que requieren mayor control normativo

- Uniformes, distintivos y elementos para el servicio.
- Ley 1801 de 2016 y medidas correctivas.
- Mediacion policial.
- Ruta VBG.
- Infancia y adolescencia.
- Migracion, visas y documentos de extranjeros.
- Inmunidad diplomatica.
- Uso de la fuerza y estandares DIDH.

## Criterio de cierre

La consolidacion completa la fase preliminar de organizacion de las 100 preguntas. La siguiente fase debe separar:

1. Preguntas con respaldo normativo confirmado.
2. Preguntas que requieren correccion de opcion propuesta.
3. Preguntas que no deben importarse por falta de soporte vigente.
4. Preguntas aptas para CSV importable al sistema.

## Recomendacion tecnica

Crear un segundo archivo posterior llamado `content/preguntas_importables_validadas.csv` solo cuando exista verificacion normativa o clave oficial confiable. No se recomienda transformar directamente esta matriz en banco de preguntas operativo.
