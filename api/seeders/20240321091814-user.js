"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataToInsert = [
      {
        email: "owner@gmail.com",
        userName: "owner",
        password: "123",
        RoleId: 1,
      },
      {
        email: "managers@gmail.com",
        userName: "managers",
        password: "123",
        RoleId: 2,
      },
      {
        email: "cashiers@gmail.com",
        userName: "cashiers",
        password: "123",
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
