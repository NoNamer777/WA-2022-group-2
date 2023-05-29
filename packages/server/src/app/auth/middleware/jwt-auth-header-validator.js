import { UserService } from '../../user/index.js';
import { UnauthorizedException } from '../models/errors/unauthorized-exception.js';
import { JwtService } from '../services/jwt.service.js';

export async function jwtAuthHeaderValidator(request, response, next) {
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

    request.user_id = parseInt(decodedToken.sub);

    // Validate if the User is valid by retrieving the User's data by ID.
    await UserService.instance().getById(parseInt(decodedToken.sub));

    next();
  } catch (error) {
    // Something is going wrong while decoding the token
    next(new UnauthorizedException());
  }
}
