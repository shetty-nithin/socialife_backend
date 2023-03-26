import jwt from "jsonwebtoken";
import authConfig from "../configs/auth.config.js";

const verifyToken = (req, res, next) => {
    let token = req.headers.cookie;
    token = token.replace("accessToken=", "");

    if(!token){
        return res.status(403).send("You don't have a token. Please login first.")
    }
    jwt.verify(token, authConfig.secretKey, async (err, decoded) => {
        if(err){
            return res.status(403).send("Your are not authorized!")
        }
        req.decodedUserId = decoded.id
        next();
    })
}

export default { verifyToken };