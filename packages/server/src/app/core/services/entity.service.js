import { BadgeEntity, initializeBadgeEntity } from '../../badge/badge.entity.js';
import { ChallengeEntity, initializeChallengeEntity } from '../../challenge/challenge.entity.js';
import {
  ChallengeDayEntity,
  initializeChallengeDayEntity
} from '../../challenge_day/challenge_day.entity.js';
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
  }

  initializeEntityRelations() {
    // User associations
    UserEntity.belongsToMany(GroupEntity, { through: UserGroupEntity, foreignKey: 'user_id' });
    UserEntity.belongsToMany(ChallengeEntity, {
      through: UserChallengeEntity,
      foreignKey: 'user_id'
    });
    UserEntity.belongsToMany(BadgeEntity, { through: EarnedBadgeEntity, foreignKey: 'user_id' });

    // Group associations
    GroupEntity.belongsToMany(UserEntity, { through: UserGroupEntity, foreignKey: 'group_id' });

    // Challenge associations
    ChallengeEntity.belongsTo(GroupEntity, { foreignKey: 'group_id' });
    ChallengeEntity.belongsToMany(UserEntity, {
      through: UserChallengeEntity,
      foreignKey: 'challenge_id'
    });

    // Badge associations
    BadgeEntity.belongsToMany(UserEntity, { through: UserChallengeEntity, foreignKey: 'badge_id' });

    // ChallengeDay associations
    ChallengeDayEntity.belongsTo(UserChallengeEntity, { foreignKey: 'user_challenge_id' });

    // EarnedBadge associations
    EarnedBadgeEntity.belongsTo(UserChallengeEntity, { foreignKey: 'user_challenge_id' });
  }
}
