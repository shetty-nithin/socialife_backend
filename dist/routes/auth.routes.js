"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const index_1 = require("../middlewares/index");
const router = express_1.default.Router();
router.post("/register", [index_1.verifyAuth.validateRegisterBody], auth_controller_1.default.register);
router.post("/login", [index_1.verifyAuth.validateLoginBody], auth_controller_1.default.login);
router.post("/logout/:id", [index_1.authJWT.verifyToken], auth_controller_1.default.logout);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map