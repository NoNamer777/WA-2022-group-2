const { DataTypes, Model } = require('sequelize');
import { DatabaseService } from '../../core/services/index.js';

class GroupEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<GroupEntity>} */
const GroupModelDefinition = {
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

GroupEntity.init(GroupModelDefinition, {
  sequelize: DatabaseService.instance().sequelizeInstance,
  modelName: 'group',
  tableName: 'group',
  createdAt: false,
  updatedAt: false
});

module.exports = { GroupEntity, GroupModelDefinition };
