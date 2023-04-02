import { db } from "../connect.js";
import moment from "moment";

export const getComments = (req, res) => {
    const q = `SELECT c.*, u.id AS userId, name, profilePhoto FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC`;
    
    db.query(q, [req.query.postId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data)
    })
}

export const addComment = (req, res) => {
    const q = "INSERT INTO comments(`desc`, `userId`, `createdAt`, `postId`) VALUES (?)";
    const values = [
        req.body.desc,
        req.decodedUserId,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.body.postId
    ]
    
    db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("Comment has been created.");
    })
}

export const updateComment = (req, res) => {
    //TODO
}

export const deleteComment = (req, res) => {
    //TODO
}

export default { getComments, addComment, updateComment, deleteComment };