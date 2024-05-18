import { Json } from "sequelize/types/utils";
module.exports = {
  create: async (data: Json, model: any) => {
    try {
      const created = await model.create(data);
      return created;
    } catch (error) {
      throw error;
    }
  },
  getAll: async (model: any, offset: number, limit: number) => {
    try {
      const allRecords = await model.findAll({
        limit: limit, // Limit to 10 records
        offset: offset,
      });
      return allRecords;
    } catch (error) {
      throw error;
    }
  },
  update: async (id: number, newData: Json, model: any) => {
    try {
      const record = await model.findByPk(id);
      if (record) {
        await record.update(newData);
        return record;
      } else {
        throw new Error("Record not found");
      }
    } catch (error) {
      throw error;
    }
  },
  deletebyId: async (id: number, model: any) => {
    try {
      const record = await model.findByPk(id);
      if (record) {
        await record.destroy();
        return true;
      } else {
        throw new Error("Record not found");
      }
    } catch (error) {
      throw error;
    }
  },
  checkExist: async (condition: Json, model: any) => {
    const record = await model.findOne(condition);
    return record;
  },
};
