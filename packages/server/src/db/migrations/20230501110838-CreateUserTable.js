'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param queryInterface {import('sequelize').QueryInterface}
   * @return {Promise<void>}
   */
  up: async (queryInterface) => {
    await queryInterface.createTable('user', {
      id: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: 'unique_user_username_idx'
      },
      email: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(124),
        allowNull: false
      }
    });
  },

  /**
   * @param queryInterface {import('sequelize').QueryInterface}
   * @return {Promise<void>}
   */
  down: async (queryInterface) => {
    await queryInterface.dropTable('user');
  }
};
