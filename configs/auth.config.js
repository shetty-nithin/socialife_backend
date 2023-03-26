import dotenv from "dotenv";

if(process.env.NODE_ENV !== "production"){
    dotenv.config();
}

export default {
    secretKey: process.env.SECRET_KEY,
}