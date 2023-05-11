const AuthService = require('./auth.service')

class AuthController {
  /** @return {AuthController} */
  static instance() {
    if (AuthController.#instance) return AuthController.#instance

    AuthController.#instance = new AuthController()
    return AuthController.#instance
  }

  /** @type {AuthController} */
  static #instance

  /**
   * @param data {{ username: string, password: string }}
   * @return {Promise<UserEntity>}
   */
  async login(data) {
    console.info('AuthController - login user in')
    return await AuthService.instance().login(data)
  }
}

module.exports = AuthController
