const { DataTypes } = require('sequelize');

module.exports = {
  challengeTableDefinition: {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    group_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'group',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }
};
