import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const findUser = (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id = (?)";

    db.query(q, [userId], (err, data) => {
        if(err) return res.status(500).json(err);
        const { password, ...info} = data[0];
        return res.json(info);
    })
}

export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", (err, userData) => {
        if(err) return res.status(403).json("Please login again. Your token has expired!");
        const q = "UPDATE users SET `name`=?, `city`=?, `website`=?, `coverPhoto`=?, `profilePhoto`=? WHERE id = ?";
    
        const values = [ 
            req.body.name,
            req.body.city,
            req.body.website,
            req.body.coverPhoto,
            req.body.profilePhoto,
            userData.id
        ]
        db.query(q, values, (err, data) => {
            if(err) return res.status(500).json(err);
            if(data.affectedRows > 0) return res.json("Updated");
            return res.status(403).json("You are not authorized to update this.")
        })
    });
}

export default { findUser, updateUser };