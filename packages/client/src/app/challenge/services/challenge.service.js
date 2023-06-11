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
   * @return {Promise<{concludedChallenges: Array<Challenge>, activeChallenges: Array<Challenge>}>}
   */
  async getAllForUser(userId) {
    return await HttpRequestService.instance().getRequest(`/api/user/${userId}/challenges`);
  }

  /**
   * @param challengeId {number}
   * @return {Promise<{Challenge}>}
   */
  async getById(challengeId) {
    return await HttpRequestService.instance().getRequest(`/api/challenge/${challengeId}`);
  }

  /**
   * @param userId {number}
   * @param challengeData {Challenge}
   * @return {Challenge}
   */
  async create(userId, challengeData) {
    return await HttpRequestService.instance().postRequest(
      `/api/user/${userId}/challenge`,
      challengeData
    );
  }

  /**
   * @param challengeData {Challenge}
   * @param challengeData {Challenge}
   */
  async update(challengeData) {
    return await HttpRequestService.instance().putRequest(
      `/api/challenge/${challengeData.id}`,
      challengeData
    );
  }
}
