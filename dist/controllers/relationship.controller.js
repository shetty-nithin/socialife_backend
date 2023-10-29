"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRelationship = exports.addRelationship = exports.getSuggestedUsers = exports.getAllFollowedUsers = exports.getAllFollowers = exports.getRelationships = void 0;
const connect_1 = require("../connect");
const getRelationships = (req, res) => {
    const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";
    connect_1.db.query(q, [req.query.followedUserId], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json(data.map((relationship) => relationship.followerUserId));
    });
};
exports.getRelationships = getRelationships;
const getAllFollowers = (req, res) => {
    const q = "SELECT DISTINCT r.followerUserid, u.id AS userId, u.name, u.profilePhoto FROM relationships AS r JOIN users AS u ON (r.followerUserId = u.id) WHERE followedUserId = (?)";
    connect_1.db.query(q, [req.query.userId], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json(data);
    });
};
exports.getAllFollowers = getAllFollowers;
const getAllFollowedUsers = (req, res) => {
    const q = "SELECT r.followedUserId, u.name, u.profilePhoto FROM relationships AS r JOIN users AS u ON (r.followedUserId = u.id) WHERE followerUserId = (?)";
    connect_1.db.query(q, [req.query.userId], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json(data);
    });
};
exports.getAllFollowedUsers = getAllFollowedUsers;
const getSuggestedUsers = (req, res) => {
    const q = "SELECT DISTINCT finalTable.finalFollowedUserId, u.name, u.profilePhoto FROM (SELECT r2.followedUserId AS finalFollowedUserId FROM relationships AS r1 JOIN relationships AS r2 ON (r1.followedUserId = r2.followerUserId) WHERE r1.followerUserId=(?)) AS finalTable JOIN users AS u ON (finalTable.finalFollowedUserId = u.id) WHERE finalTable.finalFollowedUserId NOT IN (SELECT followedUserId FROM relationships WHERE followerUserId=(?) OR followedUserId=(?))";
    connect_1.db.query(q, [req.query.userId, req.query.userId, req.query.userId, req.query.userId], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json(data);
    });
};
exports.getSuggestedUsers = getSuggestedUsers;
const addRelationship = (req, res) => {
    const q = "INSERT INTO relationships(`followerUserId`, `followedUserId`) VALUES (?)";
    const values = [
        req.headers.decodedUserId,
        req.body.userId
    ];
    connect_1.db.query(q, [values], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json("You started following.");
    });
};
exports.addRelationship = addRelationship;
const deleteRelationship = (req, res) => {
    const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";
    connect_1.db.query(q, [req.headers.decodedUserId, req.query.userId], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json("Unfollowed successfully.");
    });
};
exports.deleteRelationship = deleteRelationship;
exports.default = { getRelationships: exports.getRelationships, getAllFollowers: exports.getAllFollowers, getAllFollowedUsers: exports.getAllFollowedUsers, getSuggestedUsers: exports.getSuggestedUsers, addRelationship: exports.addRelationship, deleteRelationship: exports.deleteRelationship };
//# sourceMappingURL=relationship.controller.js.map