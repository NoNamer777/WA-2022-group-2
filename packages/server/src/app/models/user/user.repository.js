const { UserModelDefinition, UserEntity } = require('./user.entity')
const DatabaseService = require('../../services/database.service')

class UserRepository {
  /** @return {Promise<UserRepository>} */
  static async instance() {
    if (UserRepository.#instance) return UserRepository.#instance

    UserRepository.#instance = new UserRepository()
    await UserRepository.#instance.#initialize()

    return UserRepository.#instance
  }

  /** @type {UserRepository} */
  static #instance

  /** @type {import('sequelize').ModelStatic} */
  #userModel

  /** @return {Promise<UserEntity[]>} */
  async findAll() {
    return await this.#userModel.findAll()
  }

  /** @return {Promise<void>} */
  async #initialize() {
    this.#userModel = UserEntity.init(UserModelDefinition, {
      sequelize: (await DatabaseService.instance()).sequelizeInstance,
      modelName: 'user',
      tableName: 'user',
      createdAt: false,
      updatedAt: false
    })
  }
}

module.exports = UserRepository
