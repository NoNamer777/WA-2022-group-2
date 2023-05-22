import { DataTypes, Model } from 'sequelize';
import { DatabaseService } from '../../core/services/index.js';

export class UserGroupEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<UserGroupEntity>} */
export const UserGroupModelDefinition = {
  user_id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    references: {
      model: 'user',
      key: 'id'
    },
    onDelete: 'CASCADE',
    allowNull: false
  },
  group_id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    references: {
      model: 'group',
      key: 'id'
    },
    onDelete: 'CASCADE',
    allowNull: false
  }
};

export const UserGroupModelOptions = {
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'group_id']
    }
  ]
};

/** @return {void} */
export function initializeUserGroupEntity() {
  UserGroupEntity.init(UserGroupModelDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'user_group',
    tableName: 'user_group',
    createdAt: false,
    updatedAt: false
  });
}
