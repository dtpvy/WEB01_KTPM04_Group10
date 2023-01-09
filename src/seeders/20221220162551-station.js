'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      {
        city: 'Thành phố Hồ Chí Minh',
        street: '292 Đinh Bộ Lĩnh',
        district: 'Quận Bình Thạnh',
        ward: 'Phường 26',
        name: 'Bến xe Miền Đông',
      },
      {
        city: 'Thành phố Hồ Chí Minh',
        street: '395 Kinh Dương Vương',
        district: 'Quận Bình Tân',
        ward: 'Phường An Lạc',
        name: 'Bến xe Miền Tây',
      },
      {
        city: 'Thành phố Cần Thơ',
        street: 'Quốc lộ 1A',
        district: 'Quận Cái Răng',
        ward: 'Phường Hưng Thạnh',
        name: 'Bến xe Trung tâm Cần Thơ',
      },
    ];
    items.forEach((item) => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });
    await queryInterface.bulkInsert('Stations', items, {});
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
