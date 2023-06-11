import { UnauthorizedException } from '../../auth/models/errors/unauthorized-exception.js';
import { BadRequestException, NotFoundException } from '../../core/models/index.js';
import { challengeDayRepository } from '../repositories/challenge-day.repository.js';
import { UserChallengeService } from './user-challenge.service.js';

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
   * @param challengeDayData {{date: Date, userChallengeId: number }}
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
    const challengeDayById = await challengeDayRepository.findOneById(challengeDayId);

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

    const userChallenge = await UserChallengeService.instance().getById(
      challengeDayData.userChallengeId
    );
    if (userChallenge.userId !== parseInt(userId)) {
      throw new UnauthorizedException();
    }

    await challengeDayRepository.update(challengeDayData);
    return await this.getById(challengeDayIdParam);
  }
}
