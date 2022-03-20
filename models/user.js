'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Course, {
        as: 'courses',
        foreignKey: {
          fieldName: 'userId',
          allowNull: false,
        },
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please provide a first name',
          },
          notNull: {
            msg: 'A first name is required',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please provide a last name',
          },
          notNull: {
            msg: 'A last name is required',
          },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'An account with this email address already exists',
        },
        validate: {
          isEmail: {
            msg: 'Please provide a valid email address',
          },
          notEmpty: {
            msg: 'Please provide a first name',
          },
          notNull: {
            msg: 'A first name is required',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A password is required',
          },
        },
        set(val) {
          if (val.length >= 8 && val.length <= 20) {
            this.setDataValue('password', bcrypt.hashSync(val, 10));
          } else {
            throw new Error('Your password should be between 8 and 20 characters');
          }
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
