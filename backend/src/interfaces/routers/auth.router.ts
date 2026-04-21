import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export const createAuthRoutes = (): Router => {
  const router = Router();
  const controller = new AuthController();

  router.post("/auth/login", controller.login);
  router.post("/auth/register", controller.register);
  router.post("/auth/logout", controller.logout);

  return router;
};
