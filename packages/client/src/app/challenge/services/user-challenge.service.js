import { HttpRequestService } from '../../core/index.js';

export class UserChallengeService {
  /** @return {UserChallengeService} */
  static instance() {
    if (UserChallengeService.#instance) return UserChallengeService.#instance;

    UserChallengeService.#instance = new UserChallengeService();
    return UserChallengeService.#instance;
  }

  /** @type {UserChallengeService} */
  static #instance;

  /**
   * @param challengeId {number}
   * @return {Promise<UserChallenge[]>}
   */
  async getUserChallengesById(challengeId) {
    return await HttpRequestService.instance().getRequest(`/api/challenge/${challengeId}/members`);
  }

  /**
   * @param userChallengeId {number}
   * @param userChallengeData {UserChallenge}
   * @return {Promise<Badge>}
   */
  async completeUserChallenge(userChallengeId, userChallengeData) {
    return await HttpRequestService.instance().putRequest(
      `/api/userChallenge/${userChallengeId}`,
      userChallengeData
    );
  }

  /**
   * @param userChallengeId {number}
   */
  async deleteUserChallenge(userChallengeId) {
    return await HttpRequestService.instance().deleteRequest(
      `/api/userchallenge/${userChallengeId}`
    );
  }
}
