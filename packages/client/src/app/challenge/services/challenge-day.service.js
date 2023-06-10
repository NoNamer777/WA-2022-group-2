import { HttpRequestService } from '../../core/index.js';

export class ChallengeDayService {
  /** @return {ChallengeDayService} */
  static instance() {
    if (ChallengeDayService.#instance) return ChallengeDayService.#instance;

    ChallengeDayService.#instance = new ChallengeDayService();
    return ChallengeDayService.#instance;
  }

  /** @type {ChallengeDayService} */
  static #instance;

  /**
   * @param challengeDayId {number}
   */
  async updateChallengeDay(challengeDayId, challengeDayData) {
    return await HttpRequestService.instance().putRequest(
      `/api/challenge/day/${challengeDayId}`,
      challengeDayData
    );
  }
}
