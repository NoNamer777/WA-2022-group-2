import { UserChallengeService } from '../services/user-challenge.service.js';

class UserChallengeController {
  /**
   * @param challengeIdParam {string}
   * @param userId {number}
   * @return {Promise<UserChallengeEntity[]>}
   */
  async getAllById(challengeIdParam, userId) {
    console.info(
      `UserChallengeController - Getting data for User Challenges with Challenge ID: '${challengeIdParam}'`
    );
    return await UserChallengeService.instance().getAllOfChallenge(
      parseInt(challengeIdParam),
      userId
    );
  }

  /**
   * @param challengeData {ChallengeEntity}
   * @param userId {number}
   * @return {Promise<ChallengeEntity>}
   */
  async createChallenges(challengeData, userId) {
    return await UserChallengeService.instance().startChallenge(challengeData, userId);
  }

  /**
   * @param userChallengeIdParam {string}
   * @param userChallengeData {UserChallengeEntity}
   * @param userId {number}
   * @return {Promise<BadgeEntity>}
   */
  async complete(userChallengeIdParam, userChallengeData, userId) {
    console.info(
      `UserChallengeController - Completing User Challenge with id: '${userChallengeIdParam}'`
    );

    return await UserChallengeService.instance().complete(
      parseInt(userChallengeIdParam),
      userChallengeData,
      userId
    );
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
