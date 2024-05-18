import { Sequelize } from "sequelize";
import User from "./User";
import List from "./List";

const sequelize = new Sequelize("wire", "root", "root", {
  username: "root",
  password: "root",
  database: "wire",
  host: "api-mysql",
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
