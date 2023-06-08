import { BadgeEntity } from '../entities/badge.entity.js';

class BadgeRepository {
  /** @return {Promise<BadgeEntity[]>} */
  async findAll() {
    return await BadgeEntity.findAll();
  }

  /**
   * @param whereClaus {import('sequelize').WhereOptions}
   * @param includeClause
   * @return {Promise<BadgeEntity | null>}
   */
  async findOneBy(whereClaus, includeClause = {}) {
    return await BadgeEntity.findOne({
      include: includeClause,
      where: { ...whereClaus },
      rejectOnEmpty: false
    });
  }

  /**
   * @param updatedBadgeData {BadgeEntity}
   * @return {Promise<void>}
   */
  async update(updatedBadgeData) {
    await BadgeEntity.update(updatedBadgeData, { where: { id: updatedBadgeData.id } });
  }

  /**
   * @param badgeData {Omit<BadgeEntity, 'id'>}
   * @return {Promise<BadgeEntity>}
   */
  create(badgeData) {
    return BadgeEntity.create(badgeData);
  }

  /**
   * @param badgeId {number}
   * @return {Promise<void>}
   */
  async deleteById(badgeId) {
    await BadgeEntity.destroy({ where: { id: badgeId } });
  }
}

export const badgeRepository = new BadgeRepository();
