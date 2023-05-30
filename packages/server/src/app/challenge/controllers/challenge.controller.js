import { UserChallengeService } from '../services/user_challenge.service.js';

class UserChallengeController {
  /** @return {Promise<{pastChallenges: UserChallengeEntity[], currentChallenges: UserChallengeEntity[]}>} */
  async getForUser(userId) {
    console.info(`UserChallengeController - Getting data for User with ID: '${userId}'`);

    return {
      currentChallenges: await UserChallengeService.instance().getForUser(userId),
      pastChallenges: await UserChallengeService.instance().getForUser(userId, true)
    };
  }
}

export const userChallengeController = new UserChallengeController();
