"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const tableInfo = await queryInterface.describeTable("CartProducts");
    if (!tableInfo.quantity) {
      await queryInterface.addColumn("CartProducts", "quantity", {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
