import { HttpRequestService } from './http-request.service'

export class AuthService {
  static instance() {
    if (AuthService.#instance) return AuthService.#instance

    AuthService.#instance = new AuthService()
    return AuthService.#instance
  }

  static #instance

  async login(username, password) {
    return await HttpRequestService.instance().postRequest('/auth/login', { username, password })
  }

  async register(userData) {
    if (userData.password !== userData.passwordConfirm) {
      throw new Error('Het bevestigde wachtwoord komt niet overeen met je opgegeven wachtwoord')
    }
    return await HttpRequestService.instance().postRequest('/auth/register', userData)
  }

  async logout() {
    return await HttpRequestService.instance().postRequest('/auth/logout', {})
  }
}
