'use strict';
const { groupTableDefinition } = require('../table-definitions/group');
const { userGroupTableDefinition } = require('../table-definitions/user-group');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('group', groupTableDefinition);
    await queryInterface.createTable('user_group', userGroupTableDefinition);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('user_group');
    await queryInterface.dropTable('group');
  }
};
