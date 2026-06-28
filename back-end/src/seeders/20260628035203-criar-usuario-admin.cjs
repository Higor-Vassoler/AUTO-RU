'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [{
      nome: 'admin',
      email: 'admin@admin.com',
      senha: 'Admin!234',
      ra: 999999,
      is_admin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', { email: 'admin@admin.com' }, {});
  }
};
