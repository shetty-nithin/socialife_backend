import express from "express";
import relationshipController from "../controllers/relationship.controller.js";
import { authJWT } from "../middlewares/index.js";

const router = express.Router();

router.get("/", [authJWT.verifyToken], relationshipController.getRelationships);
router.get("/followers", [authJWT.verifyToken], relationshipController.getAllFollowers);
router.get("/followed", [authJWT.verifyToken], relationshipController.getAllFollowedUsers);
router.get("/suggestions", [authJWT.verifyToken], relationshipController.getSuggestedUsers);
router.post("/", [authJWT.verifyToken], relationshipController.addRelationship);
router.delete("/", [authJWT.verifyToken], relationshipController.deleteRelationship);

export default router;