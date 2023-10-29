"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const relationship_controller_1 = __importDefault(require("../controllers/relationship.controller"));
const index_1 = require("../middlewares/index");
const router = express_1.default.Router();
router.get("/", [index_1.authJWT.verifyToken], relationship_controller_1.default.getRelationships);
router.get("/followers", [index_1.authJWT.verifyToken], relationship_controller_1.default.getAllFollowers);
router.get("/followed", [index_1.authJWT.verifyToken], relationship_controller_1.default.getAllFollowedUsers);
router.get("/suggestions", [index_1.authJWT.verifyToken], relationship_controller_1.default.getSuggestedUsers);
router.post("/", [index_1.authJWT.verifyToken], relationship_controller_1.default.addRelationship);
router.delete("/", [index_1.authJWT.verifyToken], relationship_controller_1.default.deleteRelationship);
exports.default = router;
//# sourceMappingURL=relationship.routes.js.map