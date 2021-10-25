'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ItemPedidos', {
      PedidoId: { // alterado o nome para ser identificado
        allowNull: false, // nao pode ser nulo, aqui está certo
        // autoIncrement: true, // não é autoincremento, ou seja, não é altomatico pq depende de um pedido
        primaryKey: true, // vai ser chave primaria
        type: Sequelize.INTEGER, // será numero inteiro
        references: {
          model: 'pedidos', // vem de pedidos
          key: 'id'
        },
        onUptade: 'CASCADE', // ATUALIZAR TODOS OS ITENS
        onDelete: 'CASCADE' // EXCLUIR TUDO
      },
      ServicoId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: 'servicos',
          key: 'id'
        },
        onUptade: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quantidade: {
        type: Sequelize.INTEGER
      },
      valor: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('ItemPedidos');
  }
};