import { UserEntity } from '../../user/index.js';
import { ChallengeEntity } from '../entities/challenge.entity.js';
import { UserChallengeEntity } from '../entities/user-challenge.entity.js';

class UserChallengeRepository {
  /**
   * @param userChallengeData {Omit<UserChallengeEntity, 'id' | 'completed'>}
   * @return {Promise<UserChallengeEntity>}
   */
  create(userChallengeData) {
    return UserChallengeEntity.create(userChallengeData);
  }

  /**
   * @return {Promise<UserChallengeEntity[]>}
   * @param whereClaus
   * @param includeClause
   */
  async findAllBy(whereClaus, includeClause) {
    return await UserChallengeEntity.findAll({
      where: { ...whereClaus },
      include: includeClause,
      attributes: ['id', 'completed']
    });
  }

  /**
   * @param whereClaus {import('sequelize').WhereOptions}
   * @return {Promise<UserChallengeEntity | null>}
   */
  async findOneBy(whereClaus) {
    return await UserChallengeEntity.findOne({
      where: { ...whereClaus },
      include: [UserEntity, { as: 'userChallenges', model: ChallengeEntity }],
      rejectOnEmpty: false
    });
  }

  /**
   * @param userChallengeId {number}
   * @return {Promise<void>}
   */
  async deleteById(userChallengeId) {
    await UserChallengeEntity.destroy({ where: { id: userChallengeId } });
  }
}
export const userChallengeRepository = new UserChallengeRepository();
