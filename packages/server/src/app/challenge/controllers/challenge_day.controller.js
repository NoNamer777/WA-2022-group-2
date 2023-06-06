import { ChallengeDayService } from '../services/challenge_day.service.js';

class ChallengeDayController {
  /**
   * @param challengeDayIdParam {string}
   * @return {Promise<ChallengeDayEntity>}
   */
  async getById(challengeDayIdParam) {
    console.info(
      `ChallengeDayController - Getting data for Challenge day with ID: '${challengeDayIdParam}'`
    );

    return await ChallengeDayService.instance().getById(parseInt(challengeDayIdParam));
  }

  /**
   * @param challengeDayIdParam {string}
   * @param challengeDayData {ChallengeDayEntity}
   * @param userId {number}
   * @return {Promise<ChallengeDayEntity>}
   */
  async update(challengeDayIdParam, challengeDayData, userId) {
    console.info(
      `ChallengeDayController - Updating Challenge day resource on path: '${challengeDayIdParam}'`
    );

    return await ChallengeDayService.instance().update(
      parseInt(challengeDayIdParam),
      challengeDayData,
      userId
    );
  }
}

export const challengeDayController = new ChallengeDayController();
