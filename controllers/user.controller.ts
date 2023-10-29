import { db } from "../connect";
import { Request, Response } from "express";

export const getLike = (req: Request, res: Response) => {
    const q = "SELECT userId FROM likes WHERE postId = ?";
    
    db.query(q, [req.query.postId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data.map((like: {userId: string}) => like.userId));
    })
}

export const getUsers = (req: Request, res: Response) => {
    const q = "SELECT id, name, profilePhoto FROM users WHERE name LIKE ?";
    
    db.query(q, [`${req.query.name}%`], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const findUser = (req: Request, res: Response) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id = (?)";

    db.query(q, [userId], (err, data) => {
        if(err) return res.status(500).json(err);
        const { password, ...info} = data[0];
        return res.json(info);
    })
}

export const updateUser = (req: Request, res: Response) => {
    const q = "UPDATE users SET `name`=?, `city`=?, `website`=?, `coverPhoto`=?, `profilePhoto`=? WHERE id = ?";
    const values = [ 
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.coverPhoto,
        req.body.profilePhoto,
        req.headers.decodedUserId
    ]

    db.query(q, values, (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.affectedRows > 0) return res.json("Updated");
        return res.status(403).json("You are not authorized to update this.")
    })
}

export default { getUsers, findUser, updateUser };