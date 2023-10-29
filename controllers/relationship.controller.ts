import { db } from "../connect";
import { Request, Response } from "express";

export const getRelationships = (req: Request, res: Response) => {
    const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";
    
    db.query(q, [req.query.followedUserId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data.map((relationship: {followerUserId: string}) => relationship.followerUserId));
    })
}

export const getAllFollowers = (req: Request, res: Response) => {
    const q = "SELECT DISTINCT r.followerUserid, u.id AS userId, u.name, u.profilePhoto FROM relationships AS r JOIN users AS u ON (r.followerUserId = u.id) WHERE followedUserId = (?)";

    db.query(q, [req.query.userId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const getAllFollowedUsers = (req: Request, res: Response) => {
    const q = "SELECT r.followedUserId, u.name, u.profilePhoto FROM relationships AS r JOIN users AS u ON (r.followedUserId = u.id) WHERE followerUserId = (?)";

    db.query(q, [req.query.userId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const getSuggestedUsers = (req: Request, res: Response) => {
    const q = "SELECT DISTINCT finalTable.finalFollowedUserId, u.name, u.profilePhoto FROM (SELECT r2.followedUserId AS finalFollowedUserId FROM relationships AS r1 JOIN relationships AS r2 ON (r1.followedUserId = r2.followerUserId) WHERE r1.followerUserId=(?)) AS finalTable JOIN users AS u ON (finalTable.finalFollowedUserId = u.id) WHERE finalTable.finalFollowedUserId NOT IN (SELECT followedUserId FROM relationships WHERE followerUserId=(?) OR followedUserId=(?))";

    db.query(q, [req.query.userId, req.query.userId, req.query.userId, req.query.userId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const addRelationship = (req: Request, res: Response) => {
    const q = "INSERT INTO relationships(`followerUserId`, `followedUserId`) VALUES (?)";
    const values = [
        req.headers.decodedUserId,
        req.body.userId
    ]
    
    db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("You started following.");
    })
}

export const deleteRelationship = (req: Request, res: Response) => {
    const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";
    
    db.query(q, [req.headers.decodedUserId, req.query.userId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("Unfollowed successfully.");
    })
}

export default { getRelationships, getAllFollowers, getAllFollowedUsers, getSuggestedUsers, addRelationship, deleteRelationship };