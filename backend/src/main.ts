import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import express from "express";
import cors from "cors";

import { CreateUser } from "./application/use-cases/CreateUser";
import { DeleteUser } from "./application/use-cases/DeleteUser";
import { GetUserById } from "./application/use-cases/GetUserById";
import { GetUsers } from "./application/use-cases/GetUsers";
import { UpdateUser } from "./application/use-cases/UpdateUser";
import { InMemoryUserRepository } from "./infrastructure/persistence/InMemoryUserRepository";
import { UserController } from "./interfaces/controllers/UserController";
import { createUserRoutes } from "./interfaces/routers/user.router";

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize Clean Architecture Dependencies
const userRepository = new InMemoryUserRepository();
const userController = new UserController(
  new GetUsers(userRepository),
  new GetUserById(userRepository),
  new CreateUser(userRepository),
  new UpdateUser(userRepository),
  new DeleteUser(userRepository)
);

// Routes
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(createUserRoutes(userController));

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
