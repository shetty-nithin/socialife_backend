import express from "express";
import commentController from "../controllers/comment.controller.js";
import { authJWT } from "../middlewares/index.js";

const router = express.Router();
router.get("/", [authJWT.verifyToken],commentController.getComments);
router.post("/", [authJWT.verifyToken],commentController.addComment);

export default router;