## Integrantes:
- Juliana Franco Alzate
- Emanuel Orozco Gallego
- Cindy Paola

# Blog Web — Posts (/posts)

Blog simple construido con Next.js (App Router), TypeScript y Tailwind, con consumo de API para mostrar publicaciones (posts), ver el detalle de un post y relacionarlo con un usuario (autor).

## Objetivo

Implementar la sección **Posts (/posts)** con estas ideas (según la especificación):

- Blog simple
- Mostrar **título + contenido**
- Ver **detalle** de post
- **Relacionar** el post con un **usuario**

## Alcance funcional

### Rutas

- **/posts**
	- Lista de posts.
	- Cada item muestra al menos: `title` y un extracto de `body`.
	- Muestra el autor relacionado (por ejemplo `user.name` o `user.username`).
	- Navegación a la vista de detalle.

- **/posts/[id]**
	- Vista de detalle de un post.
	- Muestra: `title`, `body` completo y datos del autor (por ejemplo `name`, `username`, `email`).

### Relación Post → Usuario

- Un post contiene un `userId`.
- Se obtiene la información del usuario y se muestra como “autor”.

## API (consumo)

Si no tienes una API propia, puedes usar una API pública como ejemplo.

### Opción recomendada (demo): JSONPlaceholder

Base URL: https://jsonplaceholder.typicode.com

- Listado de posts: `GET /posts`
- Detalle de post: `GET /posts/:id`
- Detalle de usuario: `GET /users/:id`

Modelo esperado (simplificado):

```ts
type Post = {
	id: number;
	userId: number;
	title: string;
	body: string;
};

type User = {
	id: number;
	name: string;
	username: string;
	email: string;
};
```

## Tech stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
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

## Estructura sugerida (App Router)

> Esta estructura es una guía para implementar las rutas del alcance.

- `src/app/posts/page.tsx` → listado
- `src/app/posts/[id]/page.tsx` → detalle
- `src/lib/api.ts` → funciones `fetchPosts`, `fetchPost`, `fetchUser` (opcional)
- `src/types/` → tipos TypeScript (opcional)

## Criterios de aceptación (checklist)

- [ ] Existe la ruta **/posts** con listado de posts.
- [ ] Cada post muestra **título** y **contenido** (extracto o completo según diseño).
- [ ] Cada post enlaza a su **detalle**.
- [ ] Existe la ruta **/posts/[id]** y muestra **título + body**.
- [ ] En listado y/o detalle se muestra el **usuario asociado** al post.
- [ ] El layout usa **Tailwind** (sin CSS inline como solución principal).
- [ ] Los datos se obtienen mediante **consumo de API** (fetch/HTTP), no hardcode.

## Notas de implementación

- Puedes usar `fetch` en Server Components (recomendado) o Route Handlers si necesitas encapsular lógica.
- Para desarrollo, prioriza simplicidad: primero listado → luego detalle → luego relación con usuario.
