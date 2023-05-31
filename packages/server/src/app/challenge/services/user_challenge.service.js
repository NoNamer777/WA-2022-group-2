import { Op } from 'sequelize';
import { UserChallengeEntity } from '../entities/user_challenge.entity.js';
import { challengeRepository } from '../repositories/user_challenge.repository.js';

export class ChallengeService {
  /** @return {ChallengeService} */
  static instance() {
    if (ChallengeService.#instance) return ChallengeService.#instance;

    ChallengeService.#instance = new ChallengeService();
    return ChallengeService.#instance;
  }

  /** @type {ChallengeService} */
  static #instance;

  /** @return {Promise<ChallengeEntity[]>} */
  async getForUser(userId, retrievePast = false) {
    const currentDate = new Date();
    const whereClause = retrievePast
      ? { end_date: { [Op.lt]: currentDate } }
      : { end_date: { [Op.gte]: currentDate } };

    return await challengeRepository.findAllBy(whereClause, {
      model: UserChallengeEntity,
      where: { user_id: userId }
    });
  }
}
