import { Router } from "express";
import multer from "multer";
import { PostController } from "../controllers/PostController";

export const createPostRoutes = (): Router => {
  const router = Router();
  const controller = new PostController();
  
  const upload = multer({ storage: multer.memoryStorage() });

  router.get("/posts", controller.getPosts);
  router.post("/posts", upload.single("imageFile"), controller.createPost);

  return router;
};
