"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Medication extends sequelize_1.Model {
    static associate(models) { }
}
exports.default = (sequelize) => {
    Medication.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: sequelize_1.DataTypes.STRING,
        description: sequelize_1.DataTypes.STRING,
        quantity: sequelize_1.DataTypes.INTEGER,
        active: sequelize_1.DataTypes.BOOLEAN,
        addedBy: sequelize_1.DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: "Medication",
        tableName: "Medications",
        timestamps: false,
    });
    return Medication;
};
