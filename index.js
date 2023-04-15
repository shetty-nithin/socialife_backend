import express from "express";
const app = express();

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js"
import likeRoutes from "./routes/like.routes.js"
import relationships from "./routes/relationship.routes.js";
import uploads from "./routes/upload.routes.js";
import indexConfig from "./configs/index.config.js";

import multer from "multer";
import cors from "cors";
import cookieParser from "cookie-parser";

// middlewares
app.use((req, res, next) => {
    // res.setHeader("Access-Control-Allow-Origin", indexConfig.CLIENT_URL)
    res.setHeader("Access-Control-Allow-Origin", "https://socialife.netlify.app")
    res.setHeader("Access-Control-Allow-Method", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true")
    next();
});
app.use(express.json());
app.use(cors({
    origin: "https://socialife.netlify.app",
    // origin: indexConfig.CLIENT_URL,
    credentials: true  
}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/upload")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); 
    }
})
const upload = multer({ storage: storage });

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
app.use("/relationships", relationships);
app.use("/upload", upload.single("file"), uploads);

app.listen(indexConfig.PORT, () => {  
    console.log(`server is listening at the port ${indexConfig.PORT}`);
});