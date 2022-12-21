'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    static associate(models) {
      Route.belongsTo(models.Coach, {
        foreignKey: 'coachId',
      });
      Route.belongsTo(models.Station, {
        foreignKey: 'startStationId',
      });
      Route.belongsTo(models.Station, {
        foreignKey: 'endStationId',
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
    }
  );
  return Route;
};
