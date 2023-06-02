import { UserChallengeService } from './services/user_challenge.service.js';

class UserChallengeController {
  async create(userChallengeData) {
    console.info('UserChallengeController - Creating a new UserChallenge resources');

    return await UserChallengeService.instance().create(userChallengeData);
  }
}

export const userChallengeController = new UserChallengeController();
