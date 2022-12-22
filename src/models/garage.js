'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Garage extends Model {
    static associate(models) {
      Garage.hasMany(models.Comment, {
        foreignKey: 'garageId',
      });
      Garage.hasMany(models.Station, {
        foreignKey: 'garageId',
      });
      Garage.belongsToMany(models.Benefit, {
        through: 'GarageBenefits',
        foreignKey: 'garageId',
      });
      Garage.belongsToMany(models.Policy, {
        through: 'GaragePolicies',
        foreignKey: 'garageId',
      });
      Garage.hasMany(models.Coach, {
        foreignKey: 'garageId',
      });
      const AccountGarages = sequelize.define(
        'AccountGarages',
        {
          password: DataTypes.STRING,
          role: DataTypes.ENUM('owner', 'admin', 'employee'),
        },
        { timestamps: false }
      );
      Garage.belongsToMany(models.User, {
        through: AccountGarages,
        foreignKey: 'garageId',
      });
    }
  }
  Garage.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      imgUrls: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: 'Garage',
    }
  );
  return Garage;
};
