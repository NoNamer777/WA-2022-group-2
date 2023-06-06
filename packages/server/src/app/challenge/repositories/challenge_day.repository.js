import { ChallengeDayEntity } from '../entities/challenge_day.entity.js';

class ChallengeDayRepository {
  /**
   * @param whereClaus {import('sequelize').WhereOptions}
   * @return {Promise<ChallengeDayEntity | null>}
   */
  async findOneBy(whereClaus) {
    return await ChallengeDayEntity.findOne({ where: { ...whereClaus }, rejectOnEmpty: false });
  }
  /**
   * @param updatedChallengeDayData {ChallengeDayEntity}
   * @return {Promise<void>}
   */
  async update(updatedChallengeDayData) {
    await ChallengeDayEntity.update(updatedChallengeDayData, {
      where: { id: updatedChallengeDayData.id }
    });
  }
}

export const challengeDayRepository = new ChallengeDayRepository();
