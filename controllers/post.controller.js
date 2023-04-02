import { db } from "../connect.js";
import moment from "moment";

export const getPosts = (req, res) => {
    const uId = req.query.userId;
    const q = uId !== 'undefined'
                ?   `SELECT p.*, u.id AS userId, name, profilePhoto FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
                :   `SELECT p.*, u.id AS userId, name, profilePhoto FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`;
    
    const values = uId !== "undefined" ? [uId] : [req.decodedUserId, req.decodedUserId];
    db.query(q, values, (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data)
    })
}

export const addPost = (req, res) => {
    const q = "INSERT INTO posts(`desc`, `img`, `userId`, `createdAt`) VALUES (?)";
    const values = [
        req.body.desc,
        req.body.img,
        req.decodedUserId,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ]
    
    db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("Post has been created.");
    })
}

export const deletePost = (req, res) => {
    const q = "DELETE FROM posts WHERE `id`=? AND `userId`=?";
    db.query(q, [req.params.id, req.decodedUserId], (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.affectedRows > 0) return res.status(200).json("Post has been deleted successfully.");
        return res.status(403).json("You are not authorized to delete this post");
    })
}

export default { getPosts, addPost, deletePost };