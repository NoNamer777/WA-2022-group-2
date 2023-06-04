import { Op } from 'sequelize';
import { UserEntity } from '../../user/index.js';
import { ChallengeDayEntity } from '../entities/challenge_day.entity.js';
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
    return await UserChallengeEntity.findAll({
      where: {
        challenge_id: {
          [Op.eq]: challengeId.id
        }
      },
      include: [
        {
          model: ChallengeDayEntity
        },
        {
          model: UserEntity,
          attributes: ['username', 'profile_image_path']
        }
      ]
    });
  }
}
export const userChallengeRepository = new UserChallengeRepository();
