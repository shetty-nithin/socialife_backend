import { db } from "../connect";
import { Request, Response } from "express";

export const getLike = (req: Request, res: Response) => {
    const q = "SELECT userId FROM likes WHERE postId = ?";
    
    db.query(q, [req.query.postId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data.map((like: {userId: string}) => like.userId));
    })
}

export const addLike = (req: Request, res: Response) => {
    const q = "INSERT INTO likes(`userId`, `postId`) VALUES (?)";
    const values = [
        req.headers.decodedUserId,
        req.body.postId
    ]
    
    db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("Post has been liked.");
    })
}

export const deleteLike = (req: Request, res: Response) => {
    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";
    
    db.query(q, [req.headers.decodedUserId, req.query.postId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("Post has been unliked.");
    })
}

export default { getLike, addLike, deleteLike };