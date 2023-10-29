import { db } from "../connect";
import bcrypt from "bcryptjs";   
import jwt from "jsonwebtoken";
import authConfig from "../configs/auth.config"; 
import { Request, Response } from "express";

export const register = (req: Request, res: Response) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE (?)";
    const values = [req.body.username, req.body.email, hashedPassword, req.body.name];
    db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("User has been created!");
    });
}

export const login = (req: Request, res: Response) => {
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("User not found!");
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if(!checkPassword) return res.status(400).json("wrong password!");
        
        const token = jwt.sign({ id: data[0].id}, (authConfig.secretKey || "someSecretKey"), {expiresIn: `24h`});
        const {password, ...others} = data[0];
        res.cookie("accessToken", token, {
            expires: new Date(Date.now() + (3600*1000*24*180*1)),
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        }).status(200).json(others);
    })
}

export const logout = (req: Request, res: Response) => {
    res.clearCookie("accessToken", {
        secure : true,
        sameSite : "none"
    }).status(200).json("User has been logged out!");
}

export default {register, login, logout}