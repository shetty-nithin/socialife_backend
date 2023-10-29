"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = __importDefault(require("../configs/auth.config"));
const verifyToken = (req, res, next) => {
    let token = req.headers.cookie;
    if (token !== undefined) {
        token = token.replace("accessToken=", "");
    }
    if (!token || token == undefined) {
        return res.status(403).send("You don't have a token. Please login first.");
    }
    jsonwebtoken_1.default.verify(token, (auth_config_1.default.secretKey || "someSecretKey"), (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(403).send("Your are not authorized!");
        }
        const jwtPayload = decoded;
        if (!(jwtPayload === null || jwtPayload === void 0 ? void 0 : jwtPayload.exp) || ((jwtPayload === null || jwtPayload === void 0 ? void 0 : jwtPayload.exp) || 0) < Date.now() / 1000) {
            return res.status(403).send("Your are not authorized!");
        }
        req.headers["decodedUserId"] = jwtPayload.id;
        // res.locals.decodedUserId = jwtPayload?.id;
        next();
    }));
};
exports.default = { verifyToken };
//# sourceMappingURL=authJWT.js.map