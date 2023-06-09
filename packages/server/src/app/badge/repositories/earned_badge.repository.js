import { EarnedBadgeEntity } from '../entities/earned_badge.entity.js';

class EarnedBadgeRepository {
  /**
   * @param whereClaus
   * @return {Promise<EarnedBadgeEntity[]>}
   */
  async findAllBy(whereClaus) {
    return await EarnedBadgeEntity.findAll({
      where: whereClaus,
      rejectOnEmpty: false
    });
  }
}

export const earnedBadgeRepository = new EarnedBadgeRepository();
