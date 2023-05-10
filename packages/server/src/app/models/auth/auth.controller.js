const UserService = require('../user/user.service')
const UnauthorizedException = require('../errors/unauthorized-exception')

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
   * @param data
   * @return {Promise<UserEntity>}
   */
  async auth(data) {
    console.info('AuthController - login user in')

    const user = await UserService.instance().getByUsername(data.username, false)

    if (!user || !user.validPassword(data.password)) {
      throw new UnauthorizedException(
        'De combinatie van gebruikersnaam en wachtwoord is onjuist. 😋'
      )
    }

    return user
  }
}

module.exports = AuthController
