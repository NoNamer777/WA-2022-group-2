const express = require('express')
const router = express.Router()
const UserService = require('./user.service')
const { BadRequestException } = require('../error.models')
const { isNumber } = require('../../utils/validation')

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
        `Invalid ID format: '${userIdParam}'. Please, use whole positive number only.`
      )
    }
    return await UserService.instance().getById(parseInt(userIdParam))
  }

  /**
   * @param userData {Omit<UserEntity, 'id'>}
   * @return {Promise<UserEntity>}
   */
  async create(userData) {
    console.info('UserController - Creating a new User resource')
    return await UserService.instance().create(userData)
  }
}

router.get('/', async (_, response) => {
  response.send(await UserController.instance().getAll())
})

router.get('/:userId', async (request, response) => {
  response.send(await UserController.instance().getById(request.params.userId))
})

router.post('/', async (request, response) => {
  response.status(201).send(await UserController.instance().create(request.body))
})

module.exports = router
