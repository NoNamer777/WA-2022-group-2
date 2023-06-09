import { UnauthorizedException } from '../../auth/models/errors/unauthorized-exception.js';
import { EarnedBadgeEntity } from '../../badge/entities/earned_badge.entity.js';
import { BadgeService } from '../../badge/services/badge.service.js';
import { EarnedBadgeService } from '../../badge/services/earned_badge.service.js';
import { BadRequestException, NotFoundException } from '../../core/models/index.js';
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
   * @return {Promise<UserChallengeEntity>}
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
   * @param userChallengeIdParam {number}
   * @param userChallengeData {UserChallengeEntity}
   * @param userId {number}
   * @return {Promise<BadgeEntity>}
   */
  async complete(userChallengeIdParam, userChallengeData, userId) {
    const userChallengeId = parseInt(userChallengeData.id);
    if (userChallengeIdParam !== userChallengeId) {
      throw new BadRequestException(
        'Een challenge kan niet worden geüpdatet met de aangeboden gegevens'
      );
    }

    const userChallenge = await this.getById(userChallengeId);

    if (userId !== userChallenge.user_id) {
      throw new UnauthorizedException();
    }

    /* Complete challenge */
    userChallenge.completed = true;
    await userChallenge.save();

    /* Search and create unique badge for user */
    const alreadyEarnedBadges = await EarnedBadgeService.instance().getForUser(userId);
    const alreadyEarnedBadgeIds = alreadyEarnedBadges.map((earnedBadge) => earnedBadge.badge_id);
    const uniqueNewBadge = await BadgeService.instance().getRandomBadge(alreadyEarnedBadgeIds);

    const earnedBadge = new EarnedBadgeEntity();
    earnedBadge.date = new Date();
    earnedBadge.user_id = userId;
    earnedBadge.badge_id = uniqueNewBadge.id;
    earnedBadge.user_challenge_id = userChallenge.id;
    await earnedBadge.save();

    return await BadgeService.instance().getById(earnedBadge.badge_id);
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

    /*  TODO: check if name can be updated in challenge view after last opponent has left challenge, otherwise remove commented lines:
      if (remainingUserChallenges.length === 1) {
      const challenge = await challengeRepository.findOneBy(challengeId);
      challenge.dataValues.group_id = null;
      await challengeRepository.update(challenge);
    }*/

    if (remainingUserChallenges.length === 0) {
      console.log(`Deleting orphan challenge with ID: '${userChallengeId}'.`);
      await challengeRepository.deleteById(challengeId);
    }
  }
}
