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
    return await UserService.instance().getAll()
  }

  /**
   * @param id {number}
   * @return {Promise<UserEntity>}
   */
  async getById(id) {
    return await UserService.instance().getById(id)
  }

  /**
   * @param userData {Omit<UserEntity, 'id'>}
   * @return {Promise<UserEntity>}
   */
  async create(userData) {
    return await UserService.instance().create(userData)
  }
}

router.get('/', async (_, response) => {
  console.info('UserController - Getting all Users data')
  response.send(await UserController.instance().getAll())
})

router.get('/:userId', async (request, response) => {
  const userIdPath = request.params.userId
  console.info(`UserController - Getting data for User with ID: '${userIdPath}'`)

  if (!isNumber(userIdPath)) {
    return response
      .status(400)
      .send(
        new BadRequestException(
          `Invalid ID format: '${request.params.userId}'. Please, use whole positive number only.`
        )
      )
  }
  return response.send(await UserController.instance().getById(parseInt(userIdPath)))
})

router.post('/', async (request, response) => {
  console.info('UserController - Creating a new User resource')
  response.status(201).send(await UserController.instance().create(request.body))
})

module.exports = router
