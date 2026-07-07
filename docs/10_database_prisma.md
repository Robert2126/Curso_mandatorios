# Configuracion PostgreSQL y Prisma

## Rama

`feature/database-prisma`

## Objetivo

Configurar la base de datos del proyecto Aula Mandatorios mediante Prisma ORM y PostgreSQL.

## Archivos incluidos

- `prisma/schema.prisma`
- `prisma/seed.ts`
- `src/lib/prisma.ts`
- Actualizacion de scripts Prisma en `package.json`

## Scripts agregados

```bash
npm run db:generate
npm run db:push
npm run db:migrate
npm run db:studio
npm run db:seed
```

## Variables necesarias

El archivo `.env` local debe incluir:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
ADMIN_DEFAULT_CEDULA="00000000"
ADMIN_DEFAULT_PASSWORD="change-me"
```

## Validacion local sugerida

```bash
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run typecheck
```

## Modelos principales

- User
- Role
- UserRole
- Cycle
- Course
- Topic
- Resource
- AppliedExample
- Question
- AnswerOption
- PracticeSession
- PracticeAnswer
- MockExam
- MockExamAttempt
- MockExamAnswer
- UserProgress
- StudySession
- PersonalNote

## Reglas contempladas

- Cedula unica por usuario.
- Relacion usuario-rol.
- Cursos asociados a ciclos.
- Temas asociados a cursos.
- Preguntas asociadas a cursos y opcionalmente a temas.
- Intento unico por usuario y simulacro.
- Semilla inicial con roles, ciclos, curso de prueba, tema, pregunta, opciones y simulacro.

## Nota tecnica

La regla de una unica respuesta correcta por pregunta puede requerir indice parcial en PostgreSQL si se necesita reforzar a nivel de base de datos. Prisma no expresa directamente indices parciales de PostgreSQL en el schema basico.
