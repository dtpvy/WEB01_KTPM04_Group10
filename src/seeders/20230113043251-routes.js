'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      {
        id: 8,
        startTime: '6/10/2022',
        endTime: '12/2/2022',
        fare: 32,
        coachId: 6,
        startStationId: 2,
        endStationId: 1,
      },
      {
        id: 9,
        startTime: '8/3/2022',
        endTime: '10/29/2022',
        fare: 49,
        coachId: 9,
        startStationId: 3,
        endStationId: 9,
      },
      {
        id: 10,
        startTime: '9/5/2022',
        endTime: '1/25/2022',
        fare: 80,
        coachId: 6,
        startStationId: 5,
        endStationId: 4,
      },
      {
        id: 11,
        startTime: '12/28/2022',
        endTime: '3/27/2022',
        fare: 58,
        coachId: 10,
        startStationId: 2,
        endStationId: 7,
      },
      {
        id: 12,
        startTime: '2/7/2022',
        endTime: '7/2/2022',
        fare: 17,
        coachId: 5,
        startStationId: 2,
        endStationId: 7,
      },
      {
        id: 13,
        startTime: '10/4/2022',
        endTime: '7/14/2022',
        fare: 31,
        coachId: 9,
        startStationId: 7,
        endStationId: 2,
      },
      {
        id: 14,
        startTime: '12/17/2022',
        endTime: '1/18/2022',
        fare: 66,
        coachId: 10,
        startStationId: 2,
        endStationId: 8,
      },
      {
        id: 15,
        startTime: '4/19/2022',
        endTime: '12/22/2022',
        fare: 74,
        coachId: 3,
        startStationId: 1,
        endStationId: 1,
      },
    ];
    items.forEach((item) => {
      item.createdAt = sequelize.literal('NOW()');
      item.createdAt = sequelize.literal('NOW()');
    });
    await queryInterface.bulkInsert('Routes', items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Routes', null, {});
  },
};
