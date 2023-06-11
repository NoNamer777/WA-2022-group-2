import { BadgeEntity } from '../entities/badge.entity.js';

class BadgeRepository {
  /**
   * @param whereClaus {import('sequelize').WhereOptions}
   * @param order
   * @return {Promise<BadgeEntity | null>}
   */
  async findOneWithOrder(whereClaus, order) {
    return await BadgeEntity.findOne({
      where: { ...whereClaus },
      order: order,
      rejectOnEmpty: false
    });
  }
}

export const badgeRepository = new BadgeRepository();
