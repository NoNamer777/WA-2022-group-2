import { Op } from 'sequelize';
import { UnauthorizedException } from '../../auth/models/errors/unauthorized-exception.js';
import { BadRequestException, NotFoundException } from '../../core/models/index.js';
import { GroupEntity } from '../../group/entities/group.entity.js';
import { UserGroupService } from '../../group/index.js';
import { UserEntity } from '../../user/index.js';
import { UserChallengeEntity } from '../entities/user_challenge.entity.js';
import { challengeRepository } from '../repositories/challenge.repository.js';
import { userChallengeRepository } from '../repositories/user_challenge.repository.js';
import { ChallengeDayService } from './challenge_day.service.js';
import { UserChallengeService } from './user_challenge.service.js';

export class ChallengeService {
  /** @return {ChallengeService} */
  static instance() {
    if (ChallengeService.#instance) return ChallengeService.#instance;

    ChallengeService.#instance = new ChallengeService();
    return ChallengeService.#instance;
  }

  /** @type {ChallengeService} */
  static #instance;

  /**
   * @param challengeData {Omit<UserChallengeEntity, 'id'>}
   * @return {Promise<ChallengeEntity>}
   */
  async create(challengeData) {
    return await challengeRepository.create(challengeData);
  }

  /** @return {Promise<ChallengeEntity[]>} */
  async getAll() {
    return await challengeRepository.findAll();
  }

  /**
   * @param challengeId {number}
   * @param throwsError {boolean}
   * @return {Promise<ChallengeEntity>}
   */
  async getById(challengeId, throwsError = true) {
    const challengeById = await challengeRepository.findOneBy({ id: challengeId });

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
      user_id: userId,
      challenge_id: challengeId
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
   * @param challengeData {Omit<ChallengeEntity, 'id'>}
   * @param userId {number}
   * @return {Promise<ChallengeEntity>}
   */
  async createChallenge(challengeData, userId) {
    const createdChallenge = await this.create(challengeData);

    /* Fetch corresponding group data and create user challenges */
    const userChallenges = [];

    if (createdChallenge.group_id) {
      const userGroups = await UserGroupService.instance().getAllById(createdChallenge.group_id);
      for (const userGroup of userGroups) {
        const userChallenge = await UserChallengeService.instance().create({
          completed: false,
          user_id: userGroup.user_id,
          challenge_id: createdChallenge.id
        });
        userChallenges.push(userChallenge);
      }
    } else {
      const userChallenge = await UserChallengeService.instance().create({
        completed: false,
        user_id: userId,
        challenge_id: createdChallenge.id
      });
      userChallenges.push(userChallenge);
    }

    /* Create challenge days */
    let startDate = new Date(createdChallenge.start_date);
    const endDate = new Date(createdChallenge.end_date);

    for (const userChallenge of userChallenges) {
      while (startDate <= endDate) {
        await ChallengeDayService.instance().create({
          date: startDate,
          earned: false,
          user_challenge_id: userChallenge.id
        });
        startDate.setDate(startDate.getDate() + 1);
      }
      startDate = new Date(createdChallenge.start_date);
    }
    return createdChallenge;
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

  /** @return {Promise<ChallengeEntity[]>} */
  async getForUser(userId, retrievePast = false) {
    const currentDate = new Date();
    const whereClause = retrievePast
      ? { end_date: { [Op.lt]: currentDate } }
      : { end_date: { [Op.gte]: currentDate } };

    return await challengeRepository.findAllBy(whereClause, [
      {
        model: UserChallengeEntity,
        where: { user_id: userId },
        include: { model: UserEntity }
      },
      {
        model: GroupEntity
      }
    ]);
  }
}
