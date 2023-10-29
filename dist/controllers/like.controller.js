"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLike = exports.addLike = exports.getLike = void 0;
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
const addLike = (req, res) => {
    const q = "INSERT INTO likes(`userId`, `postId`) VALUES (?)";
    const values = [
        req.headers.decodedUserId,
        req.body.postId
    ];
    connect_1.db.query(q, [values], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json("Post has been liked.");
    });
};
exports.addLike = addLike;
const deleteLike = (req, res) => {
    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";
    connect_1.db.query(q, [req.headers.decodedUserId, req.query.postId], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json("Post has been unliked.");
    });
};
exports.deleteLike = deleteLike;
exports.default = { getLike: exports.getLike, addLike: exports.addLike, deleteLike: exports.deleteLike };
//# sourceMappingURL=like.controller.js.map