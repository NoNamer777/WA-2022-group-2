'use strict'

const { UserModelDefinition } = require('../../app/models/user/user.entity')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('user', UserModelDefinition)
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user')
  }
}
