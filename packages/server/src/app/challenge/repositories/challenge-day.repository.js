import { ChallengeDayEntity } from '../entities/challenge-day.entity.js';

class ChallengeDayRepository {
  /**
   * @param challengeDayData {{date: Date, userChallengeId: number }}
   * @return {Promise<ChallengeDayEntity>}
   */
  create(challengeDayData) {
    return ChallengeDayEntity.create(challengeDayData);
  }

  /**
   * @param challengeDayId {number}
   * @return {Promise<ChallengeDayEntity | null>}
   */
  async findOneById(challengeDayId) {
    return await ChallengeDayEntity.findOne({
      where: { id: challengeDayId },
      rejectOnEmpty: false
    });
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
