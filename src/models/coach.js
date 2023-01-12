'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coach extends Model {
    static associate(models) {
      Coach.belongsTo(models.Garage, {
        foreignKey: 'garageId',
      });
      Coach.hasMany(models.Seat, {
        foreignKey: 'coachId',
      });
      Coach.hasMany(models.Route, {
        foreignKey: 'coachId',
      });
    }
  }
  Coach.init(
    {
      name: DataTypes.STRING,
      imgUrls: DataTypes.ARRAY(DataTypes.STRING),
      seatAmount: DataTypes.INTEGER,
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Coach',
      paranoid: true,
    }
  );
  return Coach;
};
