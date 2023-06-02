import { HttpRequestService } from '../../core/index.js';

export class ChallengeService {
  /** @return {ChallengeService} */
  static instance() {
    if (ChallengeService.#instance) return ChallengeService.#instance;

    ChallengeService.#instance = new ChallengeService();
    return ChallengeService.#instance;
  }

  /** @type {ChallengeService} */
  static #instance;

  /**
   * @param userId {number}
   * @return {Promise<{pastChallenges: Array, currentChallenges: Array}>}
   */
  async getChallenges(userId) {
    return await HttpRequestService.instance().getRequest(`/api/user/${userId}/challenges`);
  }

  async postChallenge(userId, challengeData) {
    return await HttpRequestService.instance().postRequest(
      `/api/user/${userId}/challenge`,
      challengeData
    );
  }
}
