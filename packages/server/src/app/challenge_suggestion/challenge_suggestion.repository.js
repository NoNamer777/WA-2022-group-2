import { Sequelize } from 'sequelize';
import { ChallengeSuggestionEntity } from './challenge_suggestion.entity.js';

class ChallengeSuggestionRepository {
  /** @return {Promise<ChallengeSuggestionEntity[]>} */
  async findSelection() {
    return await ChallengeSuggestionEntity.findAll({
      order: Sequelize.literal('rand()'),
      limit: 5
    });
  }
}

export const challengeSuggestionRepository = new ChallengeSuggestionRepository();
