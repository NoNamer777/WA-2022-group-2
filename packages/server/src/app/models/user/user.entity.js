const { DataTypes, Model } = require('sequelize')

class UserEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<UserEntity>} */
const UserModelDefinition = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'unique_user_username_idx'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}

module.exports = { UserEntity, UserModelDefinition }
