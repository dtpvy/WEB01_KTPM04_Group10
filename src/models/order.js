'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      Order.belongsTo(models.Route, {
        foreignKey: 'routeId',
      });
      Order.belongsToMany(models.Seat, {
        through: 'OrderSeats',
        foreignKey: 'orderId',
      });
    }
  }
  Order.init(
    {
      message: DataTypes.STRING,
      method: DataTypes.STRING,
      total: DataTypes.INTEGER,
      status: DataTypes.ENUM('SUCCESS', 'FAIL'),
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
