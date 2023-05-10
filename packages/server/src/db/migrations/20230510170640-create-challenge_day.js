'use strict'

const {
  ChallengeDayModelDefinition
} = require('../../app/models/challenge_day/challenge_day.entity')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('challenge_day', ChallengeDayModelDefinition)
  },
  async down(queryInterface) {
    await queryInterface.dropTable('challenge_day')
  }
}
