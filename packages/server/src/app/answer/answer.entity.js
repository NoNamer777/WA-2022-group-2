import { DataTypes, Model } from 'sequelize';
import { DatabaseService } from '../core/services/index.js';

export class AnswerEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<AnswerEntity>} */
export const AnswerModelDefinition = {
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
};

/** @return {void} */
export function initializeAnswerEntity() {
  AnswerEntity.init(AnswerModelDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'answer',
    tableName: 'answer',
    createdAt: false,
    updatedAt: false
  });
}
