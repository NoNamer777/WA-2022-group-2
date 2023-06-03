import { ChallengeSuggestionService } from '../services/challenge_suggestion.service.js';

class ChallengeSuggestionController {
  /** @return {Promise<ChallengeSuggestionEntity[]>} */
  async getAll() {
    return await ChallengeSuggestionService.instance().getSelection();
  }
}

export const challengeSuggestionController = new ChallengeSuggestionController();
