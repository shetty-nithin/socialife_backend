import { db } from "../connect.js";

export const getUsers = (req, res) => {
    const q = "SELECT id, name, profilePhoto FROM users WHERE name LIKE ?";
    
    db.query(q, [`${req.query.name}%`], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

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
    const q = "UPDATE users SET `name`=?, `city`=?, `website`=?, `coverPhoto`=?, `profilePhoto`=? WHERE id = ?";
    const values = [ 
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.coverPhoto,
        req.body.profilePhoto,
        req.decodedUserId
    ]

    db.query(q, values, (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.affectedRows > 0) return res.json("Updated");
        return res.status(403).json("You are not authorized to update this.")
    })
}

export default { getUsers, findUser, updateUser };