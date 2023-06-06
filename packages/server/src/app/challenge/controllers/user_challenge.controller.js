import { UserChallengeService } from '../services/user_challenge.service.js';

class UserChallengeController {
  async create(userChallengeData) {
    console.info('UserChallengeController - Creating a new UserChallenge resources');

    return await UserChallengeService.instance().create(userChallengeData);
  }

  /**
   * @param challengeIdParam {string}
   * @return {Promise<UserChallengeEntity[]>}
   */
  async getAllById(challengeIdParam) {
    console.info(
      `UserChallengeController - Getting data for UserChallenge with Challenge ID: '${challengeIdParam}'`
    );

    return await UserChallengeService.instance().getAllById(parseInt(challengeIdParam));
  }

  /**
   * @param userChallengeIdParam {string}
   * @param userId
   * @return {Promise<void>}
   */
  async deleteById(userChallengeIdParam, userId) {
    console.info(
      `UserChallengeController - Removing Challenge resource with ID: '${userChallengeIdParam}'`
    );

    await UserChallengeService.instance().deleteById(parseInt(userChallengeIdParam), userId);
  }
}

export const userChallengeController = new UserChallengeController();
