"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataToInsert = [
      {
        firstName: "owner",
        lastName: "owner",
        userName: "owner",
        password: "123456",
        RoleId: 1,
      },
      {
        firstName: "managers",
        lastName: "managers",
        userName: "managers",
        password: "123456",
        RoleId: 2,
      },
      {
        firstName: "cashiers",
        lastName: "cashiers",
        userName: "cashiers",
        password: "123456",
        RoleId: 3,
      },
    ];

    for (const data of dataToInsert) {
      const existingRecord = await queryInterface.rawSelect(
        "Users",
        {
          where: {
            userName: data.userName,
          },
        },
        ["id"]
      );

      if (!existingRecord) {
        await queryInterface.bulkInsert("Users", [data]);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
