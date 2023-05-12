import { HttpRequestService } from './http-request.service'

export class UserService {
  static instance() {
    if (UserService.#instance) return UserService.#instance

    UserService.#instance = new UserService()
    return UserService.#instance
  }
  static #instance

  async getAll() {
    return await HttpRequestService.instance().getRequest('/api/user')
  }

  async getById(userId) {
    return await HttpRequestService.instance().getRequest('/api/user/' + userId)
  }

  async create(userData) {
    return await HttpRequestService.instance().postRequest('/api/user', userData)
  }

  async update(userData) {
    return await HttpRequestService.instance().putRequest('/api/user/' + userData.id, userData)
  }

  async delete(userId) {
    return await HttpRequestService.instance().deleteRequest('/api/user/' + userId)
  }
}
