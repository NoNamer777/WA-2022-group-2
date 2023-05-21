import { AuthService } from './services/auth.service.js';
import { JwtService } from './services/jwt.service.js';

class AuthController {
  async register(userData) {
    console.info('AuthController - registering a new User');
    return await AuthService.instance().register(userData);
  }

  /**
   * @param userData {{ username: string, password: string }}
   * @return {Promise<string>}
   */
  async login(userData) {
    console.info('AuthController - Logging in an User');
    const user = await AuthService.instance().login(userData);

    return JwtService.instance().encodeToken(user.toJSON());
  }
}

export const authController = new AuthController();
