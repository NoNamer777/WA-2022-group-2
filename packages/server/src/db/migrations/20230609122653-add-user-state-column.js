'use strict';

const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn('user', 'state', {
      type: DataTypes.ENUM('pending', 'active'),
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        notNull: true,
        notEmpty: true,
        isIn: ['pending', 'active']
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('user', 'state');
  }
};
