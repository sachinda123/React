import { Json } from "sequelize/types/utils";
const { Op } = require("sequelize");

module.exports = {
  create: async (data: Json, model: any) => {
    try {
      const created = await model.create(data);
      return created;
    } catch (error) {
      throw error;
    }
  },
  getAll: async (model: any) => {
    try {
      const allRecords = await model.findAll();
      return allRecords;
    } catch (error) {
      throw error;
    }
  },
  deletebyIds: async (ids: number[], model: any) => {
    try {
      const record = await model.destroy({
        where: {
          movieId: {
            [Op.in]: ids,
          },
        },
      });
      return;
    } catch (error) {
      throw error;
    }
  },
  checkExist: async (condition: Json, model: any) => {
    const record = await model.findOne(condition);
    return record;
  },
  countExist: async (condition: Json, model: any) => {
    const record = await model.findAll(condition);
    return record;
  },
};
