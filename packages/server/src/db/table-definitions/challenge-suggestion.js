const { DataTypes } = require('sequelize');

module.exports = {
  challengeSuggestionTableDefinition: {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }
};
