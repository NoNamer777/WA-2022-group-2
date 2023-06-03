import { NotFoundException } from '../../core/models/index.js';
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
  /**
   * @param userChallengeData {Omit<UserChallengeEntity, 'id'>}
   * @return {Promise<UserChallengeEntity>}
   */
  async create(userChallengeData) {
    return await userChallengeRepository.create(userChallengeData);
  }

  /**
   * @param challengeId {number}
   * @param throwsError {boolean}
   * @return {Promise<UserChallengeEntity[]>}
   */
  async getAllById(challengeId, throwsError = true) {
    const userChallengesById = await userChallengeRepository.findAllBy({ id: challengeId });

    if (!userChallengesById && throwsError) {
      throw new NotFoundException(`Er is geen challenge gevonden met het ID: '${challengeId}'.`);
    }
    return userChallengesById;
  }
}
