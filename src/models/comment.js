'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Garage, {
        foreignKey: 'garageId',
      });
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Comment.init(
    {
      rate: DataTypes.INTEGER,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Comment',
    }
  );
  return Comment;
};
