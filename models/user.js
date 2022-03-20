'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Course, {
        as: 'course',
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
          len: {
            args: [8, 20],
            msg: 'Password must be between 8 and 20 characters',
          },
        },
      },
    },
    {
      // used a hook to hash the password before saving to the database
      // this way the inputted password is being validated before hashing it
      hooks: {
        beforeCreate: async user => {
          user.password = await bcrypt.hashSync(user.password, 10);
        },
      },
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
