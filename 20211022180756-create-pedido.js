'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ClienteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'clientes',
          key: 'id'
        },
        onUpdate: 'CASCADE', //para alteração de todos os pedidos
        onDelete: 'CASCADE' // para exclusão de todos os pedidos
      },
      data: {
        type: Sequelize.DATEONLY
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pedidos');
  }
};