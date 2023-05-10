'use strict'

const { UserQuizModelDefinition } = require('../../app/models/user_quiz/user_quiz.entity')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('user_quiz', UserQuizModelDefinition)
  },
  async down(queryInterface) {
    await queryInterface.dropTable('user_quiz')
  }
}
