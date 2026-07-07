# Implementacion inicial de autenticacion

## Rama

`feature/auth-login`

## Objetivo

Implementar autenticacion inicial con cedula, contrasena, cookie de sesion firmada, cierre de sesion y proteccion basica de rutas.

## Archivos incluidos

- `src/lib/auth/password.ts`
- `src/lib/auth/session.ts`
- `src/lib/auth/require-session.ts`
- `src/app/api/auth/login/route.ts`
- `src/app/api/auth/logout/route.ts`
- `middleware.ts`
- Actualizacion de `src/app/login/page.tsx`
- Actualizacion de `src/components/layout/app-shell.tsx`
- Actualizacion de `src/app/admin/page.tsx`

## Flujo de autenticacion

1. El usuario ingresa cedula y contrasena en `/login`.
2. El formulario envia una peticion `POST` a `/api/auth/login`.
3. El sistema busca el usuario por cedula en PostgreSQL mediante Prisma.
4. El sistema valida que el usuario este activo.
5. El sistema compara la contrasena contra `passwordHash` usando bcrypt.
6. Si las credenciales son validas, crea una cookie de sesion firmada.
7. El usuario es redirigido a `/inicio`.
8. El cierre de sesion borra la cookie y redirige a `/login`.

## Proteccion de rutas

El middleware protege rutas principales mediante existencia de cookie:

- `/inicio`
- `/cursos`
- `/banco-preguntas`
- `/simulacros`
- `/progreso`
- `/reportes`
- `/admin`

Adicionalmente, `AppShell` exige sesion valida mediante `requireSession()`.

## Control de rol administrador

La ruta `/admin` exige rol `ADMINISTRADOR` mediante `requireAdminSession()`.

## Validacion local sugerida

```bash
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run typecheck
npm run dev
```

## Credenciales locales de prueba

Las credenciales dependen del archivo `.env` local:

```bash
ADMIN_DEFAULT_CEDULA="00000000"
ADMIN_DEFAULT_PASSWORD="change-me"
```

## Advertencias tecnicas

- La implementacion usa cookie HTTP-only firmada.
- La cookie expira a las 8 horas.
- `AUTH_SECRET` o `JWT_SECRET` debe estar definido en el entorno.
- El middleware no valida criptograficamente la cookie; esa validacion se hace en los componentes y helpers de servidor.
- Antes de produccion se recomienda reforzar auditoria, bloqueo por intentos fallidos y rotacion de secretos.
