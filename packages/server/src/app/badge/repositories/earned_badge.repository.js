import { EarnedBadgeEntity } from '../entities/earned_badge.entity.js';

class EarnedBadgeRepository {
  /** @return {Promise<EarnedBadgeEntity[]>} */
  async findAll() {
    return await EarnedBadgeEntity.findAll();
  }

  /**
   * @param whereClaus {import('sequelize').WhereOptions}
   * @return {Promise<EarnedBadgeEntity | null>}
   */
  async findOneBy(whereClaus) {
    return await EarnedBadgeEntity.findOne({ where: { ...whereClaus }, rejectOnEmpty: false });
  }

  /**
   * @param updatedEarnedBadgeData {EarnedBadgeEntity}
   * @return {Promise<void>}
   */
  async update(updatedEarnedBadgeData) {
    await EarnedBadgeEntity.update(updatedEarnedBadgeData, {
      where: { id: updatedEarnedBadgeData.id }
    });
  }

  /**
   * @param earnedBadgeData {Omit<EarnedBadgeEntity, 'id'>}
   * @return {Promise<EarnedBadgeEntity>}
   */
  create(earnedBadgeData) {
    return EarnedBadgeEntity.create(earnedBadgeData);
  }

  /**
   * @param earnedBadgeId {number}
   * @return {Promise<void>}
   */
  async deleteById(earnedBadgeId) {
    await EarnedBadgeEntity.destroy({ where: { id: earnedBadgeId } });
  }

  /**
   * @param whereClaus
   * @param includeClause
   * @return {Promise<EarnedBadgeEntity[]>}
   */
  async findAllBy(whereClaus, includeClause) {
    return await EarnedBadgeEntity.findAll({
      include: includeClause,
      where: { ...whereClaus },
      rejectOnEmpty: false
    });
  }
}

export const earnedBadgeRepository = new EarnedBadgeRepository();
