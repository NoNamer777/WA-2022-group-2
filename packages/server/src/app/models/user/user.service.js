const UserRepository = require('./user.repository')
const NotFoundException = require('../errors/not-found.exception')
const BadRequestException = require('../errors/bad-request.exception')

// TODO: Only allow Users managing their own access or allow access to the User data to Admins.

class UserService {
  /** @return {UserService} */
  static instance() {
    if (UserService.#instance) return UserService.#instance

    UserService.#instance = new UserService()
    return UserService.#instance
  }

  /** @type {UserService} */
  static #instance

  /** @return {Promise<UserEntity[]>} */
  async getAll() {
    return await UserRepository.instance().findAll()
  }

  /**
   * @param userId {number}
   * @param throwsError {boolean}
   * @return {Promise<UserEntity>}
   */
  async getById(userId, throwsError = true) {
    const userById = await UserRepository.instance().findOneBy({ id: userId })

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
    const userByUsername = await UserRepository.instance().findOneBy({ username: username })

    if (!userByUsername && throwsError) {
      throw new NotFoundException(`No User was found by the username: '${username}'.`)
    }
    return userByUsername
  }

  /**
   * @param userData {UserEntity}
   * @return {Promise<UserEntity>}
   */
  async update(userData) {
    const userId = userData.id

    if (!(await this.getById(userId, false))) {
      throw new NotFoundException(
        `Could not update User with ID: '${userId}' because it does not exist.`
      )
    }
    if (await this.getByUsername(userData.username, false)) {
      throw new BadRequestException(
        `Could not update User with ID: '${userId}'. Username '${userData.username}' is already in use.`
      )
    }
    await UserRepository.instance().update(userData)
    return await this.getById(userId)
  }

  /**
   * @param userData {Omit<UserEntity, 'id'>}
   * @return {Promise<UserEntity>}
   */
  async create(userData) {
    if (await this.getByUsername(userData.username, false)) {
      throw new BadRequestException(`Gebruikersnaam '${userData.username}' is al in gebruik 😓`)
    }
    return await UserRepository.instance().create(userData)
  }

  /**
   * @param userId {number}
   * @return {Promise<void>}
   */
  async deleteById(userId) {
    if (!(await this.getById(userId, false))) {
      throw new NotFoundException(
        `Could not delete User by ID: '${userId}' because it does not exist.`
      )
    }
    await UserRepository.instance().deleteById(userId)
  }
}

module.exports = UserService
