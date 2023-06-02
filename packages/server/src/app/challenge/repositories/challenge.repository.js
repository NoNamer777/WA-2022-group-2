import { ChallengeEntity } from '../entities/challenge.entity.js';

class ChallengeRepository {
  /** @return {Promise<ChallengeEntity[]>} */
  async findAll() {
    return await ChallengeEntity.findAll();
  }

  /**
   * @param whereClaus {import('sequelize').WhereOptions}
   * @return {Promise<ChallengeEntity | null>}
   */
  async findOneBy(whereClaus) {
    return await ChallengeEntity.findOne({ where: { ...whereClaus }, rejectOnEmpty: false });
  }

  /**
   * @param updatedChallengeData {ChallengeEntity}
   * @return {Promise<void>}
   */
  async update(updatedChallengeData) {
    await ChallengeEntity.update(updatedChallengeData, { where: { id: updatedChallengeData.id } });
  }

  /**
   * @param challengeData {Omit<ChallengeEntity, 'id'>}
   * @return {Promise<ChallengeEntity>}
   */
  create(challengeData) {
    return ChallengeEntity.create(challengeData);
  }

  /**
   * @param challengeId {number}
   * @return {Promise<void>}
   */
  async deleteById(challengeId) {
    await ChallengeEntity.destroy({ where: { id: challengeId } });
  }

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
