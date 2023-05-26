import { Model } from 'sequelize';
import definition from '../../db/table-definitions/challenge.js';
import { DatabaseService } from '../core/services/index.js';

export class ChallengeEntity extends Model {}

/** @return {void} */
export function initializeChallengeEntity() {
  ChallengeEntity.init(definition.challengeTableDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'challenge',
    tableName: 'challenge',
    createdAt: false,
    updatedAt: false
  });
}
