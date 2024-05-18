"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Medications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
      addedBy: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Medications");
  },
};
