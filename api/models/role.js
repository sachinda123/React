"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      role: DataTypes.STRING,
    },
    { timestamps: false, charset: "utf8", collate: "utf8_general_ci" }
  );
  return Role;
};
