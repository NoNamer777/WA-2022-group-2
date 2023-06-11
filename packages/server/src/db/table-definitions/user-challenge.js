const { DataTypes } = require('sequelize');

module.exports = {
  userChallengeTableDefinition: {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      onDelete: 'CASCADE',
      unique: 'unique_user_challenge_idx'
    },
    challengeId: {
      field: 'challenge_id',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'challenge',
        key: 'id'
      },
      onDelete: 'CASCADE',
      unique: 'unique_user_challenge_idx'
    }
  }
};
