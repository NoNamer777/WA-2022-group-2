'use strict';
const { userTableDefinition } = require('../table-definitions/user');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('user', userTableDefinition);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('user');
  }
};
