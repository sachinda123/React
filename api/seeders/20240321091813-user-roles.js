"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataToInsert = [
      {
        role: "owner",
      },
      {
        role: "managers",
      },
      {
        role: "cashiers",
      },
    ];

    for (const data of dataToInsert) {
      const existingRecord = await queryInterface.rawSelect(
        "Roles",
        {
          where: {
            role: data.role,
          },
        },
        ["id"]
      );

      if (!existingRecord) {
        await queryInterface.bulkInsert("Roles", [data]);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
