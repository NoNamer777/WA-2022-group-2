const UserRepository = require('./user.repository')
const { NotFoundException, BadRequestException } = require('../error.models')

class UserService {
  /** @return {UserService} */
  static instance() {
    if (UserService.#instance) return UserService.#instance

    UserService.#instance = new UserService()
    return UserService.#instance
  }

  /** @type {UserService} */
  static #instance

  // TODO: Do not return user's email and password

  /** @return {Promise<UserEntity[]>} */
  async getAll() {
    return await (await UserRepository.instance()).findAll()
  }

  /**
   * @param id {number}
   * @param throwsError {boolean}
   * @return {Promise<UserEntity>}
   */
  async getById(id, throwsError = true) {
    const userById = await (await UserRepository.instance()).findOneBy({ id: id })

    if (!userById && throwsError) {
      throw new NotFoundException(`No User was found by ID: '${id}'.`)
    }
    return userById
  }
}

module.exports = UserService
