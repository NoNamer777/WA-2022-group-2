const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = {
  userTableDefinition: {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        notNull: true,
        isInt: true,
        min: 0
      }
    },
    username: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: 'unique_user_username_idx',
      validate: {
        notNull: true,
        notEmpty: true,
        len: [3, 80]
      }
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail: true,
        len: [3, 80]
      }
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [3, 128],
        is: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_\-+=;:<>.?()])[a-zA-Z0-9!@#$%^&*_\-+=;:<>.?()]+/g
      },
      set(password) {
        this.setDataValue('password', bcrypt.hashSync(password, bcrypt.genSaltSync(15)));
      }
    },
    profile_image_path: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    state: {
      type: DataTypes.ENUM('pending', 'active'),
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        notNull: true,
        notEmpty: true,
        isIn: [['pending', 'active']]
      }
    }
  }
};
