import { DataTypes, Model } from 'sequelize';
import { DatabaseService } from '../../core/services/index.js';

export class QuestionEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<QuestionEntity>} */
export const QuestionModelDefinition = {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  text: {
    type: DataTypes.STRING(255)
  },
  image_path: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
};

/** @return {void} */
export function initializeQuestionEntity() {
  QuestionEntity.init(QuestionModelDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'question',
    tableName: 'question',
    createdAt: false,
    updatedAt: false
  });
}
