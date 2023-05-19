import { HttpRequestService } from './http-request.service';

export class UserService {
  /** @return {UserService} */
  static instance() {
    if (UserService.#instance) return UserService.#instance;

    UserService.#instance = new UserService();
    return UserService.#instance;
  }
  /** @type {UserService} */
  static #instance;

  /** @return {Promise<User[]>} */
  async getAll() {
    return await HttpRequestService.instance().getRequest('/api/user');
  }

  /**
   * @param userId {number}
   * @return {Promise<User>}
   */
  async getById(userId) {
    return await HttpRequestService.instance().getRequest('/api/user/' + userId);
  }

  /**
   * @param userData {User}
   * @return {Promise<User>}
   */
  async create(userData) {
    return await HttpRequestService.instance().postRequest('/api/user', userData);
  }

  /**
   * @param userData {User}
   * @return {Promise<User>}
   */
  async update(userData) {
    return await HttpRequestService.instance().putRequest('/api/user/' + userData.id, userData);
  }

  /**
   * @param userId {number}
   * @return {Promise<void>}
   */
  async delete(userId) {
    return await HttpRequestService.instance().deleteRequest('/api/user/' + userId);
  }
}
