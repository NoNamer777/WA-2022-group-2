import { Sequelize } from 'sequelize';
import { challengeSuggestionRepository } from '../repositories/challenge-suggestion.repository.js';

export class ChallengeSuggestionService {
  /** @return {ChallengeSuggestionService} */
  static instance() {
    if (ChallengeSuggestionService.#instance) return ChallengeSuggestionService.#instance;

    ChallengeSuggestionService.#instance = new ChallengeSuggestionService();
    return ChallengeSuggestionService.#instance;
  }

  /** @type {ChallengeSuggestionService} */
  static #instance;

  /** @return {Promise<ChallengeSuggestionEntity[]>} */
  async getRandom() {
    return await challengeSuggestionRepository.findRandom(Sequelize.literal('rand()'), 5);
  }
}
