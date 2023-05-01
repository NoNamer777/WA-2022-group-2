const express = require('express')
const router = express.Router()
const UserService = require('./user.service')

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
}

router.get('/', async (_, response) => {
  response.send(await UserController.instance().getAll())
})
})

module.exports = router
