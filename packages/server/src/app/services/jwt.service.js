const jwt = require('jsonwebtoken')

/** Token expiration time in ms. (8 hours currently). */
const TOKEN_VALID_DURATION = 8 * 60 * 60 * 1_000

class JwtService {
  /** @return {JwtService} */
  static instance() {
    if (JwtService.#instance) return JwtService.#instance

    JwtService.#instance = new JwtService()
    return this.#instance
  }

  /** @type {JwtService} */
  static #instance

  /**
   * @param payload {UserEntity}
   * @returns {string}
   */
  encodeToken(payload) {
    return jwt.sign(payload, process.env.VITE_JWT_SECRET, {
      subject: `${payload.id}`,
      expiresIn: `${TOKEN_VALID_DURATION}ms`
    })
  }

  /**
   * @param token {string}
   * @returns
   */
  decodeToken(token) {
    return jwt.verify(token, process.env.VITE_JWT_SECRET)
  }
}

module.exports = JwtService
