import { Model } from 'sequelize';
import definition from '../../db/table-definitions/badge.js';
import { DatabaseService } from '../core/services/index.js';

export class BadgeEntity extends Model {}

/** @return {void} */
export function initializeBadgeEntity() {
  BadgeEntity.init(definition.badgeTableDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'badge',
    tableName: 'badge',
    createdAt: false,
    updatedAt: false
  });
}
