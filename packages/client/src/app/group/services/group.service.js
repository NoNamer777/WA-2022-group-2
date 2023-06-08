import { HttpRequestService } from '../../core/index.js';

export class GroupService {
  /** @return {GroupService} */
  static instance() {
    if (GroupService.#instance) return GroupService.#instance;

    GroupService.#instance = new GroupService();
    return GroupService.#instance;
  }
  /** @type {GroupService} */
  static #instance;

  /** @return {Promise<Group[]>} */
  async getAllForUser(userId) {
    return await HttpRequestService.instance().getRequest('/api/user/' + userId + '/group');
  }

  /** @return {Promise<Group>} */
  async createForUser(userId, name) {
    return await HttpRequestService.instance().postRequest('/api/group/', {
      name: name,
      userId: userId
    });
  }

  /** @return {Promise<Group>} */
  async join(userId, code) {
    return await HttpRequestService.instance().postRequest('/api/group/join', {
      code: code,
      userId: userId
    });
  }
}
