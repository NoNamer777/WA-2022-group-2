const { DataTypes } = require('sequelize');

module.exports = {
  badgeTableDefinition: {
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
  }
};
