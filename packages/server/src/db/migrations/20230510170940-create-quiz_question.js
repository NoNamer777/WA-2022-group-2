'use strict'

const {
  QuizQuestionModelDefinition
} = require('../../app/models/quiz_question/quiz_question.entity')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('quiz_question', QuizQuestionModelDefinition)
  },
  async down(queryInterface) {
    await queryInterface.dropTable('quiz_question')
  }
}
