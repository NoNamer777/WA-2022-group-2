import jwt from 'jsonwebtoken';
import { InternalServerErrorException } from '../../core/models/index.js';
import { UnauthorizedException } from '../models/errors/unauthorized-exception.js';

/** Token expiration time in ms. (8 hours currently). */
const TOKEN_VALID_DURATION = 8 * 60 * 60 * 1_000;

export const TOKEN_TYPES = ['Full', 'PasswordReset', 'VerifyRegistration'];

export class JwtService {
  /** @return {JwtService} */
  static instance() {
    if (JwtService.#instance) return JwtService.#instance;

    JwtService.#instance = new JwtService();
    return this.#instance;
  }

  /** @type {JwtService} */
  static #instance;

  /** @type {string} */
  #jwtSecret = process.env.VITE_JWT_SECRET;

  /** @return {void} */
  initialize() {
    if (this.#jwtSecret) return;

    throw new Error(`Environment variable 'VITE_JWT_SECRET' is not defined.`);
  }

  /**
   * @param payload {{ userId: number, tokenType: 'Full' | 'PasswordReset' | 'VerifyRegistration' }}
   * @param expirationTime {number}
   * @returns {string}
   */
  encodeToken(payload, expirationTime = TOKEN_VALID_DURATION) {
    const subject = payload.userId;
    delete payload.userId;

    if (!TOKEN_TYPES.includes(payload.tokenType)) {
      // Incorrect value passed for the allowed values of the `tokenType`.
      throw new InternalServerErrorException();
    }
    return jwt.sign(
      {
        ...payload
      },
      this.#jwtSecret,
      {
        subject: `${subject}`,
        expiresIn: `${expirationTime}ms`
      }
    );
  }

  /**
   * @param token {string}
   * @returns {{ sub: number, iat: number, exp: number, tokenType: 'Full' | 'PasswordReset' | 'VerifyRegistration' }}
   */
  decodeToken(token) {
    const decodedToken = jwt.verify(token, this.#jwtSecret);

    if (!TOKEN_TYPES.includes(decodedToken.tokenType)) {
      // Incorrect value passed for the allowed values of the `tokenType`.
      throw new UnauthorizedException();
    }
    return decodedToken;
  }
}
