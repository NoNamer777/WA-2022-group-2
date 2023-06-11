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
   * @param challengeDayData {ChallengeDay}
   */
  async updateChallengeDay(challengeDayData) {
    return await HttpRequestService.instance().putRequest(
      `/api/challenge/day/${challengeDayData.id}`,
      challengeDayData
    );
  }
}
