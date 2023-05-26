import { Model } from 'sequelize';
import definition from '../../db/table-definitions/challenge-day.js';
import { DatabaseService } from '../core/services/index.js';

export class ChallengeDayEntity extends Model {}

/** @return {void} */
export function initializeChallengeDayEntity() {
  ChallengeDayEntity.init(definition.challengeDayTableDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'challenge_day',
    tableName: 'challenge_day',
    createdAt: false,
    updatedAt: false
  });
}
