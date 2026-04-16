import { Request, Response } from "express";
import { CreateUser } from "../../../application/use-cases/CreateUser";
import { DeleteUser } from "../../../application/use-cases/DeleteUser";
import { GetUserById } from "../../../application/use-cases/GetUserById";
import { GetUsers } from "../../../application/use-cases/GetUsers";
import { UpdateUser } from "../../../application/use-cases/UpdateUser";

export class UserController {
  constructor(
    private readonly getUsers: GetUsers,
    private readonly getUserById: GetUserById,
    private readonly createUser: CreateUser,
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser
  ) {}

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.getUsers.execute({
        name: this.readQuery(req.query.name),
        email: this.readQuery(req.query.email)
      });

      res.status(200).json(users);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.getUserById.execute(req.params.id);

      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.createUser.execute({
        name: req.body.name,
        email: req.body.email
      });

      res.status(201).json(user);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.updateUser.execute(req.params.id, {
        name: req.body.name,
        email: req.body.email
      });

      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const deleted = await this.deleteUser.execute(req.params.id);

      if (!deleted) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      this.handleError(res, error);
    }
  };

  private readQuery(value: unknown): string | undefined {
    return typeof value === "string" && value.trim() ? value.trim() : undefined;
  }

  private handleError(res: Response, error: unknown): void {
    const message = error instanceof Error ? error.message : "Error interno del servidor";
    const statusCode = message.includes("obligatorio") || message.includes("existe") ? 400 : 500;

    res.status(statusCode).json({ message });
  }
}
