# Users API - Clean Architecture

API REST construida con Node.js, Express y TypeScript siguiendo Clean Architecture.

## Estructura por capas

```text
src/
  domain/
    entities/
      User.ts
    repositories/
      UserRepository.ts
  application/
    use-cases/
      CreateUser.ts
      DeleteUser.ts
      GetUserById.ts
      GetUsers.ts
      UpdateUser.ts
  infrastructure/
    persistence/
      InMemoryUserRepository.ts
  interfaces/
    http/
      controllers/
        UserController.ts
      routes/
        userRoutes.ts
      server.ts
  index.ts
```

## Que va en cada capa

- `domain`: reglas de negocio puras y contratos (entidades e interfaces de repositorio).
- `application`: casos de uso (orquestan reglas de negocio sin depender de Express).
- `infrastructure`: implementaciones tecnicas (repositorio en memoria en este proyecto).
- `interfaces`: capa de entrada/salida (HTTP). Aqui viven rutas y controllers.

## Endpoints

- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

## Como correr

```bash
npm install
npm run dev
```

Por defecto levanta en `http://localhost:3001`.

## Ejemplos de params y query params

- Param de ruta (`:id`):
  - `GET /users/8f2a...`
- Query params (filtros opcionales):
  - `GET /users?name=ana`
  - `GET /users?email=gmail.com`
  - `GET /users?name=ana&email=@empresa.com`

## Probar con curl

Crear usuario:

```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana","email":"ana@mail.com"}'
```

Listar usuarios:

```bash
curl http://localhost:3001/users
```

Listar con query params:

```bash
curl "http://localhost:3001/users?name=ana"
```

Obtener por id:

```bash
curl http://localhost:3001/users/<id>
```

Actualizar:

```bash
curl -X PUT http://localhost:3001/users/<id> \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana Maria","email":"ana.maria@mail.com"}'
```

Eliminar:

```bash
curl -X DELETE http://localhost:3001/users/<id>
```

## Probar con Postman

1. Crea una coleccion `Users API`.
2. Agrega requests para cada endpoint.
3. En `POST` y `PUT`, usa `Body -> raw -> JSON`.
4. Guarda el `id` devuelto por `POST` para usarlo en `GET /users/:id`, `PUT` y `DELETE`.
5. Prueba filtros en `GET /users` agregando query params desde la pestana `Params`.

## Flujo completo request -> response

1. La request entra por `routes` (`userRoutes.ts`).
2. La ruta delega al metodo correspondiente del `UserController`.
3. El controller extrae `params`, `query` y `body` y llama al caso de uso.
4. El caso de uso aplica validaciones y usa el contrato `UserRepository`.
5. La implementacion en memoria (`InMemoryUserRepository`) ejecuta el CRUD.
6. El resultado vuelve al controller, que construye la respuesta HTTP (`status` + `json`).
7. Si hay error de validacion, el controller responde `400`; si no existe recurso, `404`; exito segun operacion (`200`, `201`, `204`).
