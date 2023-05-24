'use strict';

const { EarnedBadgeModelDefinition } = require('../../app/earned_badge/earned_badge.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('earned_badge', EarnedBadgeModelDefinition);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('earned_badge');
  }
};
