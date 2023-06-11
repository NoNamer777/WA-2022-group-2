const { DataTypes } = require('sequelize');

module.exports = {
  challengeDayTableDefinition: {
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
      defaultValue: false,
      allowNull: false
    },
    userChallengeId: {
      field: 'user_challenge_id',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user_challenge',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }
};
