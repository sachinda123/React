module.exports = {
  create: async (data, model) => {
    try {
      const created = await model.create(data);
      return created;
    } catch (error) {
      throw error;
    }
  },
  getAll: async (model) => {
    try {
      const allRecords = await model.findAll();
      return allRecords;
    } catch (error) {
      throw error;
    }
  },
  update: async (id, newData, model) => {
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
  deletebyId: async (id, model) => {
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
  checkExist: async (condition, model) => {
    const record = await model.findOne(condition);
    return record;
  },
};
