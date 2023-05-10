'use strict'

const { GroupModelDefinition } = require('../../app/models/group/group.entity')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('group', GroupModelDefinition)
  },
  async down(queryInterface) {
    await queryInterface.dropTable('group')
  }
}
