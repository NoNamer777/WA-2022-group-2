const UserRepository = require('./user.repository')
const { NotFoundException, BadRequestException } = require('../error.models')

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
   * @param userData {UserEntity}
   * @return {Promise<UserEntity>}
   */
  async update(userData) {
    const userId = userData.id

    if (!userId) {
      throw new BadRequestException('Could not update User. ID is not provided.')
    }
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
    // TODO: Encrypt/hash the password before storing it in the database

    await (await UserRepository.instance()).update(userData)
    return await this.getById(userId)
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
    await (await UserRepository.instance()).deleteById(userId)
  }
}

module.exports = UserService
