import { NotFoundException } from '../../core/models/index.js';
import { UserEntity } from '../../user/index.js';
import { BadgeEntity } from '../entities/badge.entity.js';
import { earnedBadgeRepository } from '../repositories/earned_badge.repository.js';

export class EarnedBadgeService {
  /** @return {EarnedBadgeService} */
  static instance() {
    if (EarnedBadgeService.#instance) return EarnedBadgeService.#instance;

    EarnedBadgeService.#instance = new EarnedBadgeService();
    return EarnedBadgeService.#instance;
  }

  /** @type {EarnedBadgeService} */
  static #instance;

  /** @return {Promise<EarnedBadgeEntity[]>} */
  async getAll() {
    return await earnedBadgeRepository.findAll();
  }

  /**
   * @param earnedBadgeId {number}
   * @param throwsError {boolean}
   * @return {Promise<EarnedBadgeEntity>}
   */
  async getById(earnedBadgeId, throwsError = true) {
    const earnedBadgeById = await earnedBadgeRepository.findOneBy({ id: earnedBadgeId });

    if (!earnedBadgeById && throwsError) {
      throw new NotFoundException(
        `Er is geen earnedBadge gevonden met het ID: '${earnedBadgeId}'.`
      );
    }
    return earnedBadgeById;
  }

  /**
   * @param earnedBadgeData {EarnedBadgeEntity}
   * @return {Promise<EarnedBadgeEntity>}
   */
  async update(earnedBadgeData) {
    const earnedBadgeId = earnedBadgeData.id;

    if (!(await this.getById(earnedBadgeId, false))) {
      throw new NotFoundException(
        `Het wijzigen van earnedBadge met ID: '${earnedBadgeId}' was niet succesvol omdat de earnedBadge niet bestaat.`
      );
    }
    await earnedBadgeRepository.update(earnedBadgeData);
    return await this.getById(earnedBadgeId);
  }

  /**
   * @param earnedBadgeData {Omit<EarnedBadgeEntity, 'id'>}
   * @return {Promise<EarnedBadgeEntity>}
   */
  async create(earnedBadgeData) {
    return earnedBadgeRepository.create(earnedBadgeData);
  }

  /**
   * @param earnedBadgeId {number}
   * @return {Promise<void>}
   */
  async deleteById(earnedBadgeId) {
    if (!(await this.getById(earnedBadgeId, false))) {
      throw new NotFoundException(
        `Het verwijderen van EarnedBadge met ID: '${earnedBadgeId}' is mislukt omdat het niet bestaat.`
      );
    }
    await earnedBadgeRepository.deleteById(earnedBadgeId);
  }

  /** @return {Promise<EarnedBadgeEntity[]>} */
  async getForUser(userId) {
    return await earnedBadgeRepository.findAllBy({ user_id: userId }, [
      {
        model: BadgeEntity,
        include: { model: UserEntity }
      }
    ]);
  }
}
