"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env.local" });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const CreateUser_1 = require("./application/use-cases/CreateUser");
const DeleteUser_1 = require("./application/use-cases/DeleteUser");
const GetUserById_1 = require("./application/use-cases/GetUserById");
const GetUsers_1 = require("./application/use-cases/GetUsers");
const UpdateUser_1 = require("./application/use-cases/UpdateUser");
const InMemoryUserRepository_1 = require("./infrastructure/persistence/InMemoryUserRepository");
const UserController_1 = require("./interfaces/controllers/UserController");
const user_router_1 = require("./interfaces/routers/user.router");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Initialize Clean Architecture Dependencies
const userRepository = new InMemoryUserRepository_1.InMemoryUserRepository();
const userController = new UserController_1.UserController(new GetUsers_1.GetUsers(userRepository), new GetUserById_1.GetUserById(userRepository), new CreateUser_1.CreateUser(userRepository), new UpdateUser_1.UpdateUser(userRepository), new DeleteUser_1.DeleteUser(userRepository));
// Routes
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});
app.use((0, user_router_1.createUserRoutes)(userController));
// Start server
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
