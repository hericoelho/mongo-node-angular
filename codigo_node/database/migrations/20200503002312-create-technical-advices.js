'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Technical_advices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      agent: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      allowed: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },      
      solicitaionId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Solicitations',
          },
          key: 'id'
        },
        allowNull: false
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },     
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Technical_advices');
  }
};
