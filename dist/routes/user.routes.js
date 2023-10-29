"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const index_1 = require("../middlewares/index");
const router = express_1.default.Router();
router.get("/find/:userId", user_controller_1.default.findUser);
router.get("/", [index_1.authJWT.verifyToken], user_controller_1.default.getUsers);
router.put("/", [index_1.authJWT.verifyToken], user_controller_1.default.updateUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map