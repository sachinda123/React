"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static associate(models) { }
}
exports.default = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "User",
        tableName: "Users",
        timestamps: false,
    });
    return User;
};
