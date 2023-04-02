import express from "express";
import uploadController from "../controllers/upload.controller.js";
import { authJWT } from "../middlewares/index.js";

const router = express.Router();

router.post("/", [authJWT.verifyToken], uploadController.upload);

export default router;