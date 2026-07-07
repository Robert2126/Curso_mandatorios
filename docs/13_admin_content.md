# Modulo administrativo de contenidos

## Rama

`feature/admin-content`

## Issue relacionado

`#13 Crear modulo administrativo de contenidos`

## Objetivo

Crear la primera capa administrativa para gestionar la estructura de contenidos de Aula Mandatorios.

## Alcance implementado

- Acciones de creacion basica para ciclos, cursos, temas, preguntas y simulacros.
- Consultas administrativas mediante Prisma.
- Pagina administrativa de ciclos.
- Pagina administrativa de cursos.
- Pagina administrativa de temas.
- Pagina administrativa de preguntas.
- Pagina administrativa de simulacros.
- Pagina reservada para recursos de estudio.
- Actualizacion del panel administrativo principal.

## Material de estudio

Todavia no se carga material de estudio completo. La plataforma queda preparada para recibirlo en la siguiente fase.

Cuando se avance a contenidos, se necesitara una de estas opciones:

1. Archivos suministrados por el usuario.
2. Enlace oficial accesible para extraer la estructura.
3. Banco de preguntas en archivo estructurado.

## Validacion local sugerida

```bash
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run typecheck
npm run dev
```
