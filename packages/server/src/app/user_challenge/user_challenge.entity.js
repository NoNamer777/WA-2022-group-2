import { DataTypes, Model } from 'sequelize';
import { DatabaseService } from '../core/services/index.js';

export class UserChallengeEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<UserChallengeEntity>} */
export const UserChallengeModelDefinition = {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  challenge_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'challenge',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  badge_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'badge',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
};

/** @return {void} */
export function initializeUserChallengeEntity() {
  UserChallengeEntity.init(UserChallengeModelDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'user_challenge',
    tableName: 'user_challenge',
    createdAt: false,
    updatedAt: false
  });
}
