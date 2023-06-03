import { NotFoundException } from '../../core/models/index.js';
import { userGroupRepository } from '../user_group.repository.js';

export class UserGroupService {
  /** @return {UserGroupService} */
  static instance() {
    if (UserGroupService.#instance) return UserGroupService.#instance;

    UserGroupService.#instance = new UserGroupService();
    return UserGroupService.#instance;
  }

  /** @type {UserGroupService} */
  static #instance;

  async getAllById(groupId, throwsError = true) {
    const groupById = await userGroupRepository.findAllBy({ id: groupId });

    if (!groupId && throwsError) {
      throw new NotFoundException(`Er is geen groep gevonden met het ID: '${groupId}'.`);
    }
    return groupById;
  }
}
