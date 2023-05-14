const JwtService = require('../services/jwt.service')
const UnauthorizedException = require('../models/errors/unauthorized-exception')
const UserService = require('../models/user/user.service')

module.exports = async function jwtAuthHeaderValidator(request, response, next) {
  let token = request.headers.authorization || null

  if (!token) {
    // Header is not set on the request
    next(new UnauthorizedException())
  }
  token = token.replace('Bearer ', '').trim()

  if (token.length === 0) {
    // No JWT token is provided after the Bearer
    next(new UnauthorizedException())
  }

  try {
    const decodedToken = JwtService.instance().decodeToken(token)

    // Validate if the User is valid by retrieving the User's data by ID.
    await UserService.instance().getById(parseInt(decodedToken.sub))

    next()
  } catch (error) {
    // Something is going wrong while decoding the token
    next(new UnauthorizedException())
  }
}