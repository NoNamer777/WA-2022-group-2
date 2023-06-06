import { Model } from 'sequelize';
import definition from '../../../db/table-definitions/earned-badge.js';
import { DatabaseService } from '../../core/services/index.js';

export class EarnedBadgeEntity extends Model {}

/** @return {void} */
export function initializeEarnedBadgeEntity() {
  EarnedBadgeEntity.init(definition.earnedBadgeTableDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'earned_badge',
    tableName: 'earned_badge',
    createdAt: false,
    updatedAt: false
  });
}
