import { Router } from "express";
import { UserController } from "../controllers/UserController";

export const createUserRoutes = (controller: UserController): Router => {
  const router = Router();

  router.get("/users", controller.getAll);
  router.get("/users/:id", controller.getById);
  router.post("/users", controller.create);
  router.put("/users/:id", controller.update);
  router.delete("/users/:id", controller.delete);

  return router;
};
