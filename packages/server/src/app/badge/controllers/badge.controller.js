import { BadgeService } from '../services/badge.service.js';

class BadgeController {
  /** @return {Promise<BadgeEntity[]>} */
  async getAll() {
    console.info('BadgeController - Getting all Badges data');

    return await BadgeService.instance().getAll();
  }

  /**
   * @param badgeIdParam {string}
   * @return {Promise<BadgeEntity>}
   */
  async getById(badgeIdParam) {
    console.info(`BadgeController - Getting data for Badge with ID: '${badgeIdParam}'`);

    return await BadgeService.instance().getById(parseInt(badgeIdParam));
  }

  /**
   * @param badgeIdParam {string}
   * @param badgeData {BadgeEntity}
   * @return {Promise<BadgeEntity>}
   */
  async update(badgeIdParam, badgeData) {
    console.info(`BadgeController - Updating Badge resource on path: '${badgeIdParam}'`);

    return await BadgeService.instance().update(badgeData);
  }

  /**
   * @param badgeData {Omit<BadgeEntity, 'id'>}
   * @return {Promise<BadgeEntity>}
   */
  async create(badgeData) {
    console.info('BadgeController - Creating a new Badge resources');

    return await BadgeService.instance().create(badgeData);
  }

  /**
   * @param badgeIdParam {string}
   * @return {Promise<void>}
   */
  async deleteById(badgeIdParam) {
    console.info(`BadgeController - Removing Badge resource with ID: '${badgeIdParam}'`);

    await BadgeService.instance().deleteById(parseInt(badgeIdParam));
  }
}

export const badgeController = new BadgeController();
