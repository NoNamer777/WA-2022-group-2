import { BadgeEntity, initializeBadgeEntity } from '../../badge/badge.entity.js';
import { ChallengeEntity, initializeChallengeEntity } from '../../challenge/challenge.entity.js';
import {
  ChallengeDayEntity,
  initializeChallengeDayEntity
} from '../../challenge_day/challenge_day.entity.js';
import { initializeChallengeSuggestionEntity } from '../../challenge_suggestion/challenge_suggestion.entity.js';
import {
  EarnedBadgeEntity,
  initializeEarnedBadgeEntity
} from '../../earned_badge/earned_badge.entity.js';
import { GroupEntity, initializeGroupEntity } from '../../group/group.entity.js';
import { UserEntity, initializeUserEntity } from '../../user/index.js';
import {
  UserChallengeEntity,
  initializeUserChallengeEntity
} from '../../user_challenge/user_challenge.entity.js';
import { UserGroupEntity, initializeUserGroupEntity } from '../../user_group/user_group.entity.js';

export class EntityService {
  /** @return {EntityService} */
  static instance() {
    if (EntityService.#instance) return EntityService.#instance;

    EntityService.#instance = new EntityService();
    return this.#instance;
  }

  /** @type {EntityService} */
  static #instance;

  initializeEntities() {
    initializeUserEntity();
    initializeGroupEntity();
    initializeUserGroupEntity();
    initializeChallengeEntity();
    initializeBadgeEntity();
    initializeUserChallengeEntity();
    initializeChallengeDayEntity();
    initializeEarnedBadgeEntity();
    initializeChallengeSuggestionEntity();
  }

  initializeEntityRelations() {
    BadgeEntity.hasMany(UserChallengeEntity, { foreignKey: 'badge_id' });
    UserChallengeEntity.belongsTo(BadgeEntity, { foreignKey: 'badge_id' });

    GroupEntity.hasMany(ChallengeEntity, { foreignKey: 'group_id' });
    ChallengeEntity.belongsTo(GroupEntity, { foreignKey: 'group_id' });

    UserEntity.hasMany(UserChallengeEntity, { foreignKey: 'user_id' });
    UserChallengeEntity.belongsTo(UserEntity, { foreignKey: 'user_id' });

    ChallengeEntity.hasMany(UserChallengeEntity, { foreignKey: 'challenge_id' });
    UserChallengeEntity.belongsTo(ChallengeEntity, { foreignKey: 'challenge_id' });

    UserChallengeEntity.hasMany(ChallengeDayEntity, { foreignKey: 'user_challenge_id' });
    ChallengeDayEntity.belongsTo(UserChallengeEntity, { foreignKey: 'user_challenge_id' });

    UserEntity.hasMany(EarnedBadgeEntity, { foreignKey: 'user_id' });
    EarnedBadgeEntity.belongsTo(UserEntity, { foreignKey: 'user_id' });

    BadgeEntity.hasMany(EarnedBadgeEntity, { foreignKey: 'badge_id' });
    EarnedBadgeEntity.belongsTo(BadgeEntity, { foreignKey: 'badge_id' });

    UserChallengeEntity.hasMany(EarnedBadgeEntity, { foreignKey: 'user_challenge_id' });
    EarnedBadgeEntity.belongsTo(UserChallengeEntity, { foreignKey: 'user_challenge_id' });

    UserEntity.belongsToMany(GroupEntity, { through: UserGroupEntity, foreignKey: 'user_id' });
    GroupEntity.belongsToMany(UserEntity, { through: UserGroupEntity, foreignKey: 'group_id' });

    GroupEntity.hasMany(UserGroupEntity, { foreignKey: 'group_id' });
    UserEntity.hasMany(UserGroupEntity, { foreignKey: 'user_id' });
  }
}
