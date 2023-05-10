const jwt = require('jsonwebtoken')

class JwtService {
  /** @return {JwtService} */
  static instance() {
    if (JwtService.#instance) return JwtService.#instance

    JwtService.#instance = new JwtService()
    return this.#instance
  }

  /** @type {JwtService} */
  static #instance

  generateToken(payload, expiresIn) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn })
  }

  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
  }
}

module.exports = JwtService
