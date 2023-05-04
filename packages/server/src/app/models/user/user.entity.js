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
    },
    set(password) {
      const pass = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
      this.setDataValue('password', pass)
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

UserEntity.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

UserEntity.prototype.toJSON = function () {
  const values = Object.assign({}, this.get())

  delete values.password
  return values
}

module.exports = { UserEntity, UserModelDefinition }
