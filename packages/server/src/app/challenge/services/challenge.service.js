import { Op } from 'sequelize';
import { UnauthorizedException } from '../../auth/models/errors/unauthorized-exception.js';
import { BadRequestException, NotFoundException } from '../../core/models/index.js';
import { GroupEntity } from '../../group/entities/group.entity.js';
import { UserEntity } from '../../user/index.js';
import { UserChallengeEntity } from '../entities/user-challenge.entity.js';
import { challengeRepository } from '../repositories/challenge.repository.js';
import { userChallengeRepository } from '../repositories/user-challenge.repository.js';

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
  async getAll() {
    return await challengeRepository.findAll();
  }

  /**
   * @param challengeData {Omit<UserChallengeEntity, 'id'>}
   * @return {Promise<ChallengeEntity>}
   */
  async create(challengeData) {
    return await challengeRepository.create(challengeData);
  }

  /**
   * @param challengeId {number}
   * @param throwsError {boolean}
   * @return {Promise<ChallengeEntity>}
   */
  async getById(challengeId, throwsError = true) {
    const challengeById = await challengeRepository.findOneBy(challengeId);

    if (!challengeById && throwsError) {
      throw new NotFoundException(`Er is geen challenge gevonden met het ID: '${challengeId}'.`);
    }
    return challengeById;
  }

  /**
   * @param challengeIdParam {number}
   * @param challengeData {ChallengeEntity}
   * @param userId {number}
   * @param throwsError
   * @return {Promise<ChallengeEntity>}
   */
  async update(challengeIdParam, challengeData, userId, throwsError = true) {
    const challengeId = challengeData.id;
    if (challengeIdParam !== parseInt(challengeId)) {
      throw new BadRequestException(
        `Het updaten van de challenge met het ID: '${challengeId}' is niet mogelijk.`
      );
    }

    const userChallengeById = await userChallengeRepository.findOneBy({
      userId: userId,
      challengeId: challengeId
    });
    if (!(await this.getById(challengeId, false))) {
      throw new NotFoundException(`Challenge met het ID: '${challengeId}' is niet gevonden.`);
    }

    if (!userChallengeById && throwsError) {
      throw new UnauthorizedException();
    }
    await challengeRepository.update(challengeData);
    return await this.getById(challengeId);
  }

  /**
   * @param challengeId {number}
   * @return {Promise<void>}
   */
  async deleteById(challengeId) {
    if (!(await this.getById(challengeId, false))) {
      throw new NotFoundException(
        `Het verwijderen van Challenge met ID: '${challengeId}' is mislukt omdat het niet bestaat.`
      );
    }
    await challengeRepository.deleteById(challengeId);
  }

  /**
   * @param userId {number}
   * @param challengeState {'active' | 'concluded'}
   * @return {Promise<ChallengeEntity[]>}
   */
  async getForUser(userId, challengeState = 'active') {
    const currentDate = new Date();
    const whereClause =
      challengeState === 'active'
        ? { endDate: { [Op.gte]: currentDate } }
        : { endDate: { [Op.lt]: currentDate } };

    return await challengeRepository.findAllBy(whereClause, [
      {
        model: UserChallengeEntity,
        where: { userId: userId },
        as: 'userChallenges',
        include: {
          model: UserEntity,
          attributes: ['id', 'username']
        }
      },
      {
        model: GroupEntity
      }
    ]);
  }
}
