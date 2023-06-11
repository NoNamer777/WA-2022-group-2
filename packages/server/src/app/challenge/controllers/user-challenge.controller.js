import { UnauthorizedException } from '../../auth/models/errors/unauthorized-exception.js';
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
    const userChallengesByChallengeId = await UserChallengeService.instance().getAllOfChallenge(
      parseInt(challengeIdParam)
    );
    let authorized = false;

    for (const userChallenge of userChallengesByChallengeId) {
      if (userChallenge.user.id !== userId) continue;
      if (authorized) break;

      authorized = true;
    }
    if (!authorized) {
      throw new UnauthorizedException('Sorry, je hebt geen rechten om deze challenge te bekijken.');
    }
    return userChallengesByChallengeId;
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
