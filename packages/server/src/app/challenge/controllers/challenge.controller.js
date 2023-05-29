import { UserChallengeService } from '../services/user_challenge.service.js';

class UserChallengeController {
  /** @return {Promise<{pastChallenges: UserChallengeEntity[], currentChallenges: UserChallengeEntity[]}>} */
  async getForUser(userIdParam) {
    console.info(`UserChallengeController - Getting data for User with ID: '${userIdParam}'`);

    const currentChallenges = await UserChallengeService.instance().getForUser(
      parseInt(userIdParam)
    );

    const pastChallenges = await UserChallengeService.instance().getForUser(
      parseInt(userIdParam),
      true
    );

    return { currentChallenges, pastChallenges };
  }
}

export const userChallengeController = new UserChallengeController();
