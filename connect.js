import mysql from "mysql";
import dbConfig from "./configs/db.config.js";

export const db = mysql.createConnection({
    host: dbConfig.DB_HOST,
    user: dbConfig.DB_USER,
    password: dbConfig.DB_PASSWORD,
    database: dbConfig.DB_NAME
});

db.connect(function(err){
    if(err) throw err;
    console.log("DB connected!");
})