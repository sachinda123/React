import { Sequelize } from "sequelize";
import User from "./User";
import List from "./List";

const sequelize = new Sequelize(process.env.MYSQL_DB || "movie", process.env.MYSQL_USER || "root", process.env.MYSQL_USER_PASSWORD || "root", {
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_USER_PASSWORD || "root",
  database: process.env.MYSQL_DB || "movie",
  host: process.env.MYSQL_DB_HOST || "mysql",
  dialect: "mysql",
  logging: false,
});

const models = {
  User: User(sequelize),
  List: List(sequelize),
};

Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

export { models };
