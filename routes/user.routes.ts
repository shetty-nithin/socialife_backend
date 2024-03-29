import express from "express";
import userController from "../controllers/user.controller";
import { authJWT } from "../middlewares/index"

const router = express.Router();

router.get("/find/:userId", userController.findUser);
router.get("/", [authJWT.verifyToken], userController.getUsers);
router.put("/", [authJWT.verifyToken], userController.updateUser);

export default router;