import { ChallengeSuggestionEntity } from '../entities/challenge-suggestion.entity.js';

class ChallengeSuggestionRepository {
  /** @return {Promise<ChallengeSuggestionEntity[]>} */
  async findRandom(order, limit) {
    return await ChallengeSuggestionEntity.findAll({
      order: order,
      limit: limit,
      rejectOnEmpty: false
    });
  }
}

export const challengeSuggestionRepository = new ChallengeSuggestionRepository();
