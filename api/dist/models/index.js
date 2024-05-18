"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("./User"));
const Customer_1 = __importDefault(require("./Customer"));
const Role_1 = __importDefault(require("./Role"));
const Medication_1 = __importDefault(require("./Medication"));
const sequelize = new sequelize_1.Sequelize("wire", "root", "root", {
    username: "root",
    password: "root",
    database: "wire",
    host: "api-mysql",
    dialect: "mysql",
    logging: false,
});
const models = {
    User: (0, User_1.default)(sequelize),
    Role: (0, Role_1.default)(sequelize),
    Customer: (0, Customer_1.default)(sequelize),
    Medication: (0, Medication_1.default)(sequelize),
};
exports.models = models;
Object.values(models)
    .filter((model) => typeof model.associate === "function")
    .forEach((model) => model.associate(models));
