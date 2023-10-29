"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const index_1 = require("../middlewares/index");
const router = express_1.default.Router();
router.get("/", [index_1.authJWT.verifyToken], post_controller_1.default.getPosts);
router.post("/", [index_1.authJWT.verifyToken], post_controller_1.default.addPost);
router.delete("/:id", [index_1.authJWT.verifyToken], post_controller_1.default.deletePost);
exports.default = router;
//# sourceMappingURL=post.routes.js.map