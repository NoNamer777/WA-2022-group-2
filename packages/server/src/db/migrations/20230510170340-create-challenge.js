'use strict';

const { badgeTableDefinition } = require('../table-definitions/badge');
const { challengeTableDefinition } = require('../table-definitions/challenge');
const { challengeDayTableDefinition } = require('../table-definitions/challenge-day');
const { earnedBadgeTableDefinition } = require('../table-definitions/earned-badge');
const { userChallengeTableDefinition } = require('../table-definitions/user-challenge');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('challenge', challengeTableDefinition);
    await queryInterface.createTable('badge', badgeTableDefinition);
    await queryInterface.createTable('user_challenge', userChallengeTableDefinition);
    await queryInterface.createTable('earned_badge', earnedBadgeTableDefinition);
    await queryInterface.createTable('challenge_day', challengeDayTableDefinition);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('challenge_day');
    await queryInterface.dropTable('earned_badge');
    await queryInterface.dropTable('user_challenge');
    await queryInterface.dropTable('badge');
    await queryInterface.dropTable('challenge');
  }
};
