const AuthService = require('./auth.service');
const JwtService = require('../../services/jwt.service');

class AuthController {
  /** @return {AuthController} */
  static instance() {
    if (AuthController.#instance) return AuthController.#instance;

    AuthController.#instance = new AuthController();
    return AuthController.#instance;
  }

  /** @type {AuthController} */
  static #instance;

  async register(userData) {
    console.info('AuthController - registering a new User');
    return await AuthService.instance().register(userData);
  }

  /**
   * @param userData {{ username: string, password: string }}
   * @return {Promise<string>}
   */
  async login(userData) {
    console.info('AuthController - Logging in an User');
    const user = await AuthService.instance().login(userData);

    return JwtService.instance().encodeToken(user.toJSON());
  }
}

module.exports = AuthController;
