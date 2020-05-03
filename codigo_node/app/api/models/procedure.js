'use strict';
module.exports = (sequelize, DataTypes) => {
  const Procedure = sequelize.define('Procedure', {
    cod: DataTypes.STRING
  }, {});
  Procedure.associate = function(models) {
    // associations can be defined here
  };
  return Procedure;
};