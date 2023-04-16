import express from "express";
import userController from "../controllers/user.controller.js";
import { authJWT } from "../middlewares/index.js"

const router = express.Router();

router.get("/find/:userId", userController.findUser);
router.get("/", userController.getUsers);
router.put("/", [authJWT.verifyToken], userController.updateUser);

export default router;