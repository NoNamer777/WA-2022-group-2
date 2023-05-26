import { Model } from 'sequelize';
import definition from '../../db/table-definitions/group.js';
import { DatabaseService } from '../core/services/index.js';

export class GroupEntity extends Model {}

/** @return {void} */
export function initializeGroupEntity() {
  GroupEntity.init(definition.groupTableDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'group',
    tableName: 'group',
    createdAt: false,
    updatedAt: false
  });
}
