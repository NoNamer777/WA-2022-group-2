import { UserService } from '../../user/index.js';
import { UnauthorizedException } from '../models/errors/unauthorized-exception.js';
import { JwtService } from '../services/jwt.service.js';

/**
 * @param options {{ expectedTokenType: 'Full' | 'PasswordReset' | 'VerifyRegistration' }}
 * @return {(request: *, response: *, next: *) => Promise<void>}
 */
export function jwtAuthHeaderValidator(options = { expectedTokenType: 'Full' }) {
  return async (request, response, next) => {
    let token = request.headers.authorization || null;

    try {
      if (!token) {
        // Header is not set on the request
        throw new UnauthorizedException();
      }
      token = token.replace('Bearer ', '').trim();

      if (token.length === 0) {
        // No JWT token is provided after the Bearer
        throw new UnauthorizedException();
      }
      const decodedToken = JwtService.instance().decodeToken(token);

      // Validate if the User is valid by retrieving the User's data by ID.
      request.userId = (await UserService.instance().getById(parseInt(decodedToken.sub))).id;

      if (decodedToken.tokenType !== options.expectedTokenType) {
        // The actual received `tokenType` is not the same as the expected `tokenType`.
        throw new UnauthorizedException();
      }
      next();
    } catch (error) {
      // Something is going wrong while decoding the token.
      next(new UnauthorizedException());
    }
  };
}
