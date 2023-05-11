const { DataTypes, Model } = require('sequelize')
const DatabaseService = require('../../services/database.service')

class UserGroupEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<UserGroupEntity>} */
const UserGroupModelDefinition = {
  user_id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    references: {
      model: 'user',
      key: 'id'
    },
    onDelete: 'CASCADE',
    allowNull: false
  },
  group_id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    references: {
      model: 'group',
      key: 'id'
    },
    onDelete: 'CASCADE',
    allowNull: false
  }
}

const UserGroupModelOptions = {
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'group_id']
    }
  ]
}

UserGroupEntity.init(UserGroupModelDefinition, {
  sequelize: DatabaseService.instance().sequelizeInstance,
  modelName: 'user_group',
  tableName: 'user_group',
  createdAt: false,
  updatedAt: false
})

module.exports = { UserGroupEntity, UserGroupModelDefinition, UserGroupModelOptions }
