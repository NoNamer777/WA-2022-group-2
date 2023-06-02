import jwt from 'jsonwebtoken';

/** Token expiration time in ms. (8 hours currently). */
const TOKEN_VALID_DURATION = 8 * 60 * 60 * 1_000;

export class JwtService {
  /** @return {JwtService} */
  static instance() {
    if (JwtService.#instance) return JwtService.#instance;

    JwtService.#instance = new JwtService();
    return this.#instance;
  }

  /** @type {JwtService} */
  static #instance;

  /**
   * @param payload {UserEntity}
   * @param expirationTime {number}
   * @returns {string}
   */
  encodeToken(payload, expirationTime = TOKEN_VALID_DURATION) {
    return jwt.sign(payload, process.env.VITE_JWT_SECRET || '', {
      subject: `${payload.id}`,
      expiresIn: `${expirationTime}ms`
    });
  }

  /**
   * @param token {string}
   * @returns
   */
  decodeToken(token) {
    return jwt.verify(token, process.env.VITE_JWT_SECRET || '');
  }
}
