import { EarnedBadgeService } from '../badge/services/earned_badge.service.js';
import { ChallengeService } from '../challenge/services/challenge.service.js';
import { GroupService } from '../group/services/group.service.js';
import { UserService } from './services/user.service.js';

class UserController {
  /** @return {Promise<UserEntity[]>} */
  async getAll() {
    console.info('UserController - Getting all Users data');

    return await UserService.instance().getAll();
  }

  /**
   * @param userIdParam {string}
   * @return {Promise<UserEntity>}
   */
  async getById(userIdParam) {
    console.info(`UserController - Getting data for User with ID: '${userIdParam}'`);

    return await UserService.instance().getById(parseInt(userIdParam));
  }

  /**
   * @param userIdParam {string}
   * @param userData {UserEntity}
   * @return {Promise<UserEntity>}
   */
  async update(userIdParam, userData) {
    console.info(`UserController - Updating User resource on path: '${userIdParam}'`);

    return await UserService.instance().update(userData);
  }

  /**
   * @param userData {Omit<UserEntity, 'id'>}
   * @return {Promise<UserEntity>}
   */
  async create(userData) {
    console.info('UserController - Creating a new User resources');

    return await UserService.instance().create(userData);
  }

  /**
   * @param userIdParam {string}
   * @return {Promise<void>}
   */
  async deleteById(userIdParam) {
    console.info(`UserController - Removing User resource with ID: '${userIdParam}'`);

    await UserService.instance().deleteById(parseInt(userIdParam));
  }

  /**
   * @param userId {number}
   * @return {Promise<{activeChallenges: Array<ChallengeEntity>, concludedChallenges: Array<ChallengeEntity>}>} */
  async getChallengesForUser(userId) {
    console.info(`UserController - Getting challenges for User with ID: '${userId}'`);

    return {
      activeChallenges: await ChallengeService.instance().getForUser(userId),
      concludedChallenges: await ChallengeService.instance().getForUser(userId, 'concluded')
    };
  }

  /** @return {Promise<EarnedBadgeEntity[]>} */
  async getBadgesForUser(userId) {
    console.info(`UserController - Getting badges for User with ID: '${userId}'`);

    return await EarnedBadgeService.instance().getForUser(userId);
  }

  /** @return {Promise<GroupEntity[]>} */
  async getGroupsForUser(userId) {
    return await GroupService.instance().getForUser(userId);
  }
}

export const userController = new UserController();
