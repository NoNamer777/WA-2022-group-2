import { cardResource } from '../resource/card.resource.js';
import { ChallengeService } from '../services/user_challenge.service.js';

class UserChallengeController {
  /** @return {Promise<{pastChallenges: Array, currentChallenges: Array}>} */
  async getForUser(userId) {
    console.info(`UserChallengeController - Getting challenges for User with ID: '${userId}'`);

    const currentChallenges = await ChallengeService.instance().getForUser(userId);
    const pastChallenges = await ChallengeService.instance().getForUser(userId, true);

    return {
      currentChallenges: cardResource(currentChallenges),
      pastChallenges: cardResource(pastChallenges)
    };
  }
}

export const userChallengeController = new UserChallengeController();
