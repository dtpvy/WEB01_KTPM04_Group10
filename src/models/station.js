'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    static associate(models) {
      Station.hasMany(models.Route, {
        foreignKey: 'startStationId',
      });
      Station.hasMany(models.Route, {
        foreignKey: 'endStationId',
      });
      Station.belongsTo(models.Garage, {
        foreignKey: 'garageId',
      });
    }
  }
  Station.init(
    {
      city: DataTypes.STRING,
      street: DataTypes.STRING,
      district: DataTypes.STRING,
      ward: DataTypes.STRING,
      phone: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Station',
    }
  );
  return Station;
};
