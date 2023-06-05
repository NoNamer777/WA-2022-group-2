import { NotFoundException } from '../../core/models/index.js';
import { challengeRepository } from '../repositories/challenge.repository.js';
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
   * @param userChallengeId {number}
   * @param throwsError {boolean}
   * @return {Promise<ChallengeEntity>}
   */
  async getById(userChallengeId, throwsError = true) {
    const userChallengeById = await userChallengeRepository.findOneBy({ id: userChallengeId });

    if (!userChallengeById && throwsError) {
      throw new NotFoundException(`No user challenge found with ID: '${userChallengeById}'.`);
    }
    return userChallengeById;
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

  /**
   * @param userChallengeId {number}
   * @param userId
   * @param throwsError
   * @return {Promise<void>}
   */
  async deleteById(userChallengeId, userId, throwsError = true) {
    const userChallengeById = await this.getById(userChallengeId);

    if (userChallengeById.dataValues.user_id !== userId && throwsError) {
      throw new NotFoundException(`Failed deleting user challenge with ID: '${userChallengeId}'.`);
    }
    await userChallengeRepository.deleteById(userChallengeId);

    const challengeId = userChallengeById.dataValues.challenge_id;

    const remainingUserChallenges = await this.getAllById(challengeId);
    if (remainingUserChallenges.length === 0) {
      console.log(`Deleting orphan challenge with ID: '${userChallengeId}'.`);
      await challengeRepository.deleteById(challengeId);
    }
  }
}
