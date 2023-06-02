import { Op } from 'sequelize';
import { NotFoundException } from '../../core/models/index.js';
import { GroupEntity } from '../../group/entities/group.entity.js';
import { UserEntity } from '../../user/index.js';
import { UserChallengeEntity } from '../entities/user_challenge.entity.js';
import { challengeRepository } from '../repositories/challenge.repository.js';

export class ChallengeService {
  /** @return {ChallengeService} */
  static instance() {
    if (ChallengeService.#instance) return ChallengeService.#instance;

    ChallengeService.#instance = new ChallengeService();
    return ChallengeService.#instance;
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
   * @param challengeData {ChallengeEntity}
   * @return {Promise<ChallengeEntity>}
   */
  async update(challengeData) {
    const challengeId = challengeData.id;

    if (!(await this.getById(challengeId, false))) {
      throw new NotFoundException(
        `Het wijzigen van challenge met ID: '${challengeId}' was niet succesvol omdat de challenge niet bestaat.`
      );
    }
    await challengeRepository.update(challengeData);
    return await this.getById(challengeId);
  }

  /**
   * @param challengeData {Omit<ChallengeEntity, 'id'>}
   * @return {Promise<ChallengeEntity>}
   */
  async create(challengeData) {
    return await challengeRepository.create(challengeData);
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

  /** @type {ChallengeService} */
  static #instance;

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
