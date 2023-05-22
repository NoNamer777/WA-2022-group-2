import { DataTypes, Model } from 'sequelize';
import { DatabaseService } from '../../core/services/index.js';

export class QuizQuestionEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<QuizQuestionEntity>} */
export const QuizQuestionModelDefinition = {
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

/** @return {void} */
export function initializeQuizQuestionEntity() {
  QuizQuestionEntity.init(QuizQuestionModelDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'quiz_question',
    tableName: 'quiz_question',
    createdAt: false,
    updatedAt: false
  });
}
