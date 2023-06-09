import { UserGroupService } from '../services/user_group.service.js';

class UserGroupController {
  /**
   * @param groupIdParam {string}
   * @return {Promise<UserGroupEntity[]>}
   */
  async getById(groupIdParam) {
    console.info(`GroupController - Getting data for Group with ID: '${groupIdParam}'`);

    return await UserGroupService.instance().getAllById(parseInt(groupIdParam));
  }
}

export const userGroupController = new UserGroupController();
