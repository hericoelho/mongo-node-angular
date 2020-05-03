'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    name: DataTypes.STRING,
    sex: DataTypes.INTEGER,
    age: DataTypes.INTEGER
  }, {});
  Patient.associate = function(models) {
    // associations can be defined here
  };
  return Patient;
};