import { GroupService } from '../services/group.service.js';

class GroupController {
  /** @return {Promise<GroupEntity[]>} */
  async getAll(userId) {
    return await GroupService.instance().getForUser(userId);
  }
}

export const groupController = new GroupController();
