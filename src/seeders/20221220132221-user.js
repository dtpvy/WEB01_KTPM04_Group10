'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      {
        fullname: 'Nguyen Van A',
        phone: '0123456789',
        password: '123',
        imgUrl: '',
        email: 'testa@gmail.com',
      },
      {
        fullname: 'Nguyen Van B',
        phone: '0123456789',
        password: '123',
        imgUrl: '',
        email: 'testb@gmail.com',
      },
      {
        fullname: 'Nguyen Van C',
        phone: '0123456789',
        password: '123',
        imgUrl: '',
        email: 'testc@gmail.com',
      },
    ];
    items.forEach((item) => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });
    await queryInterface.bulkInsert('Users', items, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
