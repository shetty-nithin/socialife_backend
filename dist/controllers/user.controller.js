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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.findUser = exports.getUsers = exports.getLike = void 0;
const connect_1 = require("../connect");
const getLike = (req, res) => {
    const q = "SELECT userId FROM likes WHERE postId = ?";
    connect_1.db.query(q, [req.query.postId], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json(data.map((like) => like.userId));
    });
};
exports.getLike = getLike;
const getUsers = (req, res) => {
    const q = "SELECT id, name, profilePhoto FROM users WHERE name LIKE ?";
    connect_1.db.query(q, [`${req.query.name}%`], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json(data);
    });
};
exports.getUsers = getUsers;
const findUser = (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id = (?)";
    connect_1.db.query(q, [userId], (err, data) => {
        if (err)
            return res.status(500).json(err);
        const _a = data[0], { password } = _a, info = __rest(_a, ["password"]);
        return res.json(info);
    });
};
exports.findUser = findUser;
const updateUser = (req, res) => {
    const q = "UPDATE users SET `name`=?, `city`=?, `website`=?, `coverPhoto`=?, `profilePhoto`=? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.coverPhoto,
        req.body.profilePhoto,
        req.headers.decodedUserId
    ];
    connect_1.db.query(q, values, (err, data) => {
        if (err)
            return res.status(500).json(err);
        if (data.affectedRows > 0)
            return res.json("Updated");
        return res.status(403).json("You are not authorized to update this.");
    });
};
exports.updateUser = updateUser;
exports.default = { getUsers: exports.getUsers, findUser: exports.findUser, updateUser: exports.updateUser };
//# sourceMappingURL=user.controller.js.map