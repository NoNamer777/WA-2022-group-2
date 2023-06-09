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
  async getForUser(userId) {
    return await earnedBadgeRepository.findAllBy({ user_id: userId }, [
      {
        model: BadgeEntity,
        include: { model: UserEntity }
      }
    ]);
  }
}
