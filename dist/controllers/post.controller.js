"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.addPost = exports.getPosts = void 0;
const connect_1 = require("../connect");
const moment_1 = __importDefault(require("moment"));
const getPosts = (req, res) => {
    const uId = req.query.userId;
    const q = uId !== 'undefined'
        ? `SELECT p.*, u.id AS userId, u.name, u.profilePhoto FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.id AS userId, u.name, u.profilePhoto FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`;
    const values = uId !== "undefined" ? [uId] : [req.headers.decodedUserId, req.headers.decodedUserId];
    connect_1.db.query(q, values, (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json(data);
    });
};
exports.getPosts = getPosts;
const addPost = (req, res) => {
    const q = "INSERT INTO posts(`desc`, `img`, `userId`, `createdAt`) VALUES (?)";
    const values = [
        req.body.desc,
        req.body.img,
        req.headers.decodedUserId,
        (0, moment_1.default)(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];
    connect_1.db.query(q, [values], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json("Post has been created.");
    });
};
exports.addPost = addPost;
const deletePost = (req, res) => {
    const q = "DELETE FROM posts WHERE `id`=? AND `userId`=?";
    connect_1.db.query(q, [req.params.id, req.headers.decodedUserId], (err, data) => {
        if (err)
            return res.status(500).json(err);
        if (data.affectedRows > 0)
            return res.status(200).json("Post has been deleted successfully.");
        return res.status(403).json("You are not authorized to delete this post");
    });
};
exports.deletePost = deletePost;
exports.default = { getPosts: exports.getPosts, addPost: exports.addPost, deletePost: exports.deletePost };
//# sourceMappingURL=post.controller.js.map