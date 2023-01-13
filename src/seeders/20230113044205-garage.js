'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      {
        id: 6,
        code: 'Drake',
        name: 'Cawthorne',
      },
      {
        id: 7,
        code: 'Zeke',
        name: 'McCowan',
      },
      {
        id: 8,
        code: 'Maximilien',
        name: 'Featley',
      },
      {
        id: 9,
        code: 'Lyndsay',
        name: 'Buxcy',
      },
      {
        id: 10,
        code: 'Viviyan',
        name: 'Wheatman',
      },
    ];
    items.forEach((item) => {
      item.createdAt = sequelize.literal('NOW()');
      item.createdAt = sequelize.literal('NOW()');
    });
    await queryInterface.bulkInsert('Garages', items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Garages', null, {});
  },
};
