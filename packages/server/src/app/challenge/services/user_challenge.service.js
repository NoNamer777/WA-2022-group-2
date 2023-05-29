import { Op } from 'sequelize';
import { ChallengeEntity } from '../entities/challenge.entity.js';
import { userChallengeRepository } from '../repositories/user_challenge.repository.js';

export class UserChallengeService {
  /** @return {UserChallengeService} */
  static instance() {
    if (UserChallengeService.#instance) return UserChallengeService.#instance;

    UserChallengeService.#instance = new UserChallengeService();
    return UserChallengeService.#instance;
  }

  /** @type {UserChallengeService} */
  static #instance;

  /** @return {Promise<UserChallengeEntity[]>} */
  async getForUser(userId, retrievePast = false) {
    const currentDate = new Date();

    return await userChallengeRepository.findAllBy(
      { user_id: userId },
      {
        model: ChallengeEntity,
        where: retrievePast
          ? { start_date: { [Op.lt]: currentDate } }
          : { start_date: { [Op.gte]: currentDate } }
      }
    );
  }
}
