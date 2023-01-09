'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Benefit extends Model {
    static associate(models) {
      Benefit.belongsToMany(models.Garage, {
        through: 'GarageBenefits',
        foreignKey: 'benefitId',
      });
    }
  }
  Benefit.init(
    {
      imgUrl: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Benefit',
    }
  );
  return Benefit;
};
