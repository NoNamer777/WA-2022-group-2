import { InternalServerErrorException, NotFoundException } from '../../core/models/index.js';
import { MailService } from '../../core/services/index.js';
import { UserService } from '../../user/index.js';
import { UnauthorizedException } from '../models/errors/unauthorized-exception.js';
import { JwtService } from './jwt.service.js';

export class AuthService {
  /** @return {AuthService} */
  static instance() {
    if (AuthService.#instance) return AuthService.#instance;

    AuthService.#instance = new AuthService();
    return AuthService.#instance;
  }

  /** @type {AuthService} */
  static #instance;

  async register(userData) {
    return await UserService.instance().create(userData);
  }

  /**
   * @param userData {{ username: string, password: string }}
   * @returns {Promise<UserEntity>}
   */
  async login(userData) {
    let user;

    try {
      user = await UserService.instance().getByUsername(userData.username);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException(
          'De combinatie van gebruikersnaam en wachtwoord is onjuist.'
        );
      }
      throw new InternalServerErrorException(error.message);
    }
    if (!(await user.validatePassword(userData.password))) {
      throw new UnauthorizedException('De combinatie van gebruikersnaam en wachtwoord is onjuist.');
    }
    return user;
  }

  /**
   * @param username {string}
   * @return {Promise<void>}
   */
  async requestPasswordReset(username) {
    try {
      const user = await UserService.instance().getByUsername(username);

      // Generate a JWT that is valid for 30 minutes.
      const jwtToken = JwtService.instance().encodeToken(
        { userId: user.id, tokenType: 'PasswordReset' },
        30 * 60 * 1000
      );

      await MailService.instance().sendEmail({
        to: user.email,
        subject: 'Aanvraag wachtwoord herstellen',
        template: 'reset-password',
        context: {
          username: user.username,
          link: process.env.CLIENT_BASE_URL + '/reset-password/step-2?token=' + jwtToken
        }
      });
    } catch (error) {
      console.error(
        `Something went wrong while sending a request to reset a user's password`,
        error
      );

      if (error instanceof NotFoundException) {
        // Do nothing with errors that indicate that the user does not exist.
        return;
      }
      throw error;
    }
  }

  /**
   * @param userId {number}
   * @param newPassword {string}
   * @return {Promise<void>}
   */
  async resetPassword(userId, newPassword) {
    const user = await UserService.instance().getById(userId);

    user.password = newPassword;

    await UserService.instance().update(user);
  }
}
