'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      {
        id: 1,
        floor: 'M',
        column: 9,
        row: 7,
        coachId: 10,
      },
      {
        id: 2,
        floor: 'M',
        column: 5,
        row: 10,
        coachId: 4,
      },
      {
        id: 3,
        floor: 'M',
        column: 10,
        row: 10,
        coachId: 1,
      },
      {
        id: 4,
        floor: 'M',
        column: 7,
        row: 4,
        coachId: 4,
      },
      {
        id: 5,
        floor: 'M',
        column: 6,
        row: 10,
        coachId: 1,
      },
      {
        id: 6,
        floor: 'M',
        column: 4,
        row: 3,
        coachId: 10,
      },
      {
        id: 7,
        floor: 'M',
        column: 2,
        row: 3,
        coachId: 5,
      },
      {
        id: 8,
        floor: 'F',
        column: 9,
        row: 4,
        coachId: 6,
      },
      {
        id: 9,
        floor: 'M',
        column: 10,
        row: 2,
        coachId: 8,
      },
      {
        id: 10,
        floor: 'F',
        column: 2,
        row: 10,
        coachId: 5,
      },
      {
        id: 11,
        floor: 'M',
        column: 10,
        row: 6,
        coachId: 5,
      },
      {
        id: 12,
        floor: 'M',
        column: 6,
        row: 8,
        coachId: 4,
      },
      {
        id: 13,
        floor: 'M',
        column: 5,
        row: 1,
        coachId: 6,
      },
      {
        id: 14,
        floor: 'F',
        column: 1,
        row: 3,
        coachId: 3,
      },
      {
        id: 15,
        floor: 'M',
        column: 5,
        row: 3,
        coachId: 2,
      },
    ];
    items.forEach((item) => {
      item.createdAt = sequelize.literal('NOW()');
      item.createdAt = sequelize.literal('NOW()');
      item.status = 'enable';
    });
    await queryInterface.bulkInsert('Seats', items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Seats', null, {});
  },
};
