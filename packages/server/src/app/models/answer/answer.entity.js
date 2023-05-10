const { DataTypes, Model } = require('sequelize')
const DatabaseService = require('../../services/database.service')

class AnswerEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<AnswerEntity>} */
const AnswerModelDefinition = {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  text: {
    type: DataTypes.STRING(255)
  },
  correct: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  question_id: {
    type: DataTypes.INTEGER(11),
    references: {
      model: 'question',
      key: 'id'
    },
    onDelete: 'CASCADE',
    allowNull: false
  }
}

AnswerEntity.init(AnswerModelDefinition, {
  sequelize: DatabaseService.instance().sequelizeInstance,
  modelName: 'answer',
  tableName: 'answer',
  createdAt: false,
  updatedAt: false
})

module.exports = { AnswerEntity, AnswerModelDefinition }
