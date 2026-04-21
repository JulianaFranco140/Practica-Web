import express from "express";
import { CreateUser } from "../../application/use-cases/CreateUser";
import { DeleteUser } from "../../application/use-cases/DeleteUser";
import { GetUserById } from "../../application/use-cases/GetUserById";
import { GetUsers } from "../../application/use-cases/GetUsers";
import { UpdateUser } from "../../application/use-cases/UpdateUser";
import { InMemoryUserRepository } from "../../infrastructure/persistence/InMemoryUserRepository";
import { UserController } from "./controllers/UserController";
import { createUserRoutes } from "./routes/userRoutes";

export const createServer = () => {
  const app = express();

  app.use(express.json());

  const userRepository = new InMemoryUserRepository();
  const controller = new UserController(
    new GetUsers(userRepository),
    new GetUserById(userRepository),
    new CreateUser(userRepository),
    new UpdateUser(userRepository),
    new DeleteUser(userRepository)
  );

  app.use(createUserRoutes(controller));

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  return app;
};
