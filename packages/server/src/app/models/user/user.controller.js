const UserService = require('./user.service')
const { isNumber } = require('../../utils/validation')
const BadRequestException = require('../errors/bad-request.exception')
const UnauthorizedException = require('../errors/unauthorized-exception')

class UserController {
  /** @return {UserController} */
  static instance() {
    if (UserController.#instance) return UserController.#instance

    UserController.#instance = new UserController()
    return UserController.#instance
  }

  /** @type {UserController} */
  static #instance

  /** @return {Promise<UserEntity[]>} */
  async getAll() {
    console.info('UserController - Getting all Users data')

    return await UserService.instance().getAll()
  }

  /**
   * @param userIdParam {string}
   * @return {Promise<UserEntity>}
   */
  async getById(userIdParam) {
    console.info(`UserController - Getting data for User with ID: '${userIdParam}'`)

    if (!isNumber(userIdParam)) {
      throw new BadRequestException(
        `Invalid ID format: '${userIdParam}'. Please, use whole positive numbers only.`
      )
    }
    return await UserService.instance().getById(parseInt(userIdParam))
  }

  /**
   * @param userIdParam {string}
   * @param userData {UserEntity}
   * @return {Promise<UserEntity>}
   */
  async update(userIdParam, userData) {
    console.info(`UserController - Updating User resource on path: '${userIdParam}'`)

    if (!isNumber(userIdParam)) {
      throw new BadRequestException(
        `Invalid ID format: '${userIdParam}'. Please, use whole positive numbers only.`
      )
    }
    const userId = parseInt(userData.id)
    userIdParam = parseInt(userIdParam)

    if (isNaN(userId) || userId !== userIdParam) {
      throw new BadRequestException(
        `Will not update User on path: '/api/user/${userIdParam}' with data from User with ID: '${userId}'.`
      )
    }
    return await UserService.instance().update(userData)
  }

  /**
   * @param userData {Omit<UserEntity, 'id'>}
   * @return {Promise<UserEntity>}
   */
  async create(userData) {
    console.info('UserController - Creating a new User resource')

    return await UserService.instance().create(userData)
  }

  /**
   * @param userIdParam {string}
   * @return {Promise<void>}
   */
  async deleteById(userIdParam) {
    console.info(`UserController - Removing User resource with ID: '${userIdParam}'`)

    if (!isNumber(userIdParam)) {
      return new BadRequestException(
        `Invalid ID format: '${userIdParam}'. Please, use whole positive numbers only.`
      )
    }
    await UserService.instance().deleteById(parseInt(userIdParam))
  }

  /**
   * @param data
   * @return {Promise<UserEntity>}
   */
  async auth(data) {
    console.info('UserController - login user in')

    const user = await UserService.instance().getByUsername(data.username, false)

    if (!user || !user.validPassword(data.password)) {
      throw new UnauthorizedException('De combinatie van gebruikersnaam en wachtwoord is onjuist.')
    }

    return user
  }
}

module.exports = UserController
