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
   * @param userId {number}
   * @param throwsError {boolean}
   * @return {Promise<UserEntity>}
   */
  async getById(userId, throwsError = true) {
    const userById = await (await UserRepository.instance()).findOneBy({ id: userId })

    if (!userById && throwsError) {
      throw new NotFoundException(`No User was found by ID: '${userId}'.`)
    }
    return userById
  }

  /**
   * @param username {string}
   * @param throwsError {boolean}
   * @return {Promise<UserEntity>}
   */
  async getByUsername(username, throwsError = true) {
    const userByUsername = await (await UserRepository.instance()).findOneBy({ username: username })

    if (!userByUsername && throwsError) {
      throw new NotFoundException(`No User was found by the username: '${username}'.`)
    }
    return userByUsername
  }

  /**
   * @param userData {Omit<UserEntity, 'id'>}
   * @return {Promise<UserEntity>}
   */
  async create(userData) {
    if (await this.getByUsername(userData.username, false)) {
      throw new BadRequestException(
        `Could not create new User. Username '${userData.username}' is already in use.`
      )
    }
    // TODO: Encrypt/hash the password before storing it in the database

    return await (await UserRepository.instance()).create(userData)
  }
}

module.exports = UserService
