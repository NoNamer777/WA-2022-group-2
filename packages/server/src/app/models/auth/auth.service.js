const UserService = require('../user/user.service')
const NotFoundException = require('../errors/not-found.exception')
const UnauthorizedException = require('../errors/unauthorized-exception')
const InternalServerErrorException = require('../errors/internal-server.exception')

class AuthService {
  /** @return {AuthService} */
  static instance() {
    if (AuthService.#instance) return AuthService.#instance

    AuthService.#instance = new AuthService()
    return AuthService.#instance
  }

  /** @type {AuthService} */
  static #instance

  /**
   * @param userData {{ username: string, password: string }}
   * @returns {Promise<UserEntity>}
   */
  async login(userData) {
    let user

    try {
      user = await UserService.instance().getByUsername(userData.username)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException(
          'De combinatie van gebruikersnaam en wachtwoord is onjuist.'
        )
      }
      throw new InternalServerErrorException(error.message)
    }
    if (!(await user.validatePassword(userData.password))) {
      throw new UnauthorizedException('De combinatie van gebruikersnaam en wachtwoord is onjuist.')
    }
    return user
  }
}

module.exports = AuthService
