import { ChallengeEntity } from '../entities/challenge.entity.js';

class ChallengeRepository {
  /**
   * @param whereClaus {{start_date: {}}|{end_date: {}}}
   * @param includeClause {{model: ChallengeEntity, where: ({start_date: {}}|{start_date: {}})}}
   * @return {Promise<ChallengeEntity[]>}
   */
  async findAllBy(whereClaus, includeClause) {
    return await ChallengeEntity.findAll({
      include: includeClause,
      where: { ...whereClaus },
      rejectOnEmpty: false
    });
  }
}

export const challengeRepository = new ChallengeRepository();
