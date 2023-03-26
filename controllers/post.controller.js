import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
    const uId = req.query.userId;
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", (err, userData) => {
        if(err) return res.status(403).json("Please login again. Your token has expired!");
        
        const q = uId !== 'undefined'
                    ?   `SELECT p.*, u.id AS userId, name, profilePhoto FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
                    :   `SELECT p.*, u.id AS userId, name, profilePhoto FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`;
        
        const values = uId !== "undefined" ? [uId] : [userData.id, userData.id];
        db.query(q, values, (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data)
        })
    })
}

export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", (err, userData) => {
        if(err) return res.status(403).json("Please login again. Your token has expired!");
        
        const q = "INSERT INTO posts(`desc`, `img`, `userId`, `createdAt`) VALUES (?)";
        const values = [
            req.body.desc,
            req.body.img,
            userData.id,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ]
        
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post has been created.");
        })
    }) 
}

export const deletePost = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", (err, userData) => {
        if(err) return res.status(403).json("Please login again. Your token has expired!");
        
        const q = "DELETE FROM posts WHERE `id`=? AND `userId`=?";
        
        db.query(q, [req.params.id, userData.id], (err, data) => {
            if(err) return res.status(500).json(err);
            if(data.affectedRows > 0) return res.status(200).json("Post has been deleted successfully.");
            return res.status(403).json("You are not authorized to delete this post");
        })
    }) 
}

export default { getPosts, addPost, deletePost };