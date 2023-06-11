import { Model } from 'sequelize';
import definition from '../../../db/table-definitions/user-group.js';
import { DatabaseService } from '../../core/services/index.js';

export class UserGroupEntity extends Model {}

/** @return {void} */
export function initializeUserGroupEntity() {
  UserGroupEntity.init(definition.userGroupTableDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'user_group',
    tableName: 'user_group',
    createdAt: false,
    updatedAt: false
  });
}
