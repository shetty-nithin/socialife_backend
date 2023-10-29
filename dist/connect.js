"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql_1 = __importDefault(require("mysql"));
const db_config_1 = __importDefault(require("./configs/db.config"));
exports.db = mysql_1.default.createConnection({
    host: db_config_1.default.DB_HOST,
    user: db_config_1.default.DB_USER,
    password: db_config_1.default.DB_PASSWORD,
    database: db_config_1.default.DB_NAME
});
exports.db.connect(function (err) {
    if (err)
        throw err;
    console.log("DB connected!");
});
//# sourceMappingURL=connect.js.map