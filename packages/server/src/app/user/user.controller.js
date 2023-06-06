import { BadgeService } from '../badge/services/badge.service.js';
import { ChallengeService } from '../challenge/services/challenge.service.js';
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

  /** @return {Promise<{pastChallenges: Array, currentChallenges: Array}>} */
  async getChallengesForUser(userId) {
    console.info(`UserController - Getting challenges for User with ID: '${userId}'`);

    return {
      currentChallenges: await ChallengeService.instance().getForUser(userId),
      pastChallenges: await ChallengeService.instance().getForUser(userId, true)
    };
  }

  /** @return {Promise<{badges: Array}>} */
  async getBadgesForUser(userId) {
    console.info(`UserController - Getting challenges for User with ID: '${userId}'`);

    return {
      badges: await BadgeService.instance().getForUser(userId)
    };
  }
}

export const userController = new UserController();
