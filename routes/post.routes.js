import express from "express";
import postController from "../controllers/post.controller.js";
import { authJWT } from "../middlewares/index.js";

const router = express.Router();

router.get("/",[authJWT.verifyToken], postController.getPosts);
router.post("/", [authJWT.verifyToken], postController.addPost);
router.delete("/:id", [authJWT.verifyToken], postController.deletePost);

export default router;