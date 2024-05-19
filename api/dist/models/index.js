"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("./User"));
const List_1 = __importDefault(require("./List"));
const sequelize = new sequelize_1.Sequelize(process.env.MYSQL_DB || "movie", process.env.MYSQL_USER || "root", process.env.MYSQL_USER_PASSWORD || "root", {
    username: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_USER_PASSWORD || "root",
    database: process.env.MYSQL_DB || "movie",
    host: process.env.MYSQL_DB_HOST || "mysql",
    dialect: "mysql",
    logging: false,
});
const models = {
    User: (0, User_1.default)(sequelize),
    List: (0, List_1.default)(sequelize),
};
exports.models = models;
Object.values(models)
    .filter((model) => typeof model.associate === "function")
    .forEach((model) => model.associate(models));
