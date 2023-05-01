const UserRepository = require('./user.repository')

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
    return await (await UserRepository.instance()).findAll()
  }
}

module.exports = UserService
