"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRoutes = void 0;
const express_1 = require("express");
const createUserRoutes = (controller) => {
    const router = (0, express_1.Router)();
    router.get("/users", controller.getAll);
    router.get("/users/:id", controller.getById);
    router.post("/users", controller.create);
    router.put("/users/:id", controller.update);
    router.delete("/users/:id", controller.delete);
    return router;
};
exports.createUserRoutes = createUserRoutes;
