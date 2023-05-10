const { DataTypes, Model } = require('sequelize')
const DatabaseService = require('../../services/database.service')

class ChallengeEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<ChallengeEntity>} */
const ChallengeModelDefinition = {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  group_id: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    references: {
      model: 'group',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}

ChallengeEntity.init(ChallengeModelDefinition, {
  sequelize: DatabaseService.instance().sequelizeInstance,
  modelName: 'challenge',
  tableName: 'challenge',
  createdAt: false,
  updatedAt: false
})

module.exports = { ChallengeEntity, ChallengeModelDefinition }
