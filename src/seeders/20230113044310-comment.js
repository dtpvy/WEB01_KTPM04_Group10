'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      {
        id: 1,
        rate: 1,
        content:
          'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
        userId: 3,
        garageId: 6,
      },
      {
        id: 2,
        rate: 5,
        content:
          'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
        userId: 2,
        garageId: 10,
      },
      {
        id: 3,
        rate: 5,
        content:
          'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
        userId: 9,
        garageId: 6,
      },
      {
        id: 4,
        rate: 2,
        content:
          'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
        userId: 9,
        garageId: 3,
      },
      {
        id: 5,
        rate: 4,
        content:
          'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
        userId: 8,
        garageId: 7,
      },
      {
        id: 6,
        rate: 1,
        content:
          'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
        userId: 8,
        garageId: 5,
      },
      {
        id: 7,
        rate: 2,
        content:
          'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
        userId: 9,
        garageId: 5,
      },
      {
        id: 8,
        rate: 2,
        content:
          'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
        userId: 6,
        garageId: 3,
      },
      {
        id: 9,
        rate: 4,
        content:
          'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
        userId: 9,
        garageId: 2,
      },
      {
        id: 10,
        rate: 5,
        content:
          'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
        userId: 6,
        garageId: 7,
      },
      {
        id: 11,
        rate: 1,
        content:
          'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
        userId: 1,
        garageId: 10,
      },
      {
        id: 12,
        rate: 5,
        content:
          'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
        userId: 1,
        garageId: 4,
      },
      {
        id: 13,
        rate: 4,
        content:
          'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
        userId: 9,
        garageId: 10,
      },
      {
        id: 14,
        rate: 1,
        content:
          'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
        userId: 3,
        garageId: 5,
      },
      {
        id: 15,
        rate: 4,
        content:
          'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
        userId: 5,
        garageId: 5,
      },
    ];
    items.forEach((item) => {
      item.createdAt = sequelize.literal('NOW()');
      item.createdAt = sequelize.literal('NOW()');
    });
    await queryInterface.bulkInsert('Comments', items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  },
};
