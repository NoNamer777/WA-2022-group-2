import { AuthService } from './services/auth.service.js';
import { JwtService } from './services/jwt.service.js';

class AuthController {
  async register(userData) {
    console.info('AuthController - registering a new User');
    return await AuthService.instance().register(userData);
  }

  /**
   * @param userId {number}
   * @return {Promise<void>}
   */
  async confirmRegistration(userId) {
    console.info(`AuthController - confirming registration for User with ID: '${userId}'`);
    await AuthService.instance().confirmRegistration(userId);
  }

  /**
   * @param userData {{ username: string, password: string }}
   * @return {Promise<string>}
   */
  async login(userData) {
    console.info('AuthController - Logging in an User');
    const user = await AuthService.instance().login(userData);

    return JwtService.instance().encodeToken({ userId: user.id, tokenType: 'Full' });
  }

  /**
   * @param username {string}
   * @return {Promise<void>}
   */
  async requestPasswordReset(username) {
    console.info(
      `AuthController - Requesting password reset for user with username: '${username}'.`
    );

    await AuthService.instance().requestPasswordReset(username);
  }

  /**
   * @param userId {number}
   * @param password {string}
   * @return {Promise<void>}
   */
  async resetPassword(userId, password) {
    console.info(`AuthController - Resetting password for User with ID: '${userId}'`);
    await AuthService.instance().resetPassword(userId, password);
  }
}

export const authController = new AuthController();
