'use strict'

const { QuestionModelDefinition } = require('../../app/models/question/question.entity')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('question', QuestionModelDefinition)
  },
  async down(queryInterface) {
    await queryInterface.dropTable('question')
  }
}
