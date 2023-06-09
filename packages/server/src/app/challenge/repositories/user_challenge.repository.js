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
   * @param whereClaus
   * @param includeClause
   */
  async findAllBy(whereClaus, includeClause) {
    return await UserChallengeEntity.findAll({
      where: { ...whereClaus },
      include: includeClause
    });
  }

  /**
   * @param whereClaus {import('sequelize').WhereOptions}
   * @return {Promise<UserChallengeEntity | null>}
   */
  async findOneBy(whereClaus) {
    return await UserChallengeEntity.findOne({ where: { ...whereClaus }, rejectOnEmpty: false });
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
