import { HttpRequestService } from './http-request.service'
import { StorageService } from './storage.service'

export class AuthService {
  /** @return {AuthService} */
  static instance() {
    if (AuthService.#instance) return AuthService.#instance

    AuthService.#instance = new AuthService()
    return AuthService.#instance
  }

  /** @type {AuthService} */
  static #instance

  /**
   * @param username {string}
   * @param password {string}
   * @return {Promise<User>}
   */
  async login(username, password) {
    return await HttpRequestService.instance().postRequest('/auth/login', { username, password })
  }

  /**
   * @param userData {Omit<User, 'id' | 'isAdmin'> & { passwordConfirm: string }}
   * @return {Promise<User>}
   */
  async register(userData) {
    if (userData.password !== userData.passwordConfirm) {
      throw new Error('Het bevestigde wachtwoord komt niet overeen met je opgegeven wachtwoord')
    }
    return await HttpRequestService.instance().postRequest('/auth/register', userData)
  }

  /**
   * @return {void}
   */
  logout() {
    StorageService.instance().removeItem('jwt-token')
  }
}
