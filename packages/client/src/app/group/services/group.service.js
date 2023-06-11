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

  /**
   * @param userId {number}
   * @return {Promise<Group[]>}
   */
  async getAllForUser(userId) {
    return await HttpRequestService.instance().getRequest('/api/user/' + userId + '/groups');
  }
}
