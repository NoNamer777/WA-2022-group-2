import { NotFoundException } from '../../core/models/index.js';
import { UserEntity } from '../../user/index.js';
import { EarnedBadgeEntity } from '../entities/earned_badge.entity.js';
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

  /** @return {Promise<BadgeEntity[]>} */
  async getAll() {
    return await badgeRepository.findAll();
  }

  /**
   * @param badgeId {number}
   * @param throwsError {boolean}
   * @return {Promise<BadgeEntity>}
   */
  async getById(badgeId, throwsError = true) {
    const badgeById = await badgeRepository.findOneBy({ id: badgeId });

    if (!badgeById && throwsError) {
      throw new NotFoundException(`Er is geen badge gevonden met het ID: '${badgeId}'.`);
    }
    return badgeById;
  }

  /**
   * @param badgeData {BadgeEntity}
   * @return {Promise<BadgeEntity>}
   */
  async update(badgeData) {
    const badgeId = badgeData.id;

    if (!(await this.getById(badgeId, false))) {
      throw new NotFoundException(
        `Het wijzigen van badge met ID: '${badgeId}' was niet succesvol omdat de badge niet bestaat.`
      );
    }
    await badgeRepository.update(badgeData);
    return await this.getById(badgeId);
  }

  /**
   * @param badgeData {Omit<BadgeEntity, 'id'>}
   * @return {Promise<BadgeEntity>}
   */
  async create(badgeData) {
    return badgeRepository.create(badgeData);
  }

  /**
   * @param badgeId {number}
   * @return {Promise<void>}
   */
  async deleteById(badgeId) {
    if (!(await this.getById(badgeId, false))) {
      throw new NotFoundException(
        `Het verwijderen van Badge met ID: '${badgeId}' is mislukt omdat het niet bestaat.`
      );
    }
    await badgeRepository.deleteById(badgeId);
  }

  /** @return {Promise<BadgeEntity[]>} */
  async getForUser(userId) {
    return await badgeRepository.findAllBy({}, [
      {
        model: EarnedBadgeEntity,
        where: { user_id: userId },
        include: { model: UserEntity }
      }
    ]);
  }
}
