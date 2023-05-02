const bcrypt = require('bcryptjs')
const { DataTypes, Model } = require('sequelize')
const DatabaseService = require('../../services/database.service')

class UserEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<UserEntity>} */
const UserModelDefinition = {
  id: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'unique_user_username_idx',
    validate: {
      notNull: true,
      notEmpty: true,
      len: [3, 80]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      isEmail: true,
      len: [3, 80]
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      len: [3, 124],
      is: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_\-+=;:<>.?()])[a-zA-Z0-9!@#$%^&*_\-+=;:<>.?()]+/g
    }
  }
}

UserEntity.init(UserModelDefinition, {
  sequelize: DatabaseService.instance().sequelizeInstance,
  modelName: 'user',
  tableName: 'user',
  createdAt: false,
  updatedAt: false
})

UserEntity.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

UserEntity.prototype.validPassword = (password) => {
  return bcrypt.compareSync(password, this.password)
}

UserEntity.prototype.toJSON = function () {
  const values = Object.assign({}, this.get())

  delete values.password
  return values
}

module.exports = { UserEntity, UserModelDefinition }
