import { HttpRequestService } from '../../core/index.js';

export class AuthService {
  /** @return {AuthService} */
  static instance() {
    if (AuthService.#instance) return AuthService.#instance;

    AuthService.#instance = new AuthService();
    return AuthService.#instance;
  }

  /** @type {AuthService} */
  static #instance;

  /**
   * @param username {string}
   * @param password {string}
   * @return {Promise<User>}
   */
  async login(username, password) {
    return await HttpRequestService.instance().postRequest('/auth/login', { username, password });
  }

  /**
   * @param formData {Omit<User, 'id' | 'isAdmin'> & { passwordConfirm: string }}
   * @return {Promise<User>}
   */
  async register(formData) {
    return await HttpRequestService.instance().postRequest('/auth/register', formData);
  }

  /**
   * @param username {string}
   * @return {Promise<void>}
   */
  async requestPasswordReset(username) {
    return await HttpRequestService.instance().postRequest('/auth/request-password-reset', {
      username: username
    });
  }

  /**
   * @return {void}
   */
  logout() {
    localStorage.removeItem('jwt-token');
  }
}
