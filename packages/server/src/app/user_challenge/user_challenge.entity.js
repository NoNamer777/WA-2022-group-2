import { Model } from 'sequelize';
import definition from '../../db/table-definitions/user-challenge.js';
import { DatabaseService } from '../core/services/index.js';

export class UserChallengeEntity extends Model {}

/** @return {void} */
export function initializeUserChallengeEntity() {
  UserChallengeEntity.init(definition.userChallengeTableDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'user_challenge',
    tableName: 'user_challenge',
    createdAt: false,
    updatedAt: false
  });
}
