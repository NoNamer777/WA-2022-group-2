import { DataTypes, Model } from 'sequelize';
import { DatabaseService } from '../../core/services/index.js';

export class BadgeEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<BadgeEntity>} */
export const BadgeModelDefinition = {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255)
  },
  image_path: {
    type: DataTypes.STRING(255)
  }
};

/** @return {void} */
export function initializeBadgeEntity() {
  BadgeEntity.init(BadgeModelDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'badge',
    tableName: 'badge',
    createdAt: false,
    updatedAt: false
  });
}
