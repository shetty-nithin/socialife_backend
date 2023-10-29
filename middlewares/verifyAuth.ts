import { db } from "../connect";
import {Request, Response, NextFunction} from "express";

const validateRegisterBody = (req: Request, res: Response, next: NextFunction) => {
    try{
        if(!req.body.username || !req.body.email || !req.body.password || !req.body.name){
            return res.status(400).send("All the fields are neccessary.");
        }
    
        const q = "SELECT * FROM users WHERE username=?";
        db.query(q, [req.body.username], (err, data) => {
            if(err) return res.status(500).send(err);
            if(data.length){
                return res.status(409).send("Username is already exists. Try other username");
            }
            next();
        });
    }
    catch(err){
        return res.status(500).send(`Internal error : ${err}`)
    }
}

const validateLoginBody = (req: Request, res: Response, next: NextFunction) => {
    try{
        if(!req.body.username || !req.body.password){
            return res.status(400).send("Both username and password fields are required.");
        }
        next();
    }
    catch(err){
        return res.status(500).send(`Internal error : ${err}`)
    }
}

export default { validateRegisterBody, validateLoginBody};