import { UserChallengeEntity } from '../entities/user_challenge.entity.js';

class UserChallengeRepository {
  /**
   * @param whereClaus {import('sequelize').WhereOptions}
   * @param includeClause {{model: ChallengeEntity, where: ({start_date: {}}|{start_date: {}})}}
   * @return {Promise<UserChallengeEntity>}
   */
  async findAllBy(whereClaus, includeClause) {
    return await UserChallengeEntity.findOne({
      include: [includeClause],
      where: { ...whereClaus },
      rejectOnEmpty: false
    });
  }
}

export const userChallengeRepository = new UserChallengeRepository();
