import { Op } from 'sequelize';
import { UnauthorizedException } from '../../auth/models/errors/unauthorized-exception.js';
import { BadgeService, EarnedBadgeEntity, EarnedBadgeService } from '../../badge/index.js';
import { BadRequestException, NotFoundException } from '../../core/models/index.js';
import { UserEntity } from '../../user/index.js';
import { ChallengeDayEntity } from '../entities/challenge-day.entity.js';
import { ChallengeEntity } from '../entities/challenge.entity.js';
import { challengeRepository } from '../repositories/challenge.repository.js';
import { userChallengeRepository } from '../repositories/user-challenge.repository.js';

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
    const userChallengesById = await userChallengeRepository.findAllBy(
      {
        challengeId: {
          [Op.eq]: challengeId
        }
      },
      [
        {
          as: 'challengeDays',
          model: ChallengeDayEntity
        },
        {
          as: 'user',
          model: UserEntity,
          attributes: ['id', 'username', 'profileImagePath']
        },
        {
          as: 'userChallenges',
          model: ChallengeEntity
        }
      ]
    );

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

    if (userId !== userChallenge.user.id) {
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
    earnedBadge.userId = userId;
    earnedBadge.badgeId = newBadge.id;
    earnedBadge.userChallengeId = userChallenge.id;
    await earnedBadge.save();

    return await BadgeService.instance().getById(earnedBadge.badgeId);
  }

  /**
   * @param userChallengeId {number}
   * @param userId
   * @param throwsError
   * @return {Promise<void>}
   */
  async deleteById(userChallengeId, userId, throwsError = true) {
    const userChallengeById = await this.getById(userChallengeId);

    if (userChallengeById.userId !== userId && throwsError) {
      throw new NotFoundException(
        `Het verwijderen van user challenge met ID: '${userChallengeId}' is mislukt omdat het niet bestaat.`
      );
    }
    await userChallengeRepository.deleteById(userChallengeId);

    const challengeId = userChallengeById.challengeId;
    const remainingUserChallenges = await this.getAllOfChallenge(challengeId);

    if (remainingUserChallenges.length === 0) {
      console.log(`Deleting orphan challenge with ID: '${userChallengeId}'.`);
      await challengeRepository.deleteById(challengeId);
    }
  }
}
