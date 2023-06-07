'use strict';

const animals = [
  'aap',
  'beer',
  'buffel',
  'eend',
  'eland',
  'geit',
  'giraf',
  'gorilla',
  'hond',
  'kikker',
  'kip',
  'koe',
  'konijn',
  'krokodil',
  'kuiken',
  'luiaard',
  'narwal',
  'neushoorn',
  'nijlpaard',
  'olifant',
  'paard',
  'panda',
  'papegaai',
  'pinguïn',
  'slang',
  'uil',
  'varken',
  'walrus',
  'walvis',
  'zebra'
];
let badges = [];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    for (const animal of animals) {
      badges.push({
        name: animal,
        image_path: `/assets/images/badges/${animal}.png`
      });
    }
    return queryInterface.bulkInsert('badge', badges);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('badge', null, {});
  }
};
