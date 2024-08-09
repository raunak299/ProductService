"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      totalAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNUll: false,
      },
      mobileNumber: {
        type: Sequelize.STRING,
        allowNUll: false,
      },
      alternateMobileNumber: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
        allowNUll: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNUll: false,
      },
      pinCode: {
        type: Sequelize.STRING,
        allowNUll: false,
      },
      addressDetail: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
