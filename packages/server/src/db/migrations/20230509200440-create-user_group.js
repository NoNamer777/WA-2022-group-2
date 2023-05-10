'use strict'

const { UserGroupModelDefinition } = require('../../app/models/user_group/user_group.entity')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('user_group', UserGroupModelDefinition)
  },
  async down(queryInterface) {
    await queryInterface.dropTable('user_group')
  }
}
