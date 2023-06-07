import { generateRandomCode } from '../../core/helpers/code-generator.helper.js';
import { UserService } from '../../user/index.js';
import { GroupService } from '../services/group.service.js';

class GroupController {
  /** @return {Promise<GroupEntity[]>} */
  async getAll() {
    console.info('GroupController - Getting all Groups data');

    return await GroupService.instance().getAll();
  }

  /**
   * @param groupIdParam {string}
   * @return {Promise<GroupEntity>}
   */
  async getById(groupIdParam) {
    console.info(`GroupController - Getting data for Group with ID: '${groupIdParam}'`);

    return await GroupService.instance().getById(parseInt(groupIdParam));
  }

  /**
   * @param groupIdParam {string}
   * @param groupData {GroupEntity}
   * @return {Promise<GroupEntity>}
   */
  async update(groupIdParam, groupData) {
    console.info(`GroupController - Updating Group resource on path: '${groupIdParam}'`);

    return await GroupService.instance().update(groupData);
  }

  /**
   * @param groupData {Omit<GroupEntity, 'id'>}
   * @return {Promise<GroupEntity>}
   */
  async create(groupData) {
    console.info('GroupController - Creating a new Group resources');
    groupData.code = generateRandomCode(14);

    const group = await GroupService.instance().create(groupData);
    const user = await UserService.instance().getById(parseInt(groupData.user_id));

    await user.setGroup(group);

    return group;
  }

  /**
   * @param groupIdParam {string}
   * @return {Promise<void>}
   */
  async deleteById(groupIdParam) {
    console.info(`GroupController - Removing Group resource with ID: '${groupIdParam}'`);

    await GroupService.instance().deleteById(parseInt(groupIdParam));
  }
}

export const groupController = new GroupController();
