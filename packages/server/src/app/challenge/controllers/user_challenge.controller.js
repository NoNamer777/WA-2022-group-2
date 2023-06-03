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
      `UserChallengeController - Getting data for UserChallenge with ID: '${challengeIdParam}'`
    );

    return await UserChallengeService.instance().getAllById(parseInt(challengeIdParam));
  }
}

export const userChallengeController = new UserChallengeController();
