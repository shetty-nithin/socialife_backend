"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const like_controller_1 = __importDefault(require("../controllers/like.controller"));
const index_1 = require("../middlewares/index");
const router = express_1.default.Router();
router.get("/", [index_1.authJWT.verifyToken], like_controller_1.default.getLike);
router.post("/", [index_1.authJWT.verifyToken], like_controller_1.default.addLike);
router.delete("/", [index_1.authJWT.verifyToken], like_controller_1.default.deleteLike);
exports.default = router;
//# sourceMappingURL=like.routes.js.map