const { DataTypes, Model } = require('sequelize');
import { DatabaseService } from '../../core/services/index.js';

class QuestionEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<QuestionEntity>} */
const QuestionModelDefinition = {
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

QuestionEntity.init(QuestionModelDefinition, {
  sequelize: DatabaseService.instance().sequelizeInstance,
  modelName: 'question',
  tableName: 'question',
  createdAt: false,
  updatedAt: false
});

module.exports = { QuestionEntity, QuestionModelDefinition };
