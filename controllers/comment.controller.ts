import { db } from "../connect";
import moment from "moment";
import { Request, Response } from "express";

export const getComments = (req: Request, res: Response) => {
    const q = `SELECT c.*, u.id AS userId, name, profilePhoto FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC`;
    
    db.query(q, [req.query.postId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data)
    })
}

export const addComment = (req: Request, res: Response) => {
    const q = "INSERT INTO comments(`desc`, `userId`, `createdAt`, `postId`) VALUES (?)";
    const values = [
        req.body.desc,
        req.headers.decodedUserId,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.body.postId
    ]
    
    db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("Comment has been created.");
    })
}

export const updateComment = (req: Request, res: Response) => {
    //TODO
}

export const deleteComment = (req: Request, res: Response) => {
    //TODO
}

export default { getComments, addComment, updateComment, deleteComment };