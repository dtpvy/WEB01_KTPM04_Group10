'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Policy extends Model {
    static associate(models) {
      Policy.belongsToMany(models.Garage, {
        through: 'GaragePolicies',
        foreignKey: 'policyId',
      });
    }
  }
  Policy.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Policy',
    }
  );
  return Policy;
};
