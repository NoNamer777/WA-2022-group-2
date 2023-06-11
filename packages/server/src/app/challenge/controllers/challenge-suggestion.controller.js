import { ChallengeSuggestionService } from '../services/challenge-suggestion.service.js';

class ChallengeSuggestionController {
  /** @return {Promise<ChallengeSuggestionEntity[]>} */
  async getRandomSuggestions() {
    return await ChallengeSuggestionService.instance().getRandom();
  }
}

export const challengeSuggestionController = new ChallengeSuggestionController();
