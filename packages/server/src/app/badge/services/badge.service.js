import { Op, Sequelize } from 'sequelize';
import { NotFoundException } from '../../core/models/index.js';
import { badgeRepository } from '../repositories/badge.repository.js';

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
   * @param badgeId {number}
   * @param throwsError {boolean}
   * @return {Promise<BadgeEntity>}
   */
  async getById(badgeId, throwsError = true) {
    // TODO: change to findOneBy?
    const badgeById = await badgeRepository.findOneWithOrder({ id: badgeId }, '');

    if (!badgeById && throwsError) {
      throw new NotFoundException(`Er is geen badge gevonden met het ID: '${badgeId}'.`);
    }
    return badgeById;
  }

  async getRandomBadge(userBadgeIds) {
    return badgeRepository.findOneWithOrder(
      {
        id: { [Op.notIn]: userBadgeIds }
      },
      Sequelize.literal('rand()')
    );
  }
}
