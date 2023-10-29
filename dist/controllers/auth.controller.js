"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const connect_1 = require("../connect");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = __importDefault(require("../configs/auth.config"));
const register = (req, res) => {
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashedPassword = bcryptjs_1.default.hashSync(req.body.password, salt);
    const q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE (?)";
    const values = [req.body.username, req.body.email, hashedPassword, req.body.name];
    connect_1.db.query(q, [values], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json("User has been created!");
    });
};
exports.register = register;
const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";
    connect_1.db.query(q, [req.body.username], (err, data) => {
        if (err)
            return res.status(500).json(err);
        if (data.length === 0)
            return res.status(404).json("User not found!");
        const checkPassword = bcryptjs_1.default.compareSync(req.body.password, data[0].password);
        if (!checkPassword)
            return res.status(400).json("wrong password!");
        const token = jsonwebtoken_1.default.sign({ id: data[0].id }, (auth_config_1.default.secretKey || "someSecretKey"), { expiresIn: `24h` });
        const _a = data[0], { password } = _a, others = __rest(_a, ["password"]);
        res.cookie("accessToken", token, {
            expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)),
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        }).status(200).json(others);
    });
};
exports.login = login;
const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out!");
};
exports.logout = logout;
exports.default = { register: exports.register, login: exports.login, logout: exports.logout };
//# sourceMappingURL=auth.controller.js.map