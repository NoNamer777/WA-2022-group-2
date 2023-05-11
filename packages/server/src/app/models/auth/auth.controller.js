const AuthService = require('./auth.service')
const JwtService = require('../../services/jwt.service')

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
   * @return {Promise<string>}
   */
  async login(data) {
    console.info('AuthController - login user in')
    const user = await AuthService.instance().login(data)
    return JwtService.instance().generateToken(user.toJSON())
  }
}

module.exports = AuthController
