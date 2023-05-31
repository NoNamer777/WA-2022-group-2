const { DataTypes } = require('sequelize');
module.exports = {
  groupTableDefinition: {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255)
    },
    code: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true
    }
  }
};
