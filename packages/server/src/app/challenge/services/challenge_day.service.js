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
   * @param challengeDayData {{date: Date, earned: boolean, user_challenge_id}}
   * @return {Promise<ChallengeDayEntity>}
   */
  async create(challengeDayData) {
    return await challengeDayRepository.create(challengeDayData);
  }

  /**
   * @param challengeDayId {number}
   * @param throwsError {boolean}
   * @return {Promise<ChallengeDayEntity>}
   */
  async getById(challengeDayId, throwsError = true) {
    const challengeDayById = await challengeDayRepository.findOneBy({ id: challengeDayId });

    if (!challengeDayById && throwsError) {
      throw new NotFoundException(
        `Challenge dag met het ID: '${challengeDayId}' is niet gevonden.`
      );
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
      throw new BadRequestException(
        `Het updaten van de challenge dag met het ID '${challengeDayId}' is niet mogelijk.`
      );
    }

    if (!(await this.getById(challengeDayId, false))) {
      throw new NotFoundException(
        `Challenge dag met het ID: '${challengeDayId}' is niet gevonden.`
      );
    }

    console.log(challengeDayData.user_challenge_id);
    const userChallenge = await UserChallengeService.instance().getById(
      challengeDayData.user_challenge_id
    );
    if (userChallenge.user_id !== parseInt(userId)) {
      throw new UnauthorizedException();
    }

    await challengeDayRepository.update(challengeDayData);
    return await this.getById(challengeDayIdParam);
  }
}
