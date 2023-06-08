import { generateRandomCode } from '../../core/helpers/code-generator.helper.js';
import { BadRequestException } from '../../core/models/index.js';
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
    const user = await UserService.instance().getById(parseInt(groupData.userId));

    await user.addGroup(group);

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

  /**
   * @param groupData {Omit<GroupEntity, 'id'>}
   * @return {Promise<GroupEntity>}
   */
  async joinByCode(groupData) {
    console.info('GroupController - Joining a Group');

    const group = await GroupService.instance().getByCode(groupData.code);
    const user = await UserService.instance().getById(parseInt(groupData.userId));

    // Check if the user is already connected to the group
    const userHasGroup = await user.hasGroup(group);

    // If the connection already exists, throw an error
    if (userHasGroup) {
      throw new BadRequestException('Je bent al lid van groep' + group.name);
    }

    await user.addGroup(group);

    return group;
  }
}

export const groupController = new GroupController();
