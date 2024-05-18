"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Role extends sequelize_1.Model {
    // If you have associations defined, you can define them here
    // public readonly role?: Role;
    // Here you can define class level methods
    // Here you can define associations
    static associate(models) {
        // Role.belongsTo(models.Role, { foreignKey: "RoleId" });
    }
}
exports.default = (sequelize) => {
    Role.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        role: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "Role",
        tableName: "Roles",
        timestamps: false,
    });
    return Role;
};
