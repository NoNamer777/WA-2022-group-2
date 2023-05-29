import { UserChallengeEntity } from '../entities/user_challenge.entity.js';
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
      {},
      {
        model: UserChallengeEntity,
        where: { user_id: userId }
      }
    );
  }
}
