import express from "express";
import authController from "../controllers/auth.controller.js";
import { verifyAuth, authJWT } from "../middlewares/index.js";

const router = express.Router();
router.post("/register", [verifyAuth.validateRegisterBody], authController.register);
router.post("/login", [verifyAuth.validateLoginBody], authController.login);
router.post("/logout", [authJWT.verifyToken], authController.logout);

export default router;