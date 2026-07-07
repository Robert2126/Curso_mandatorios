# Prisma schema propuesto

Este archivo documenta la intencion del modelo Prisma. El archivo real sera `prisma/schema.prisma` cuando se inicialice el proyecto Next.js.

## Configuracion esperada

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## Modelos iniciales previstos

- Usuario
- Rol
- UsuarioRol
- Ciclo
- Curso
- Tema
- Recurso
- Pregunta
- OpcionRespuesta
- Simulacro
- IntentoSimulacro
- RespuestaSimulacro
- AvanceUsuario

## Reglas a reflejar en Prisma

- Cedula unica por usuario.
- Una respuesta correcta por pregunta, reforzada con indice parcial SQL.
- Un intento por usuario y simulacro.
- Relaciones con borrado controlado.
- Campos de auditoria y fechas de creacion.
