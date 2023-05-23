import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js"
import likeRoutes from "./routes/like.routes.js"
import relationships from "./routes/relationship.routes.js";
import indexConfig from "./configs/index.config.js";
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
app.options('*', cors({
    origin: indexConfig.CLIENT_URL,
    credentials: true
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', indexConfig.CLIENT_URL);
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});


app.get('/test', (req, res) => {
    res.send('test test test');// this route is just for the testing purpose.
});
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
app.use("/relationships", relationships);

app.listen(indexConfig.PORT, () => {  
    console.log(`server is listening at the port ${indexConfig.PORT}`);
});