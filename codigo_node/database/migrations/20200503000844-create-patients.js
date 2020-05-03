'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      sex: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },               
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Patients');
  }
};
