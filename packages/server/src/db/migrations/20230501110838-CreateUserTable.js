const { UserModelDefinition } = require('../../app/user/index.js');

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
