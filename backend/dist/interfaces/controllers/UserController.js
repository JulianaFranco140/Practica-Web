"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(getUsers, getUserById, createUser, updateUser, deleteUser) {
        this.getUsers = getUsers;
        this.getUserById = getUserById;
        this.createUser = createUser;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;
        this.getAll = async (req, res) => {
            try {
                const users = await this.getUsers.execute({
                    name: this.readQuery(req.query.name),
                    email: this.readQuery(req.query.email)
                });
                res.status(200).json(users);
            }
            catch (error) {
                this.handleError(res, error);
            }
        };
        this.getById = async (req, res) => {
            try {
                const user = await this.getUserById.execute(req.params.id);
                if (!user) {
                    res.status(404).json({ message: "Usuario no encontrado" });
                    return;
                }
                res.status(200).json(user);
            }
            catch (error) {
                this.handleError(res, error);
            }
        };
        this.create = async (req, res) => {
            try {
                const user = await this.createUser.execute({
                    name: req.body.name,
                    email: req.body.email
                });
                res.status(201).json(user);
            }
            catch (error) {
                this.handleError(res, error);
            }
        };
        this.update = async (req, res) => {
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
            }
            catch (error) {
                this.handleError(res, error);
            }
        };
        this.delete = async (req, res) => {
            try {
                const deleted = await this.deleteUser.execute(req.params.id);
                if (!deleted) {
                    res.status(404).json({ message: "Usuario no encontrado" });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                this.handleError(res, error);
            }
        };
    }
    readQuery(value) {
        return typeof value === "string" && value.trim() ? value.trim() : undefined;
    }
    handleError(res, error) {
        const message = error instanceof Error ? error.message : "Error interno del servidor";
        const statusCode = message.includes("obligatorio") || message.includes("existe") ? 400 : 500;
        res.status(statusCode).json({ message });
    }
}
exports.UserController = UserController;
