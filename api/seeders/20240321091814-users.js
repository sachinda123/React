"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataToInsert = [
      {
        firstName: "test_user_first_name",
        lastName: "test_user_last_name",
        email: "test@gmail.com",
        password: "123456",
      },
    ];

    for (const data of dataToInsert) {
      const existingRecord = await queryInterface.rawSelect(
        "Users",
        {
          where: {
            email: data.email,
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
