import dotenv from "dotenv";

if(process.env.NODE_ENV !== "production"){
    dotenv.config();
}

export default {
    PORT: process.env.PORT,
    CLIENT_URL: process.env.CLIENT_URL
}