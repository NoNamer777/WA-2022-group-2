const { DataTypes, Model } = require('sequelize');
const DatabaseService = require('../../services/database.service');

class ChallengeDayEntity extends Model {}

/** @type {import('sequelize').ModelAttributes<ChallengeDayEntity>} */
const ChallengeDayModelDefinition = {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  earned: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  user_challenge_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'user_challenge',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
};

ChallengeDayEntity.init(ChallengeDayModelDefinition, {
  sequelize: DatabaseService.instance().sequelizeInstance,
  modelName: 'challenge_day',
  tableName: 'challenge_day',
  createdAt: false,
  updatedAt: false
});

module.exports = { ChallengeDayEntity, ChallengeDayModelDefinition };
