'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      {
        id: 1,
        name: '9/2/2022',
        seatAmount: '7/12/2022',
        code: 28,
        garageId: 9,
      },
      {
        id: 2,
        name: '5/22/2022',
        seatAmount: '1/21/2022',
        code: 15,
        garageId: 9,
      },
      {
        id: 3,
        name: '8/11/2022',
        seatAmount: '6/8/2022',
        code: 74,
        garageId: 1,
      },
      {
        id: 4,
        name: '7/2/2022',
        seatAmount: '6/2/2022',
        code: 44,
        garageId: 3,
      },
      {
        id: 5,
        name: '11/5/2022',
        seatAmount: '9/2/2022',
        code: 45,
        garageId: 4,
      },
      {
        id: 6,
        name: '10/7/2022',
        seatAmount: '3/11/2022',
        code: 96,
        garageId: 2,
      },
      {
        id: 7,
        name: '7/21/2022',
        seatAmount: '5/13/2022',
        code: 22,
        garageId: 6,
      },
      {
        id: 8,
        name: '2/19/2022',
        seatAmount: '5/7/2022',
        code: 79,
        garageId: 5,
      },
      {
        id: 9,
        name: '5/4/2022',
        seatAmount: '6/7/2022',
        code: 47,
        garageId: 6,
      },
      {
        id: 10,
        name: '10/21/2022',
        seatAmount: '5/3/2022',
        code: 84,
        garageId: 1,
      },
      {
        id: 11,
        name: '5/13/2022',
        seatAmount: '11/11/2022',
        code: 93,
        garageId: 10,
      },
    ];
    items.forEach((item) => {
      item.createdAt = sequelize.literal('NOW()');
      item.createdAt = sequelize.literal('NOW()');
    });
    await queryInterface.bulkInsert('Coaches', items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Coaches', null, {});
  },
};
