import { HttpRequestService } from '../../core/index.js';

export class ChallengeSuggestionService {
  /** @return {ChallengeSuggestionService} */
  static instance() {
    if (ChallengeSuggestionService.#instance) return ChallengeSuggestionService.#instance;

    ChallengeSuggestionService.#instance = new ChallengeSuggestionService();
    return ChallengeSuggestionService.#instance;
  }
  /** @type {ChallengeSuggestionService} */
  static #instance;

  /** @return {Promise<ChallengeSuggestion[]>} */
  async getSelection() {
    return await HttpRequestService.instance().getRequest('/api/challenge/suggestion');
  }
}
