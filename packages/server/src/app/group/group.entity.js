import { DatabaseService } from '../core/services/index.js';

import { DataTypes, Model } from 'sequelize';

export class GroupEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<GroupEntity>} */
export const GroupModelDefinition = {
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
export function initializeGroupEntity() {
  GroupEntity.init(GroupModelDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'group',
    tableName: 'group',
    createdAt: false,
    updatedAt: false
  });
}
