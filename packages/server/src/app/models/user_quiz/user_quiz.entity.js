const { DataTypes, Model } = require('sequelize');
import { DatabaseService } from '../../core/services/index.js';

class UserQuizEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<UserQuizEntity>} */
const UserQuizModelDefinition = {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER(11),
    references: {
      model: 'user',
      key: 'id'
    },
    onDelete: 'CASCADE',
    allowNull: false
  },
  quiz_id: {
    type: DataTypes.INTEGER(11),
    references: {
      model: 'quiz',
      key: 'id'
    },
    onDelete: 'CASCADE',
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  points: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  }
};

UserQuizEntity.init(UserQuizModelDefinition, {
  sequelize: DatabaseService.instance().sequelizeInstance,
  modelName: 'user_quiz',
  tableName: 'user_quiz',
  createdAt: false,
  updatedAt: false
});

module.exports = { UserQuizEntity, UserQuizModelDefinition };
