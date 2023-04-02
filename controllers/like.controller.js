import { db } from "../connect.js";

export const getLike = (req, res) => {
    const q = "SELECT userId FROM likes WHERE postId = ?";
    
    db.query(q, [req.query.postId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data.map(like => like.userId));
    })
}

export const addLike = (req, res) => {
    const q = "INSERT INTO likes(`userId`, `postId`) VALUES (?)";
    const values = [
        req.decodedUserId,
        req.body.postId
    ]
    
    db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("Post has been liked.");
    })
}

export const deleteLike = (req, res) => {
    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";
    
    db.query(q, [req.decodedUserId, req.query.postId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("Post has been unliked.");
    })
}

export default { getLike, addLike, deleteLike };