import dotenv from "dotenv";

if(process.env.NODE_ENV !== "productio"){
    dotenv.config();
}

export default {
    // DB_URI: process.env.DB_URI,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
}