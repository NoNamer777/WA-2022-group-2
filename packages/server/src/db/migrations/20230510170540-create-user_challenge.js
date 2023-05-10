'use strict'

const {
  UserChallengeModelDefinition
} = require('../../app/models/user_challenge/user_challenge.entity')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('user_challenge', UserChallengeModelDefinition)
  },
  async down(queryInterface) {
    await queryInterface.dropTable('user_challenge')
  }
}
