import express from "express";
import userController from "../controllers/user.controller.js";
import { authJWT } from "../middlewares/index.js"

const router = express.Router();

router.get("/find/:userId",[authJWT.verifyToken], userController.findUser);
router.get("/",[authJWT.verifyToken], userController.getUsers);
router.put("/", [authJWT.verifyToken], userController.updateUser);

export default router;