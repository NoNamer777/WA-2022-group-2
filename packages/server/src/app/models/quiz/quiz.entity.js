const { DataTypes, Model } = require('sequelize');
const DatabaseService = require('../../services/database.service');

class QuizEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<QuizEntity>} */
const QuizModelDefinition = {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255)
  }
};

QuizEntity.init(QuizModelDefinition, {
  sequelize: DatabaseService.instance().sequelizeInstance,
  modelName: 'quiz',
  tableName: 'quiz',
  createdAt: false,
  updatedAt: false
});

module.exports = { QuizEntity, QuizModelDefinition };
