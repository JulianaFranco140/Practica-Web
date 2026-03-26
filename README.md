## Integrantes:
- Juliana Franco Alzate
- Emanuel Orozco Gallego


# Blog Web

Aplicacion web construida con Next.js (App Router), TypeScript y Tailwind CSS.

Incluye:

- pagina principal
- registro e inicio de sesion con nombre de usuario y contraseña
- dashboard protegido por sesion custom
- creacion y listado de publicaciones
- carga de imagen para publicaciones con Supabase Storage

## Funcionalidades actuales

- ` / `: landing principal.
- ` /register `: crear cuenta con nombre de usuario, contraseña y confirmacion.
- ` /login `: iniciar sesion con nombre de usuario y contraseña.
- ` /dashboard `:
  - crear publicaciones
  - subir imagen opcional
  - listar publicaciones recientes
  - cerrar sesion

## Integracion con Supabase

El proyecto usa Supabase para:

- base de datos
- almacenamiento de imagenes (bucket `post-images`)
- RPC para auth custom y publicaciones

Variables requeridas en `.env.local`:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

## Estructura del proyecto

- `src/app/page.tsx` -> pagina principal
- `src/app/login/page.tsx` -> inicio de sesion
- `src/app/register/page.tsx` -> registro
- `src/app/dashboard/page.tsx` -> dashboard
- `src/components/AuthCard.tsx` -> layout reutilizable para auth
- `src/components/TextField.tsx` -> input reutilizable
- `src/components/Button.tsx` -> boton reutilizable
- `src/lib/supabase.ts` -> cliente Supabase
- `src/lib/auth.ts` -> auth custom (register/login/logout)
- `src/lib/posts.ts` -> crear/listar publicaciones + imagen

## Tech stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Supabase
- ESLint

## Scripts

Instalar dependencias:

```bash
pnpm install
```

Desarrollo:

```bash
pnpm dev
```

Build:

```bash
pnpm build
```

Producción local:

```bash
pnpm start
```

Lint:

```bash
pnpm lint
```

## Recomendaciones

- Ejecutar `pnpm build` antes de subir cambios.
- Mantener las funciones RPC sincronizadas con los nombres usados en `src/lib/auth.ts` y `src/lib/posts.ts`.
- Validar en Supabase que existan:
	- tablas: `app_users`, `app_sessions`, `posts`
	- bucket: `post-images`
	- funciones RPC: `app_register`, `app_login`, `app_logout`, `app_create_post`, `app_list_posts`
