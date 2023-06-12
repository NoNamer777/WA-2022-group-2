'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('challenge_suggestion', [
      {
        name: 'Herbruikbare zakjes en tassen meenemen naar de supermarkt'
      },
      {
        name: 'Eigen drinkfles meenemen'
      },
      {
        name: 'Fruit naar school in plaats van voorverpackte snacks'
      },
      {
        name: 'Plasticvrij snacken onderweg'
      },
      {
        name: 'Eigen mok gebruiken in plaats van wegwerpkoffiebekers'
      },
      {
        name: 'Eigen brooddoos mee naar werk'
      },
      {
        name: 'Fruit en groente zonder plastic kopen'
      },
      {
        name: 'Shampoo -of zeepblok gebruiken in de badkamer'
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('challenge_suggestion', null);
  }
};
