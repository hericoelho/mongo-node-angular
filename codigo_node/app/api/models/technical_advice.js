'use strict';
module.exports = (sequelize, DataTypes) => {
  const Technical_advice = sequelize.define('Technical_advice', {
    agent: DataTypes.STRING,
    allowed: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    date: DataTypes.DATE,
  }, {});
  Technical_advice.associate = function (models) {
    // associations can be defined here
  };
  return Technical_advice;
};