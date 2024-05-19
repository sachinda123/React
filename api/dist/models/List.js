"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class List extends sequelize_1.Model {
    static associate(models) { }
}
exports.default = (sequelize) => {
    List.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        movieId: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: false,
        },
        userId: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: false,
        },
        movieData: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "List",
        tableName: "Lists",
        timestamps: false,
    });
    return List;
};
