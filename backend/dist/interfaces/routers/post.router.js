"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const PostController_1 = require("../controllers/PostController");
const createPostRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new PostController_1.PostController();
    const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
    router.get("/posts", controller.getPosts);
    router.post("/posts", upload.single("imageFile"), controller.createPost);
    return router;
};
exports.createPostRoutes = createPostRoutes;
