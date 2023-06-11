const { DataTypes } = require('sequelize');

module.exports = {
  userGroupTableDefinition: {
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false
    },
    groupId: {
      field: 'group_id',
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      references: {
        model: 'group',
        key: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false
    }
  }
};
