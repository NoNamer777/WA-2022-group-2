import { UnauthorizedException } from '../../auth/models/errors/unauthorized-exception.js';
import { BadRequestException, NotFoundException } from '../../core/models/index.js';
import { challengeDayRepository } from '../repositories/challenge_day.repository.js';
import { UserChallengeService } from './user_challenge.service.js';

export class ChallengeDayService {
  /** @return {ChallengeDayService} */
  static instance() {
    if (ChallengeDayService.#instance) return ChallengeDayService.#instance;

    ChallengeDayService.#instance = new ChallengeDayService();
    return ChallengeDayService.#instance;
  }
  /** @type {ChallengeDayService} */
  static #instance;

  /**
   * @param challengeDayId {number}
   * @param throwsError {boolean}
   * @return {Promise<ChallengeDayEntity>}
   */
  async getById(challengeDayId, throwsError = true) {
    const challengeDayById = await challengeDayRepository.findOneBy({ id: challengeDayId });

    if (!challengeDayById && throwsError) {
      throw new NotFoundException(`No challenge day found for ID: '${challengeDayById}'.`);
    }
    return challengeDayById;
  }

  /**
   * @param challengeDayIdParam {number}
   * @param challengeDayData {ChallengeDayEntity}
   * @param userId {number}
   * @return {Promise<ChallengeDayEntity>}
   */
  async update(challengeDayIdParam, challengeDayData, userId) {
    const challengeDayId = challengeDayData.id;
    if (challengeDayIdParam !== parseInt(challengeDayId)) {
      throw new BadRequestException(`Unable to update challenge day with requested data`);
    }

    if (!(await this.getById(challengeDayId, false))) {
      throw new NotFoundException(`Challenge day with ID: '${challengeDayId}' not found.`);
    }

    console.log(challengeDayData.user_challenge_id);
    const userChallenge = await UserChallengeService.instance().getById(
      challengeDayData.user_challenge_id
    );
    if (userChallenge.user_id !== parseInt(userId)) {
      throw new UnauthorizedException(
        `Failed updating challenge day with ID: '${challengeDayId}'.`
      );
    }

    await challengeDayRepository.update(challengeDayData);
    return await this.getById(challengeDayIdParam);
  }
}
