import { DataTypes, Model } from 'sequelize';
import { DatabaseService } from '../core/services/index.js';

export class EarnedBadgeEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<EarnedBadgeEntity>} */
export const EarnedBadgeModelDefinition = {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
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
  badge_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'badge',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  user_challenge_id: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    references: {
      model: 'user_challenge',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  user_quiz_id: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    references: {
      model: 'user_quiz',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
};

export const EarnedBadgeModelOptions = {
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'badge_id']
    }
  ]
};

/** @return {void} */
export function initializeEarnedBadgeEntity() {
  EarnedBadgeEntity.init(EarnedBadgeModelDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'earned_badge',
    tableName: 'earned_badge',
    createdAt: false,
    updatedAt: false
  });
}