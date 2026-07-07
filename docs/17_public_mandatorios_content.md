# Carga inicial desde fuente publica de cursos mandatorios

## Rama

`feature/content-material-ingestion`

## Issue relacionado

`#26 Cargar material real de estudio`

## Fuente revisada

Pagina publica de Cursos Mandatorios de la Direccion de Educacion Policial.

## Archivos creados

- `content/fuentes_publicas_mandatorios.csv`
- `content/mandatorios_cursos_publicos.csv`
- `content/mandatorios_estandares_publicos.csv`
- `content/mandatorios_procedimientos_publicos.csv`

## Alcance

Se estructura una primera base publica con cursos, estandares minimos y temas visibles de procedimientos.

## Restriccion sobre preguntas

El repositorio de evaluacion teorica virtual contiene 100 preguntas en PDF, pero no se identifico una clave oficial de respuestas en el texto extraido. Por control de calidad, no se carga el banco completo como definitivo hasta verificar respuestas.

## Uso recomendado

Estos archivos sirven para preparar la semilla de contenidos y luego construir importadores o scripts de carga hacia Prisma.

## Siguiente paso

Crear un script de transformacion para convertir estos CSV en datos de ciclos, cursos, temas y recursos dentro de la base de datos.
