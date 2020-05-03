'use strict';
module.exports = (sequelize, DataTypes) => {
  const Solicitation = sequelize.define('Solicitation', {
    result: DataTypes.BOOLEAN,
    patientId: DataTypes.INTEGER,
    procedureId: DataTypes.INTEGER,
  }, {});
  Solicitation.associate = function (models) {
    Solicitation.belongsTo(models.Patient, {foreignKey: 'patientId', as: 'patient'})
    Solicitation.belongsTo(models.Procedure, {foreignKey: 'procedureId', as: 'procedure'})
    Solicitation.hasMany(models.Technical_advice, {as: 'technical_advices'})
  };
  return Solicitation;
};