import {
  BadgeEntity,
  EarnedBadgeEntity,
  initializeBadgeEntity,
  initializeEarnedBadgeEntity
} from '../../badge/index.js';
import {
  ChallengeDayEntity,
  initializeChallengeDayEntity
} from '../../challenge/entities/challenge-day.entity.js';
import { initializeChallengeSuggestionEntity } from '../../challenge/entities/challenge-suggestion.entity.js';
import {
  ChallengeEntity,
  initializeChallengeEntity
} from '../../challenge/entities/challenge.entity.js';
import {
  UserChallengeEntity,
  initializeUserChallengeEntity
} from '../../challenge/entities/user-challenge.entity.js';
import { GroupEntity, initializeGroupEntity } from '../../group/entities/group.entity.js';
import {
  UserGroupEntity,
  initializeUserGroupEntity
} from '../../group/entities/user-group.entity.js';
import { UserEntity, initializeUserEntity } from '../../user/index.js';

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
    GroupEntity.hasMany(ChallengeEntity, { foreignKey: { name: 'groupId', field: 'group_id' } });
    ChallengeEntity.belongsTo(GroupEntity, { foreignKey: { name: 'groupId', field: 'group_id' } });

    UserEntity.hasMany(UserChallengeEntity, {
      foreignKey: { name: 'userId', field: 'user_id' }
    });
    UserChallengeEntity.belongsTo(UserEntity, {
      foreignKey: { name: 'userId', field: 'user_id' }
    });

    ChallengeEntity.hasMany(UserChallengeEntity, {
      as: 'userChallenges',
      foreignKey: { name: 'challengeId', field: 'challenge_id' }
    });
    UserChallengeEntity.belongsTo(ChallengeEntity, {
      as: 'userChallenges',
      foreignKey: { name: 'challengeId', field: 'challenge_id' }
    });

    UserChallengeEntity.hasMany(ChallengeDayEntity, {
      as: 'challengeDays',
      foreignKey: { name: 'userChallengeId', field: 'user_challenge_id' }
    });
    ChallengeDayEntity.belongsTo(UserChallengeEntity, {
      as: 'challengeDays',
      foreignKey: { name: 'userChallengeId', field: 'user_challenge_id' }
    });

    UserEntity.hasMany(EarnedBadgeEntity, { foreignKey: { name: 'userId', field: 'user_id' } });
    EarnedBadgeEntity.belongsTo(UserEntity, { foreignKey: { name: 'userId', field: 'user_id' } });

    BadgeEntity.hasMany(EarnedBadgeEntity, { foreignKey: { name: 'badgeId', field: 'badge_id' } });
    EarnedBadgeEntity.belongsTo(BadgeEntity, {
      foreignKey: { name: 'badgeId', field: 'badge_id' }
    });

    UserChallengeEntity.hasMany(EarnedBadgeEntity, {
      as: 'userChallengeBadge',
      foreignKey: { name: 'userChallengeId', field: 'user_challenge_id' }
    });
    EarnedBadgeEntity.belongsTo(UserChallengeEntity, {
      as: 'userChallengeBadge',
      foreignKey: { name: 'userChallengeId', field: 'user_challenge_id' }
    });

    UserEntity.belongsToMany(GroupEntity, {
      through: UserGroupEntity,
      foreignKey: { name: 'userId', field: 'user_id' }
    });
    GroupEntity.belongsToMany(UserEntity, {
      through: UserGroupEntity,
      foreignKey: { name: 'groupId', field: 'group_id' }
    });

    GroupEntity.hasMany(UserGroupEntity, { foreignKey: { name: 'groupId', field: 'group_id' } });
    UserEntity.hasMany(UserGroupEntity, { foreignKey: { name: 'userId', field: 'user_id' } });

    GroupEntity.hasMany(UserGroupEntity, { foreignKey: { name: 'groupId', field: 'group_id' } });
    UserGroupEntity.belongsTo(GroupEntity, { foreignKey: { name: 'groupId', field: 'group_id' } });

    UserEntity.hasMany(UserGroupEntity, { foreignKey: { name: 'userId', field: 'user_id' } });
    UserGroupEntity.belongsTo(UserEntity, { foreignKey: { name: 'userId', field: 'user_id' } });

    UserEntity.belongsToMany(BadgeEntity, {
      through: EarnedBadgeEntity,
      foreignKey: { name: 'userId', field: 'user_id' }
    });
    BadgeEntity.belongsToMany(UserEntity, {
      through: EarnedBadgeEntity,
      foreignKey: { name: 'badgeId', field: 'badge_id' }
    });
  }
}
