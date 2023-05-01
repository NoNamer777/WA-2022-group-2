const express = require('express')
const router = express.Router()
const UserService = require('./user.service')
const { BadRequestException } = require('../error.models')
const { isNumber } = require('../../utils/validation')

// TODO: Only allow Users managing their own access or allow access to the User data to Admins.

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
}

router.get('/', async (_, response) => {
  response.send(await UserController.instance().getAll())
})

router.get('/:userId', async (request, response) => {
  response.send(await UserController.instance().getById(request.params.userId))
})

router.put('/:userId', async (request, response) => {
  response.send(await UserController.instance().update(request.params.userId, request.body))
})

router.post('/', async (request, response) => {
  response.status(201).send(await UserController.instance().create(request.body))
})

router.delete('/:userId', async (request, response) => {
  response.send(await UserController.instance().deleteById(request.params.userId))
})

module.exports = router
