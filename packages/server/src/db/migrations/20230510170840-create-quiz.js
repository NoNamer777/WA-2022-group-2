'use strict'

const { QuizModelDefinition } = require('../../app/models/quiz/quiz.entity')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('quiz', QuizModelDefinition)
  },
  async down(queryInterface) {
    await queryInterface.dropTable('quiz')
  }
}
