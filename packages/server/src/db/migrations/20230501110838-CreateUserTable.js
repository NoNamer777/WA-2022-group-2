const { UserModelDefinition } = require('../../app/models/user/user.entity');

/**
 * @param queryInterface {import('sequelize').QueryInterface}
 * @return {Promise<void>}
 */
export async function up(queryInterface) {
  await queryInterface.createTable('user', UserModelDefinition);
}

/**
 * @param queryInterface {import('sequelize').QueryInterface}
 * @return {Promise<void>}
 */
export async function down(queryInterface) {
  await queryInterface.dropTable('user');
}
