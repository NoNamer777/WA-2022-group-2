'use strict'

const { AnswerModelDefinition } = require('../../app/models/answer/answer.entity')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('answer', AnswerModelDefinition)
  },
  async down(queryInterface) {
    await queryInterface.dropTable('answer')
  }
}
