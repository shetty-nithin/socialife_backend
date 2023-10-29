"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = __importDefault(require("../controllers/comment.controller"));
const index_1 = require("../middlewares/index");
const router = express_1.default.Router();
router.get("/", [index_1.authJWT.verifyToken], comment_controller_1.default.getComments);
router.post("/", [index_1.authJWT.verifyToken], comment_controller_1.default.addComment);
router.put("/:id", [index_1.authJWT.verifyToken], comment_controller_1.default.updateComment);
router.delete("/:id", [index_1.authJWT.verifyToken], comment_controller_1.default.deleteComment);
exports.default = router;
//# sourceMappingURL=comment.routes.js.map