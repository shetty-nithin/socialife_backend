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
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Method", true);
    res.setHeader("Access-Control-Allow-Origin", indexConfig.CLIENT_URL)
    next();
});
app.use(express.json());
app.use(cors({
    origin: indexConfig.CLIENT_URL,
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

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationships);
app.use("/api/upload", upload.single("file"), uploads);

app.listen(indexConfig.PORT, () => {  
    console.log(`server is listening at the port ${indexConfig.PORT}`);
});