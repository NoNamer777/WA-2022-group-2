const { DataTypes } = require('sequelize');
module.exports = {
  earnedBadgeTableDefinition: {
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
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER(11),
      references: {
        model: 'user',
        key: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false,
      unique: 'unique_earned_badge_idx'
    },
    badgeId: {
      field: 'badge_id',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'badge',
        key: 'id'
      },
      onDelete: 'CASCADE',
      unique: 'unique_earned_badge_idx'
    },
    userChallengeId: {
      field: 'user_challenge_id',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user_challenge',
        key: 'id'
      },
      onDelete: 'CASCADE',
      unique: 'unique_earned_badge_idx'
    }
  }
};
