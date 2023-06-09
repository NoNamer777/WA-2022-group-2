'use strict';

const { challengeSuggestionTableDefinition } = require('../table-definitions/challenge-suggestion');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('challenge_suggestion', challengeSuggestionTableDefinition);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('challenge_suggestion');
  }
};
