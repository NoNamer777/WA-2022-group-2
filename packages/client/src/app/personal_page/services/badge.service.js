import { HttpRequestService } from '../../core/index.js';

export class BadgeService {
  /** @return {BadgeService} */
  static instance() {
    if (BadgeService.#instance) return BadgeService.#instance;

    BadgeService.#instance = new BadgeService();
    return BadgeService.#instance;
  }

  /** @type {BadgeService} */
  static #instance;

  /**
   * @param userId {number}
   * @return {Promise<{badges: Array}>}
   */
  async getBadges(userId) {
    return await HttpRequestService.instance().getRequest(`/api/user/${userId}/badges`);
  }
}
