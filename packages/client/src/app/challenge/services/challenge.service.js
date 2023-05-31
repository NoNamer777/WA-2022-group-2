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
   * @return {Promise<Array>}
   */
  async getChallenges() {
    return await HttpRequestService.instance().getRequest('/api/challenge');
  }
}
