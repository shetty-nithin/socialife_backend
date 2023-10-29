"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const comment_routes_1 = __importDefault(require("./routes/comment.routes"));
const like_routes_1 = __importDefault(require("./routes/like.routes"));
const relationship_routes_1 = __importDefault(require("./routes/relationship.routes"));
const index_config_1 = __importDefault(require("./configs/index.config"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: index_config_1.default.CLIENT_URL,
    credentials: true,
    preflightContinue: true
}));
app.use("/auth", auth_routes_1.default);
app.use("/users", user_routes_1.default);
app.use("/posts", post_routes_1.default);
app.use("/comments", comment_routes_1.default);
app.use("/likes", like_routes_1.default);
app.use("/relationships", relationship_routes_1.default);
app.listen(index_config_1.default.PORT, () => {
    console.log(`server is listening at the port ${index_config_1.default.PORT}`);
});
//# sourceMappingURL=app.js.map