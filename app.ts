import express from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import commentRoutes from "./routes/comment.routes"
import likeRoutes from "./routes/like.routes"
import relationships from "./routes/relationship.routes";
import indexConfig from "./configs/index.config";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: indexConfig.CLIENT_URL,
    credentials: true,
    preflightContinue: true 
}));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
app.use("/relationships", relationships);

app.listen(indexConfig.PORT, () => {  
    console.log(`server is listening at the port ${indexConfig.PORT}`);
});