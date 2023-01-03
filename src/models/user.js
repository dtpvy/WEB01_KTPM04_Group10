'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
      });
      User.hasMany(models.Order, {
        foreignKey: 'userId',
      });
      const AccountGarages = sequelize.define(
        'AccountGarages',
        {
          password: DataTypes.STRING,
          role: DataTypes.ENUM('owner', 'admin', 'employee'),
        },
        { timestamps: false }
      );
      User.belongsToMany(models.Garage, {
        through: AccountGarages,
        foreignKey: 'UserId',
      });
    }
  }
  User.init(
    {
      fullname: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      email: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
