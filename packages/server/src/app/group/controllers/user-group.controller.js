import { UserGroupService } from '../services/user-group.service.js';

class UserGroupController {
  /**
   * @param groupIdParam {string}
   * @return {Promise<UserGroupEntity[]>}
   */
  async getById(groupIdParam) {
    console.info(`GroupController - Getting data for Group with ID: '${groupIdParam}'`);

    return await UserGroupService.instance().getAllUsersOfGroup(parseInt(groupIdParam));
  }
}

export const userGroupController = new UserGroupController();
