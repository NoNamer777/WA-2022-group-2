'use strict'

const { ChallengeModelDefinition } = require('../../app/models/challenge/challenge.entity')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('challenge', ChallengeModelDefinition)
  },
  async down(queryInterface) {
    await queryInterface.dropTable('challenge')
  }
}
