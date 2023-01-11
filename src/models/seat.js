'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    static associate(models) {
      Seat.belongsTo(models.Coach, {
        foreignKey: 'coachId',
      });
      Seat.belongsToMany(models.Order, {
        through: 'OrderSeats',
        foreignKey: 'seatId',
      });
    }
  }
  Seat.init(
    {
      status: DataTypes.ENUM('disable', 'booked', 'enable', 'driver'),
      floor: DataTypes.STRING,
      extraPercent: DataTypes.INTEGER,
      column: DataTypes.INTEGER,
      row: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Seat',
      paranoid: true,
    }
  );
  return Seat;
};
