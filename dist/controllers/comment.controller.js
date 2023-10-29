"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.addComment = exports.getComments = void 0;
const connect_1 = require("../connect");
const moment_1 = __importDefault(require("moment"));
const getComments = (req, res) => {
    const q = `SELECT c.*, u.id AS userId, name, profilePhoto FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC`;
    connect_1.db.query(q, [req.query.postId], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json(data);
    });
};
exports.getComments = getComments;
const addComment = (req, res) => {
    const q = "INSERT INTO comments(`desc`, `userId`, `createdAt`, `postId`) VALUES (?)";
    const values = [
        req.body.desc,
        req.headers.decodedUserId,
        (0, moment_1.default)(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.body.postId
    ];
    connect_1.db.query(q, [values], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json("Comment has been created.");
    });
};
exports.addComment = addComment;
const updateComment = (req, res) => {
    //TODO
};
exports.updateComment = updateComment;
const deleteComment = (req, res) => {
    //TODO
};
exports.deleteComment = deleteComment;
exports.default = { getComments: exports.getComments, addComment: exports.addComment, updateComment: exports.updateComment, deleteComment: exports.deleteComment };
//# sourceMappingURL=comment.controller.js.map