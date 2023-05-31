import { Model } from 'sequelize';
import definition from '../../../db/table-definitions/challenge-suggestion.js';
import { DatabaseService } from '../../core/services/index.js';

export class ChallengeSuggestionEntity extends Model {}

/** @return {void} */
export function initializeChallengeSuggestionEntity() {
  ChallengeSuggestionEntity.init(definition.challengeSuggestionTableDefinition, {
    sequelize: DatabaseService.instance().sequelizeInstance,
    modelName: 'challenge_suggestion',
    tableName: 'challenge_suggestion',
    createdAt: false,
    updatedAt: false
  });
}
