'use strict';

const { BadgeModelDefinition } = require('../../app/badge/badge.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('badge', BadgeModelDefinition);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('badge');
  }
};
