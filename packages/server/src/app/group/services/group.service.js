import { groupRepository } from '../repositories/group.repository.js';

export class GroupService {
  /** @return {GroupService} */
  static instance() {
    if (GroupService.#instance) return GroupService.#instance;

    GroupService.#instance = new GroupService();
    return GroupService.#instance;
  }

  /** @type {GroupService} */
  static #instance;

  /** @return {Promise<GroupEntity[]>} */
  async getForUser(userId) {
    return await groupRepository.findAll(userId);
  }
}
