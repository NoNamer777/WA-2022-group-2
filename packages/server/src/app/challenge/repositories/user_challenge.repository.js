import { Op } from 'sequelize';
import { UserChallengeEntity } from '../entities/user_challenge.entity.js';

class UserChallengeRepository {
  /**
   * @param userChallengeData {Omit<UserChallengeEntity, 'id'>}
   * @return {Promise<UserChallengeEntity>}
   */
  create(userChallengeData) {
    return UserChallengeEntity.create(userChallengeData);
  }

  /**
   * @return {Promise<UserChallengeEntity[]>}
   * @param challengeId
   */
  async findAllBy(challengeId) {
    console.log(challengeId);
    return await UserChallengeEntity.findAll({
      where: {
        challenge_id: {
          [Op.eq]: challengeId.id
        }
      }
    });
  }
}
export const userChallengeRepository = new UserChallengeRepository();
