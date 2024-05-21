"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Op } = require("sequelize");
module.exports = {
    create: async (data, model) => {
        try {
            const created = await model.create(data);
            return created;
        }
        catch (error) {
            throw error;
        }
    },
    getAll: async (model) => {
        try {
            const allRecords = await model.findAll();
            return allRecords;
        }
        catch (error) {
            throw error;
        }
    },
    deletebyIds: async (ids, model) => {
        try {
            const record = await model.destroy({
                where: {
                    movieId: {
                        [Op.in]: ids,
                    },
                },
            });
            return;
        }
        catch (error) {
            throw error;
        }
    },
    checkExist: async (condition, model) => {
        const record = await model.findOne(condition);
        return record;
    },
    countExist: async (condition, model) => {
        const record = await model.findAll(condition);
        return record;
    },
};
