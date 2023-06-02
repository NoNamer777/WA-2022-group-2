import { UserChallengeEntity } from './entities/user_challenge.entity.js';

class UserChallengeRepository {
  /**
   * @param userChallengeData {Omit<UserChallengeEntity, 'id'>}
   * @return {Promise<UserChallengeEntity>}
   */
  create(userChallengeData) {
    return UserChallengeEntity.create(userChallengeData);
  }
}
export const userChallengeRepository = new UserChallengeRepository();
