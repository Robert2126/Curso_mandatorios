# Gestion de material de estudio

## Rama

`feature/study-materials`

## Issue relacionado

`#23 Preparar gestion de material de estudio`

## Objetivo

Preparar la plataforma para registrar recursos de estudio asociados a cursos o temas, sin cargar todavia material oficial completo.

## Alcance implementado

- Accion administrativa para crear recursos.
- Consulta administrativa de recursos.
- Pagina funcional `/admin/recursos`.
- Asociacion opcional con curso y tema.
- Registro de tipo de recurso, titulo, descripcion, referencia y nota interna.
- Plantilla CSV de referencia para organizar recursos de estudio.

## Tipos de recurso disponibles

- VIDEO
- INFOGRAFIA
- MAPA_CONCEPTUAL
- TEXTO_INTERACTIVO
- ENLACE
- IMAGEN

## Regla basica

Todo recurso debe tener titulo, tipo y al menos una asociacion con curso o tema.

## Material pendiente

Para cargar contenido real se requiere una fuente suministrada por el usuario: archivo, banco estructurado, enlace autorizado, capturas o texto base.

## Siguiente fase recomendada

Crear procesamiento guiado de material suministrado para convertirlo en temas, resumenes, microlecciones, recursos, preguntas y simulacros.

## Validacion local sugerida

```bash
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run typecheck
npm run dev
```
