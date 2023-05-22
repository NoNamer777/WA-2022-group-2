import { DatabaseService } from '../../core/services/index.js';

import { DataTypes, Model } from 'sequelize';

export class QuizEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<QuizEntity>} */
export const QuizModelDefinition = {
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

/** @return {void} */
export function initializeQuizEntity() {
  QuizEntity.init(QuizModelDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'quiz',
    tableName: 'quiz',
    createdAt: false,
    updatedAt: false
  });
}
