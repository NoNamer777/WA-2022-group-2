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
   * @return {Promise<{pastChallenges: Array, currentChallenges: Array}>}
   */
  async getUserChallengesById(challengeId) {
    return await HttpRequestService.instance().getRequest(`/api/challenge/${challengeId}/members`);
  }
}
