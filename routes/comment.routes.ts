import express from "express";
import commentController from "../controllers/comment.controller";
import { authJWT } from "../middlewares/index";

const router = express.Router();
router.get("/", [authJWT.verifyToken],commentController.getComments);
router.post("/", [authJWT.verifyToken],commentController.addComment);
router.put("/:id", [authJWT.verifyToken],commentController.updateComment);
router.delete("/:id", [authJWT.verifyToken],commentController.deleteComment);

export default router;