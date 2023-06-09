import { Sequelize } from 'sequelize';
import { challengeSuggestionRepository } from '../repositories/challenge_suggestion.repository.js';

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
  async getSelection() {
    return await challengeSuggestionRepository.findSelection(Sequelize.literal('rand()'), 5);
  }
}
