"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      RoleId: DataTypes.INTEGER,
    },
    { timestamps: false, charset: "utf8", collate: "utf8_general_ci" }
  );
  User.associate = function (models) {
    User.belongsTo(models.Role);
  };
  return User;
};
