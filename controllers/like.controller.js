import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLike = (req, res) => {
    const q = "SELECT userId FROM likes WHERE postId = ?";
    
    db.query(q, [req.query.postId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data.map(like => like.userId));
    })
}

export const addLike = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", (err, userData) => {
        if(err) return res.status(403).json("Please login again. Your token has expired!");
        
        const q = "INSERT INTO likes(`userId`, `postId`) VALUES (?)";
        const values = [
            userData.id,
            req.body.postId
        ]
        
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post has been liked.");
        })
    }) 
}

export const deleteLike = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", (err, userData) => {
        if(err) return res.status(403).json("Please login again. Your token has expired!");        
        const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";
        
        db.query(q, [userData.id, req.query.postId], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post has been unliked.");
        })
    }) 
}

export default { getLike, addLike, deleteLike };