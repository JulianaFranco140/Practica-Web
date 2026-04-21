"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRoutes = void 0;
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const createAuthRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new AuthController_1.AuthController();
    router.post("/auth/login", controller.login);
    router.post("/auth/register", controller.register);
    router.post("/auth/logout", controller.logout);
    return router;
};
exports.createAuthRoutes = createAuthRoutes;
