import { ChallengeSuggestionEntity } from '../entities/challenge_suggestion.entity.js';

class ChallengeSuggestionRepository {
  /** @return {Promise<ChallengeSuggestionEntity[]>} */
  async findSelection(order, limit) {
    return await ChallengeSuggestionEntity.findAll({
      order: order,
      limit: limit,
      rejectOnEmpty: false
    });
  }
}

export const challengeSuggestionRepository = new ChallengeSuggestionRepository();
