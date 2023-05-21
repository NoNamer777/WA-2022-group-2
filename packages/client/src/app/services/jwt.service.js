import jwtDecode from 'jwt-decode';

export class JwtService {
  /** @return {JwtService} */
  static instance() {
    if (JwtService.#instance) return JwtService.#instance;

    JwtService.#instance = new JwtService();
    return JwtService.#instance;
  }

  /** @type {JwtService} */
  static #instance;

  /**
   * @param token {string}
   * @return {import('jwt-decode').JwtPayload}
   */
  decodeToken(token) {
    return jwtDecode(token, import.meta.env.VITE_JWT_SECRET);
  }
}
