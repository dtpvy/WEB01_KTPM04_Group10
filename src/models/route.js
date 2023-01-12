'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    static associate(models) {
      Route.belongsTo(models.Coach, {
        foreignKey: 'coachId',
      });
      Route.belongsTo(models.Station, {
        as: 'startStation',
        foreignKey: 'startStationId',
      });
      Route.belongsTo(models.Station, {
        as: 'endStation',
        foreignKey: 'endStationId',
      });
      Route.hasMany(models.Order, {
        foreignKey: 'routeId',
      });
    }
  }
  Route.init(
    {
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
      fare: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Route',
      paranoid: true,
    }
  );
  return Route;
};
