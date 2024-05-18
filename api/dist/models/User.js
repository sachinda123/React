"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    // If you have associations defined, you can define them here
    // public readonly role?: Role;
    // Here you can define class level methods
    // Here you can define associations
    static associate(models) {
        // User.belongsTo(models.Role, { foreignKey: "RoleId" });
    }
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
        userName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        RoleId: {
            type: sequelize_1.DataTypes.INTEGER,
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
