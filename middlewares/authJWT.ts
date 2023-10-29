import jwt, { JwtPayload } from "jsonwebtoken";
import authConfig from "../configs/auth.config";
import { Request, Response, NextFunction } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.cookie;
    if(token !== undefined){
        token = token.replace("accessToken=", "");
    }
    
    if(!token || token == undefined){
        return res.status(403).send("You don't have a token. Please login first.");
    }

    jwt.verify(token, (authConfig.secretKey || "someSecretKey"), async (err, decoded) => {
        if(err){
            return res.status(403).send("Your are not authorized!")
        }

        const jwtPayload = decoded as JwtPayload;
        if( !jwtPayload?.exp || (jwtPayload?.exp || 0) < Date.now()/1000){
            return res.status(403).send("Your are not authorized!")
        }
        req.headers["decodedUserId"] = jwtPayload.id;
        // res.locals.decodedUserId = jwtPayload?.id;
        next();
    })
}

export default { verifyToken };