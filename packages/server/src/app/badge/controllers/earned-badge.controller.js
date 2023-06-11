import { EarnedBadgeService } from '../services/earned-badge.service.js';

class EarnedBadgeController {
  /** @return {Promise<EarnedBadgeEntity[]>} */
  async getAll() {
    console.info('EarnedBadgeController - Getting all EarnedBadges data');

    return await EarnedBadgeService.instance().getAll();
  }

  /**
   * @param earnedBadgeIdParam {string}
   * @return {Promise<EarnedBadgeEntity>}
   */
  async getById(earnedBadgeIdParam) {
    console.info(
      `EarnedBadgeController - Getting data for EarnedBadge with ID: '${earnedBadgeIdParam}'`
    );

    return await EarnedBadgeService.instance().getById(parseInt(earnedBadgeIdParam));
  }

  /**
   * @param earnedBadgeIdParam {string}
   * @param earnedBadgeData {EarnedBadgeEntity}
   * @return {Promise<EarnedBadgeEntity>}
   */
  async update(earnedBadgeIdParam, earnedBadgeData) {
    console.info(
      `EarnedBadgeController - Updating EarnedBadge resource on path: '${earnedBadgeIdParam}'`
    );

    return await EarnedBadgeService.instance().update(earnedBadgeData);
  }

  /**
   * @param earnedBadgeData {Omit<EarnedBadgeEntity, 'id'>}
   * @return {Promise<EarnedBadgeEntity>}
   */
  async create(earnedBadgeData) {
    console.info('EarnedBadgeController - Creating a new EarnedBadge resources');

    return await EarnedBadgeService.instance().create(earnedBadgeData);
  }

  /**
   * @param earnedBadgeIdParam {string}
   * @return {Promise<void>}
   */
  async deleteById(earnedBadgeIdParam) {
    console.info(
      `EarnedBadgeController - Removing EarnedBadge resource with ID: '${earnedBadgeIdParam}'`
    );

    await EarnedBadgeService.instance().deleteById(parseInt(earnedBadgeIdParam));
  }
}

export const earnedBadgeController = new EarnedBadgeController();
