import express from "express";
import likeController from "../controllers/like.controller.js";
import { authJWT } from "../middlewares/index.js";

const router = express.Router();

router.get("/", [authJWT.verifyToken], likeController.getLike);
router.post("/", [authJWT.verifyToken], likeController.addLike);
router.delete("/", [authJWT.verifyToken], likeController.deleteLike);

export default router;