const { DataTypes, Model } = require('sequelize');
const DatabaseService = require('../../services/database.service');

class QuizQuestionEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<QuizQuestionEntity>} */
const QuizQuestionModelDefinition = {
  quiz_id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    references: {
      model: 'quiz',
      key: 'id'
    },
    onDelete: 'CASCADE',
    allowNull: false
  },
  question_id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    references: {
      model: 'question',
      key: 'id'
    },
    onDelete: 'CASCADE',
    allowNull: false
  },
  order: {
    type: DataTypes.INTEGER(11),
    allowNull: true
  }
};

QuizQuestionEntity.init(QuizQuestionModelDefinition, {
  sequelize: DatabaseService.instance().sequelizeInstance,
  modelName: 'quiz_question',
  tableName: 'quiz_question',
  createdAt: false,
  updatedAt: false
});

module.exports = { QuizQuestionEntity, QuizQuestionModelDefinition };
