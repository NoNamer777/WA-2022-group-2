import { NotFoundException } from '../../core/models/index.js';
import { userGroupRepository } from '../repositories/user-group.repository.js';

export class UserGroupService {
  /** @return {UserGroupService} */
  static instance() {
    if (UserGroupService.#instance) return UserGroupService.#instance;

    UserGroupService.#instance = new UserGroupService();
    return UserGroupService.#instance;
  }

  /** @type {UserGroupService} */
  static #instance;

  /**
   * @param groupId {number}
   * @param throwsError {boolean}
   * @return {Promise<UserGroupEntity[]>}
   */
  async getAllUsersOfGroup(groupId, throwsError = true) {
    const usersOfGroup = await userGroupRepository.findAllUsersOfGroup(groupId);

    if (usersOfGroup.length === 0 && throwsError) {
      throw new NotFoundException(
        `Er zijn geen gebruikers gevonden in Groep met het ID: '${groupId}'.`
      );
    }
    return usersOfGroup;
  }
}
