'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Procedures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cod: {
        allowNull: false,
        type: Sequelize.STRING,
      },   
    });
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.dropTable('Procedures');
    
  }
};
