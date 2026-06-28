'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pedidos', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        id_usuario: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Usuarios',
            key: 'id'
          }
        },
        id_forma_pagamento: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Forma_de_Pagamentos',
            key: 'id_forma_de_pagamento'
          }
        },
        data: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        preco_total: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false
        },
         createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
        }
    }); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("pedidos");
  }
};
