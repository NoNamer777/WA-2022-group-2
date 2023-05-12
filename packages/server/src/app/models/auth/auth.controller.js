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
   * @param userData {{ username: string, password: string }}
   * @return {Promise<string>}
   */
  async login(userData) {
    console.info('AuthController - Logging in an User')
    const user = await AuthService.instance().login(userData)

    return JwtService.instance().encodeToken(user.toJSON())
  }
}

module.exports = AuthController
